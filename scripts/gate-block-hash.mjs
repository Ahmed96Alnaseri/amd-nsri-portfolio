// Prints the removed-list hash for ONE email address, to add to TOOL_GATE_BLOCKED in Vercel.
//
//   node scripts/gate-block-hash.mjs
//
// It asks for the key (typing is not shown; or set TOOL_GATE_BLOCK_KEY in this terminal first) and the address,
// then prints only the hash. Nothing is saved: no file, no log, and the address is not printed back.
// The hash is the same as src/lib/tool-gate/removed.ts makes: HMAC-SHA256 of the trimmed, lowercased address,
// keyed with TOOL_GATE_BLOCK_KEY, as base64url.
import { createHmac } from 'node:crypto';
import readline from 'node:readline';

function ask(question, hidden) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(question);
    if (hidden) rl._writeToOutput = () => {}; // what is typed is not shown
    rl.question('', (answer) => {
      rl.close();
      if (hidden) process.stdout.write('\n');
      resolve(answer);
    });
  });
}

const key = process.env.TOOL_GATE_BLOCK_KEY?.trim() || (await ask('Key (TOOL_GATE_BLOCK_KEY, not shown): ', true)).trim();
if (key.length < 32) {
  console.error('That key is too short: use the same long value that is in Vercel.');
  process.exit(1);
}
const email = (await ask('Email address to block: ', false)).trim().toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
  console.error('That does not look like an email address. Nothing was made.');
  process.exit(1);
}
const hash = createHmac('sha256', key).update(email).digest('base64url');
console.log('\nHash to add to TOOL_GATE_BLOCKED (separate entries with a comma, no spaces):\n');
console.log(hash);
console.log('\nThen in Vercel: Settings → Environment Variables → TOOL_GATE_BLOCKED → add it → Save → Redeploy.');
