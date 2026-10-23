// Prints the removed-list hash for ONE email address, to add to TOOL_GATE_BLOCKED in Vercel.
//
//   node scripts/gate-block-hash.mjs
//
// It asks for the key (what you paste is not shown; or set TOOL_GATE_BLOCK_KEY in this terminal first) and the
// address, then prints only the hash. Nothing is saved: no file, no log, and the address is not printed back.
// The hash is the same as src/lib/tool-gate/removed.ts makes: HMAC-SHA256 of the trimmed, lowercased address,
// keyed with TOOL_GATE_BLOCK_KEY, as base64url.
//
// The keyboard is read directly (raw mode), not through Node's readline: in Windows terminals readline clears the
// current line when it starts reading, which erased the question and left an empty, silent window.
import { createHmac } from 'node:crypto';
import { pathToFileURL } from 'node:url';

let pipedLines = null; // input that is not a terminal (piped): read once, then one line per question

/**
 * Shows the prompt and reads one line. With hidden, typed or pasted characters are not shown; Enter ends the line,
 * Backspace removes a character, Ctrl+C stops the script.
 */
export function readLine(prompt, { hidden = false, input = process.stdin, output = process.stdout } = {}) {
  output.write(prompt);
  if (!input.isTTY) {
    return (async () => {
      if (!pipedLines) {
        let all = '';
        input.setEncoding('utf8');
        for await (const chunk of input) all += chunk;
        pipedLines = all.split(/\r?\n/);
      }
      output.write('\n');
      return pipedLines.length ? pipedLines.shift() : '';
    })();
  }
  return new Promise((resolve) => {
    let value = '';
    let escape = 0; // arrow and other special keys arrive as ESC [ x: skip them
    const onData = (chunk) => {
      for (const ch of String(chunk)) {
        if (escape) { escape = escape === 1 && ch === '[' ? 2 : 0; continue; }
        if (ch === '\u001b') { escape = 1; continue; }
        if (ch === '\u0003') { finish(); output.write('Stopped.\n'); process.exit(130); }
        if (ch === '\r' || ch === '\n') { finish(); resolve(value); return; }
        if (ch === '\u0008' || ch === '\u007f') {
          if (value) { value = value.slice(0, -1); if (!hidden) output.write('\b \b'); }
          continue;
        }
        if (ch < ' ') continue; // other control keys
        value += ch;
        if (!hidden) output.write(ch);
      }
    };
    function finish() {
      input.off('data', onData);
      input.setRawMode(false);
      input.pause();
      output.write('\n');
    }
    input.setEncoding('utf8');
    input.setRawMode(true);
    input.on('data', onData);
    input.resume();
  });
}

export function addressHash(email, key) {
  return createHmac('sha256', key).update(email.trim().toLowerCase()).digest('base64url');
}

async function main() {
  console.log('Removed-list hash for one email address. Nothing you type is saved.\n');
  let key = process.env.TOOL_GATE_BLOCK_KEY?.trim() || '';
  if (key) console.log('Using the key from TOOL_GATE_BLOCK_KEY in this terminal.');
  else {
    key = (await readLine('Paste your key (hidden), then press Enter: ', { hidden: true })).trim();
    console.log(`Key received (${key.length} characters).`);
  }
  if (key.length < 32) {
    console.error('That key is too short: use the same long value that is in Vercel. Nothing was made.');
    process.exit(1);
  }
  const email = (await readLine('Type the email, then press Enter: ')).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    console.error('That does not look like an email address. Nothing was made.');
    process.exit(1);
  }
  console.log('\nHash for TOOL_GATE_BLOCKED:');
  console.log(addressHash(email, key));
  console.log('\nNext: Vercel → Settings → Environment Variables → TOOL_GATE_BLOCKED → add it (several: separate');
  console.log('with a comma, no spaces) → Save → Deployments → ⋯ → Redeploy.');
}

// run only when started as a script (the test imports readLine without running it)
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) await main();
