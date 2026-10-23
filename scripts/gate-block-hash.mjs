// Prints the removed-list hash for ONE email address, to add to TOOL_GATE_BLOCKED in Vercel.
//
//   node scripts/gate-block-hash.mjs              asks for the key (hidden) and the email
//   node scripts/gate-block-hash.mjs --clipboard  Windows: reads the key, then the email, from the clipboard
//
// Clipboard mode is for consoles where pasting into the hidden prompt does not arrive (classic Windows PowerShell):
// copy the key, run the command; it reads and checks the key, empties the clipboard, then asks you to copy the email
// and press Enter. A TOOL_GATE_BLOCK_KEY set in this terminal is used instead of asking, in both modes.
// Only the hash is printed. Nothing is saved: no file, no log, and neither the key nor the full address is shown.
// The hash is the same as src/lib/tool-gate/removed.ts makes: HMAC-SHA256 of the trimmed, lowercased address,
// keyed with TOOL_GATE_BLOCK_KEY, as base64url.
//
// The keyboard is read directly (raw mode), not through Node's readline: in Windows terminals readline clears the
// current line when it starts reading, which erased the question and left an empty, silent window.
import { createHmac } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

/** Waits for Enter in the console's normal line mode (no raw mode, no readline). */
export function waitForEnter(prompt, { input = process.stdin, output = process.stdout } = {}) {
  output.write(prompt);
  return new Promise((resolve) => {
    const onData = (chunk) => {
      if (!/[\r\n]/.test(String(chunk))) return;
      input.off('data', onData);
      input.pause();
      resolve();
    };
    input.setEncoding('utf8');
    input.on('data', onData);
    input.resume();
  });
}

/** Windows clipboard text, read with PowerShell's Get-Clipboard (as UTF-8). Throws when it cannot be read. */
export function readClipboard() {
  const r = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command',
    '[Console]::OutputEncoding = [Text.Encoding]::UTF8; Get-Clipboard -Raw'], { encoding: 'utf8', windowsHide: true });
  if (r.error || r.status !== 0) throw new Error('could not read the clipboard');
  return r.stdout ?? '';
}

/** Replaces the clipboard's text with a single space, so the key or the address does not stay there. */
export function emptyClipboard() {
  spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', "Set-Clipboard -Value ' '"], { windowsHide: true });
}

/** The key as made in step 1: 43 letters, digits, - and _. A word processor can add or change characters. */
export function checkKey(raw) {
  const key = raw.replace(/[\s​-‍﻿]/g, '');
  if (!key) return { key, problem: 'The clipboard holds no text. Copy the key first, then run the command again.' };
  if (!/^[A-Za-z0-9_-]+$/.test(key)) {
    return { key, problem: `The copied text (${key.length} characters) has characters that are not letters, digits, - or _. A word processor may have changed them: copy the key from your password manager instead.` };
  }
  if (key.length !== 43) return { key, problem: `The copied key has ${key.length} characters; it should have 43. Copy the whole key and run the command again.` };
  return { key, problem: '' };
}

/** a***@example.com: enough to see which address it is, without printing it in full. */
export const maskEmail = (email) => email.replace(/^(.)[^@]*@/, '$1***@');

export function addressHash(email, key) {
  return createHmac('sha256', key).update(email.trim().toLowerCase()).digest('base64url');
}

function printHash(email, key) {
  console.log('\nHash for TOOL_GATE_BLOCKED:');
  console.log(addressHash(email, key));
  console.log('\nNext: Vercel → Settings → Environment Variables → TOOL_GATE_BLOCKED → add it (several: separate');
  console.log('with a comma, no spaces) → Save → Deployments → ⋯ → Redeploy.');
}

const fail = (message) => { console.error(message + ' Nothing was made.'); process.exit(1); };

async function clipboardMode() {
  let key = process.env.TOOL_GATE_BLOCK_KEY?.trim() || '';
  if (key) console.log('Using the key from TOOL_GATE_BLOCK_KEY in this terminal.');
  else {
    let raw;
    try { raw = readClipboard(); } catch { fail('Could not read the clipboard.'); }
    const checked = checkKey(raw);
    emptyClipboard();
    if (checked.problem) fail(`${checked.problem} (The clipboard has been emptied.)`);
    key = checked.key;
    console.log(`Key read from the clipboard (${key.length} characters). The clipboard has been emptied.`);
  }
  await waitForEnter('Now copy the email address, then press Enter here: ');
  let email = '';
  try { email = readClipboard().trim().toLowerCase(); } catch { fail('Could not read the clipboard.'); }
  emptyClipboard();
  if (!EMAIL.test(email)) fail('The clipboard does not hold one email address. (The clipboard has been emptied.)');
  console.log(`Email read from the clipboard: ${maskEmail(email)}. The clipboard has been emptied.`);
  printHash(email, key);
}

async function main() {
  console.log('Removed-list hash for one email address. Nothing you type is saved.\n');
  if (process.argv.includes('--clipboard')) return clipboardMode();
  let key = process.env.TOOL_GATE_BLOCK_KEY?.trim() || '';
  if (key) console.log('Using the key from TOOL_GATE_BLOCK_KEY in this terminal.');
  else {
    key = (await readLine('Paste your key (hidden), then press Enter: ', { hidden: true })).trim();
    console.log(`Key received (${key.length} characters).`);
    if (!key) console.log('Nothing arrived. In classic Windows PowerShell use: node scripts/gate-block-hash.mjs --clipboard');
  }
  if (key.length < 32) fail('That key is too short: use the same long value that is in Vercel.');
  const email = (await readLine('Type the email, then press Enter: ')).trim().toLowerCase();
  if (!EMAIL.test(email)) fail('That does not look like an email address.');
  printHash(email, key);
}

// run only when started as a script (the tests import the functions without running it); afterwards let go of the
// keyboard, or the window would keep waiting instead of returning to the prompt
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  await main();
  process.stdin.destroy();
}
