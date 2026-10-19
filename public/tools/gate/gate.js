/*
 * Email gate for the free tools (IPunch, NESTRI, NESTRI PRO, Expanded Mesh Generator).
 * Included by each tool page: <script src="/tools/gate/gate.js" data-tool="<tool>" defer></script>
 *
 * - Asks /api/tool-gate/status whether the gate is on (TOOL_GATE_MODE, src/lib/tool-gate/config.ts). If it is off,
 *   or the request fails, nothing happens: the tool opens as before.
 * - Otherwise it covers the tool with a panel asking for an email and consent. The page underneath is untouched
 *   (search engines see it as before) and made inert while the panel is open.
 * - After the form is sent, this device remembers that it has signed up (never the address) and the panel does not
 *   come back. Access is granted even if the server is slow or fails.
 * - Text in EN/TR/AR comes from the status answer (src/lib/translations.ts, toolGate).
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var TOOL = (script && script.getAttribute('data-tool')) || 'unknown';
  var KEY = 'amd-nsri-tool-access';
  var memoryFlag = false; // last resort when the browser blocks storage: this page visit only

  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  function hasAccess() {
    if (memoryFlag) return true;
    var kinds = ['localStorage', 'sessionStorage'];
    for (var i = 0; i < kinds.length; i++) {
      var s = store(kinds[i]);
      try { if (s && s.getItem(KEY)) return true; } catch (e) { /* blocked */ }
    }
    return false;
  }
  function grantAccess() {
    var value = JSON.stringify({ v: 1, t: Date.now() }); // a flag and a date, never the address
    var kinds = ['localStorage', 'sessionStorage'];
    for (var i = 0; i < kinds.length; i++) {
      var s = store(kinds[i]);
      try { if (s) { s.setItem(KEY, value); return; } } catch (e) { /* try the next one */ }
    }
    memoryFlag = true;
  }

  if (hasAccess()) return;

  function withTimeout(ms) {
    var ctrl = 'AbortController' in window ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, ms) : null;
    return { signal: ctrl ? ctrl.signal : undefined, done: function () { if (timer) clearTimeout(timer); } };
  }

  var t0 = withTimeout(6000);
  fetch('/api/tool-gate/status', { cache: 'no-store', signal: t0.signal })
    .then(function (r) { t0.done(); return r.ok ? r.json() : null; })
    .then(function (s) { if (s && s.enabled && s.text && !hasAccess()) open(s); })
    .catch(function () { t0.done(); /* gate off or unreachable: the tool stays open */ });

  var CSS = [
    '.amdg{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;',
    'background:rgba(13,13,11,.84);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);overflow:auto}',
    '.amdg *{box-sizing:border-box}',
    '.amdg-panel{position:relative;width:100%;max-width:540px;max-height:calc(100dvh - 32px);overflow:auto;margin:auto;',
    'background:radial-gradient(ellipse 80% 60% at 30% 0%,rgba(184,149,106,.08) 0%,transparent 70%),#0d0d0b;',
    'border:1px solid #2a2a26;padding:clamp(24px,5vw,40px);color:#e8e4dc;',
    "font-family:'IBM Plex Mono','Courier New',monospace;font-size:14px;line-height:1.7;text-align:start}",
    ".amdg[dir=rtl] .amdg-panel{font-family:'IBM Plex Sans Arabic','IBM Plex Mono',sans-serif}",
    '.amdg-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:28px}',
    '.amdg-eyebrow{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#b8956a;white-space:nowrap}',
    '.amdg[dir=rtl] .amdg-eyebrow{letter-spacing:0}',
    '.amdg-langs{display:flex;gap:4px}',
    '.amdg-lang{font:inherit;font-size:10px;letter-spacing:.1em;color:#8a8880;background:none;border:1px solid transparent;padding:4px 7px;cursor:pointer}',
    '.amdg-lang[aria-pressed=true]{color:#b8956a;border-color:rgba(184,149,106,.4)}',
    ".amdg-title{font-family:'DM Serif Display',Georgia,serif;font-weight:400;font-size:clamp(28px,5vw,40px);line-height:1.08;letter-spacing:-.02em;margin:0 0 14px;color:#e8e4dc}",
    ".amdg[dir=rtl] .amdg-title{font-family:'IBM Plex Sans Arabic',sans-serif;font-weight:500;letter-spacing:0;line-height:1.3}",
    '.amdg-lead{color:#8a8880;margin:0 0 26px}',
    '.amdg-label{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#8a8880;margin-bottom:8px}',
    '.amdg[dir=rtl] .amdg-label{letter-spacing:0}',
    '.amdg-input{width:100%;font:inherit;font-size:15px;color:#e8e4dc;background:#141412;border:1px solid #2a2a26;padding:12px 14px;outline:none;direction:ltr;text-align:left;transition:border-color .3s}',
    '.amdg-input:focus{border-color:#b8956a}',
    '.amdg-check{display:flex;gap:12px;align-items:flex-start;margin:20px 0 6px;cursor:pointer;color:#e8e4dc;font-size:13px}',
    '.amdg-check input{flex:none;width:17px;height:17px;margin:3px 0 0;accent-color:#b8956a;cursor:pointer}',
    '.amdg-err{min-height:20px;margin:6px 0 0;font-size:12px;color:#d98a6a}',
    '.amdg-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:10px;margin-top:14px;font:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;',
    'color:#e8e4dc;background:transparent;border:1px solid #b8956a;padding:14px 26px;cursor:pointer;transition:color .35s}',
    '.amdg[dir=rtl] .amdg-btn{letter-spacing:0;font-size:13px}',
    '.amdg-btn::before{content:"";position:absolute;left:0;right:0;bottom:0;height:0;background:#b8956a;transition:height .35s cubic-bezier(.16,1,.3,1)}',
    '.amdg-btn:hover::before,.amdg-btn:focus-visible::before{height:100%}',
    '.amdg-btn:hover,.amdg-btn:focus-visible{color:#0d0d0b}',
    '.amdg-btn span{position:relative}',
    '.amdg-btn[disabled]{opacity:.6;cursor:wait}',
    '.amdg-arrow{display:inline-block}',
    '.amdg[dir=rtl] .amdg-arrow{transform:scaleX(-1)}',
    '.amdg-rule{height:1px;background:#2e2e2a;margin:26px 0 18px}',
    '.amdg-notice{font-size:11.5px;line-height:1.65;color:#8a8880;margin:0 0 10px}',
    '.amdg-files{font-size:11.5px;color:#5a5854;margin:0}',
    '.amdg-test{margin:0 0 18px;padding:8px 12px;border:1px dashed rgba(184,149,106,.5);color:#b8956a;font-size:11px;letter-spacing:.06em}',
    '.amdg-hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}',
    '@media (prefers-reduced-motion:reduce){.amdg-btn::before,.amdg-input{transition:none}}',
  ].join('');

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function open(s) {
    var LANGS = ['EN', 'TR', 'AR'];
    var pageLang = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2).toUpperCase();
    var lang = LANGS.indexOf(pageLang) >= 0 ? pageLang : 'EN';
    var shownAt = Date.now();

    // the site's own fonts (self-hosted, no outside provider)
    if (!document.getElementById('amdg-fonts')) {
      document.head.appendChild(el('link', { id: 'amdg-fonts', rel: 'stylesheet', href: '/tools/expanded-mesh-generator/fonts/fonts.css' }));
    }
    document.head.appendChild(el('style', { id: 'amdg-style', text: CSS }));

    var title = el('h2', { 'class': 'amdg-title', id: 'amdg-title' });
    var lead = el('p', { 'class': 'amdg-lead', id: 'amdg-lead' });
    var test = s.dryRun ? el('p', { 'class': 'amdg-test' }) : null;
    var label = el('label', { 'class': 'amdg-label', 'for': 'amdg-email' });
    var input = el('input', { 'class': 'amdg-input', id: 'amdg-email', type: 'email', name: 'email', autocomplete: 'email', inputmode: 'email', required: '', maxlength: '254', dir: 'ltr' });
    var consent = el('input', { type: 'checkbox', id: 'amdg-consent', name: 'consent' });
    var consentText = el('span');
    var check = el('label', { 'class': 'amdg-check', 'for': 'amdg-consent' }, [consent, consentText]);
    var err = el('p', { 'class': 'amdg-err', role: 'alert', 'aria-live': 'polite' });
    var btnText = el('span');
    var arrow = el('span', { 'class': 'amdg-arrow', 'aria-hidden': 'true', text: '→' });
    var btn = el('button', { 'class': 'amdg-btn', type: 'submit' }, [btnText, arrow]);
    // hidden from people; a bot that fills every field fills this one too
    var hp = el('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off' });
    var hpWrap = el('div', { 'class': 'amdg-hp', 'aria-hidden': 'true' }, [hp]);
    var notice = el('p', { 'class': 'amdg-notice', id: 'amdg-notice' });
    var files = el('p', { 'class': 'amdg-files' });
    var eyebrow = el('span', { 'class': 'amdg-eyebrow', text: 'AMD NSRI · Tools' });
    var langBtns = LANGS.map(function (L) {
      var b = el('button', { type: 'button', 'class': 'amdg-lang', 'aria-pressed': 'false', lang: L.toLowerCase(), text: L });
      b.addEventListener('click', function () { lang = L; render(); });
      return b;
    });
    var form = el('form', { novalidate: '' }, [label, input, check, err, hpWrap, btn]);
    var panel = el('div', { 'class': 'amdg-panel' }, [
      el('div', { 'class': 'amdg-top' }, [eyebrow, el('div', { 'class': 'amdg-langs' }, langBtns)]),
      title, lead, test, form, el('div', { 'class': 'amdg-rule', 'aria-hidden': 'true' }), notice, files,
    ]);
    var root = el('div', { 'class': 'amdg', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'amdg-title', 'aria-describedby': 'amdg-lead amdg-notice' }, [panel]);

    function render() {
      var tx = s.text[lang] || s.text.EN;
      root.setAttribute('dir', lang === 'AR' ? 'rtl' : 'ltr');
      root.setAttribute('lang', lang.toLowerCase());
      title.textContent = tx.title;
      lead.textContent = tx.lead;
      if (test) test.textContent = tx.dryRun;
      label.textContent = tx.emailLabel;
      input.setAttribute('placeholder', tx.emailPlaceholder);
      consentText.textContent = tx.consent;
      btnText.textContent = btn.disabled ? tx.sending : tx.submit;
      notice.textContent = tx.notice;
      files.textContent = tx.filesNote;
      if (err.getAttribute('data-key')) err.textContent = tx[err.getAttribute('data-key')];
      langBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.textContent === lang)); });
    }
    function showError(key) { err.setAttribute('data-key', key); render(); }
    function clearError() { err.removeAttribute('data-key'); err.textContent = ''; }

    // the page under the panel can't be reached by keyboard, pointer or screen reader while it is open
    var inerted = [];
    Array.prototype.forEach.call(document.body.children, function (c) {
      if (c !== root && !c.hasAttribute('inert')) { c.setAttribute('inert', ''); inerted.push(c); }
    });
    function close() {
      inerted.forEach(function (c) { c.removeAttribute('inert'); });
      root.remove();
    }

    var EMAIL = /^[^\s@<>"(),;:\\[\]]+@[^\s@<>"(),;:\\[\]]+\.[^\s@<>"(),;:\\[\]]{2,}$/;
    input.addEventListener('input', clearError);
    consent.addEventListener('change', clearError);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      var email = input.value.trim();
      if (!EMAIL.test(email) || email.length > 254) { showError('errEmail'); input.focus(); return; }
      if (!consent.checked) { showError('errConsent'); consent.focus(); return; }
      clearError();
      btn.disabled = true; render();
      var t = withTimeout(8000);
      fetch('/api/tool-gate/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, consent: true, website: hp.value, tool: TOOL, lang: lang, ms: Date.now() - shownAt }),
        signal: t.signal,
      })
        .then(function (r) { t.done(); return r.status === 400 ? r.json().catch(function () { return {}; }) : null; })
        .catch(function () { t.done(); return null; })
        .then(function (bad) {
          // the server only refuses an address its own check rejects; anything else (sent, not sent, slow, down) opens the tool
          if (bad && bad.error === 'invalid email') { btn.disabled = false; showError('errEmail'); input.focus(); return; }
          grantAccess();
          close();
        });
    });

    render();
    document.body.appendChild(root);
    setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } }, 50);
  }
})();
