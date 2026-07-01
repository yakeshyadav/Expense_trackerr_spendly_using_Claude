#!/usr/bin/env node
/**
 * production-guard.js
 *
 * PreToolUse hook for Spendly. Blocks tool calls that would directly
 * overwrite, delete, or truncate the live database files (spendly.db,
 * spendly-backup.db) via generic file-write/bash tools. Does NOT block
 * normal SQLite queries made through the app's own database layer —
 * only blunt file-level operations (Write/Edit on the .db file itself,
 * or shell commands like rm/truncate/> targeting it).
 *
 * Reads the tool call JSON from stdin (Claude Code PreToolUse hook contract)
 * and exits non-zero with a message on stdout to block the call.
 */

const GUARDED_FILES = ["spendly.db", "spendly-backup.db"];

const DANGEROUS_BASH_PATTERNS = [
  /\brm\s+.*(spendly(-backup)?\.db)/i,
  />\s*.*(spendly(-backup)?\.db)/i,
  /\btruncate\b.*(spendly(-backup)?\.db)/i,
  /\bsqlite3\s+.*(spendly(-backup)?\.db)\s+["'].*\b(DROP|DELETE)\b/i,
];

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

(async () => {
  const raw = await readStdin();
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0); // don't block on malformed input, fail open
  }

  const toolName = input.tool_name || "";
  const toolInput = input.tool_input || {};

  const targetPath = toolInput.file_path || toolInput.path || "";
  const isGuardedFile = GUARDED_FILES.some((f) => targetPath.endsWith(f));

  if ((toolName === "Write" || toolName === "Edit") && isGuardedFile) {
    console.log(
      `Blocked: direct ${toolName} on ${targetPath}. Live Spendly database files should only be modified through the app's own database layer (see database/), not edited/overwritten directly. If this is intentional, ask the user to confirm explicitly before retrying.`
    );
    process.exit(2);
  }

  if (toolName === "Bash") {
    const command = toolInput.command || "";
    for (const pattern of DANGEROUS_BASH_PATTERNS) {
      if (pattern.test(command)) {
        console.log(
          `Blocked: shell command targets a live Spendly database file (${command}). Destructive operations on spendly.db/spendly-backup.db require explicit, freshly-stated confirmation in the current conversation.`
        );
        process.exit(2);
      }
    }
  }

  process.exit(0);
})();
