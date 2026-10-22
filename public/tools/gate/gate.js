/*
 * Email gate for the free tools (IPunch, NESTRI, NESTRI PRO, Expanded Mesh Generator).
 * Included by each tool page: <script src="/tools/gate/gate.js" data-tool="<tool>" defer></script>
 *
 * - Asks /api/tool-gate/status whether the gate is on (TOOL_GATE_MODE, src/lib/tool-gate/config.ts). If it is off,
 *   or the request fails, nothing happens: the tool opens as before.
 * - Otherwise it covers the tool with a panel asking for an email and two separate, required approvals (Privacy
 *   Notice read; explicit consent), which link to /privacy and /consent. The page underneath is untouched (search
 *   engines see it as before) and made inert while the panel is open.
 * - After the form is sent, this device remembers that it has signed up, with the date and the address's hash from
 *   the server (never the address itself), and the panel does not come back. Access is granted even if the server is
 *   slow or fails.
 * - On every later visit of any page that loads this script, only that hash is sent to /api/tool-gate/check. If the
 *   address is on the removed list (its owner asked to stop emails), the stored sign-up is cleared and the panel comes
 *   back with a message; the sign-up also refuses such an address. If the check fails, the tool stays open.
 * - Text in EN/TR/AR comes from the status answer (src/lib/translations.ts, toolGate).
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var TOOL = (script && script.getAttribute('data-tool')) || 'unknown';
  var KEY = 'amd-nsri-tool-access';
  var KINDS = ['localStorage', 'sessionStorage'];
  var memoryAccess = null; // last resort when the browser blocks storage: this page visit only

  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  /** The stored sign-up ({ v, t, h? }), or null. A sign-up from before the removed list has no hash (h). */
  function readAccess() {
    if (memoryAccess) return memoryAccess;
    for (var i = 0; i < KINDS.length; i++) {
      var s = store(KINDS[i]);
      try {
        var raw = s && s.getItem(KEY);
        if (raw) { try { return JSON.parse(raw) || {}; } catch (e) { return {}; } }
      } catch (e) { /* blocked */ }
    }
    return null;
  }
  function hasAccess() { return !!readAccess(); }
  function grantAccess(token) {
    // a flag, a date and the address's hash from the server, never the address
    var access = token ? { v: 2, t: Date.now(), h: token } : { v: 1, t: Date.now() };
    var value = JSON.stringify(access);
    for (var i = 0; i < KINDS.length; i++) {
      var s = store(KINDS[i]);
      try { if (s) { s.setItem(KEY, value); return; } } catch (e) { /* try the next one */ }
    }
    memoryAccess = access;
  }
  function clearAccess() {
    memoryAccess = null;
    for (var i = 0; i < KINDS.length; i++) {
      var s = store(KINDS[i]);
      try { if (s) s.removeItem(KEY); } catch (e) { /* blocked */ }
    }
  }

  function withTimeout(ms) {
    var ctrl = 'AbortController' in window ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, ms) : null;
    return { signal: ctrl ? ctrl.signal : undefined, done: function () { if (timer) clearTimeout(timer); } };
  }

  function loadGate(blocked) {
    var t0 = withTimeout(6000);
    fetch('/api/tool-gate/status', { cache: 'no-store', signal: t0.signal })
      .then(function (r) { t0.done(); return r.ok ? r.json() : null; })
      .then(function (s) { if (s && s.enabled && s.text && s.approvals && !hasAccess()) open(s, blocked); })
      .catch(function () { t0.done(); /* gate off or unreachable: the tool stays open */ });
  }

  // an earlier sign-up: send only its hash; on "blocked" clear it and show the gate again. Any failure keeps the tool open.
  function checkRemoved(token) {
    var tc = withTimeout(6000);
    fetch('/api/tool-gate/check', {
      method: 'POST', cache: 'no-store', signal: tc.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    })
      .then(function (r) { tc.done(); return r.ok ? r.json() : null; })
      .then(function (c) { if (c && c.blocked === true) { clearAccess(); loadGate(true); } })
      .catch(function () { tc.done(); console.warn('[tool-gate] removed-list check failed; the tool stays open'); });
  }

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
    // 16px: iPhones zoom the page in on fields with smaller text
    '.amdg-input{width:100%;font:inherit;font-size:16px;color:#e8e4dc;background:#141412;border:1px solid #2a2a26;padding:12px 14px;outline:none;direction:ltr;text-align:left;transition:border-color .3s}',
    '.amdg-input::placeholder{color:#5a5854;opacity:1}',
    '.amdg-input:focus{border-color:#b8956a}',
    '.amdg-check{display:flex;gap:12px;align-items:flex-start;margin:20px 0 6px;cursor:pointer;color:#e8e4dc;font-size:13px}',
    '.amdg-check input{flex:none;width:17px;height:17px;margin:3px 0 0;accent-color:#b8956a;cursor:pointer}',
    '.amdg-check + .amdg-check{margin-top:12px}',
    '.amdg-check a{color:#b8956a;text-decoration:none;border-bottom:1px solid rgba(184,149,106,.45)}',
    '.amdg-check a:hover,.amdg-check a:focus-visible{border-bottom-color:#b8956a}',
    '.amdg-sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}',
    '.amdg-err{min-height:20px;margin:6px 0 0;font-size:12px;color:#d98a6a}',
    '.amdg-blocked{margin:0 0 18px;padding:12px 14px;border:1px solid rgba(217,138,106,.5);font-size:12.5px;line-height:1.6;color:#d98a6a}',
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
    '.amdg-files{font-size:11.5px;color:#5a5854;margin:0}',
    '.amdg-test{margin:0 0 18px;padding:8px 12px;border:1px dashed rgba(184,149,106,.5);color:#b8956a;font-size:11px;letter-spacing:.06em}',
    // hidden in place (clipped to nothing), not moved off-screen: an offset would widen the panel in right-to-left
    '.amdg-hp{position:absolute!important;width:1px!important;height:1px!important;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}',
    '.amdg-hp input{width:1px;height:1px;padding:0;border:0}',
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

  function open(s, blocked) {
    var isBlocked = !!blocked;
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
    var blockedMsg = el('p', { 'class': 'amdg-blocked', id: 'amdg-blocked', role: 'alert' });
    var label = el('label', { 'class': 'amdg-label', 'for': 'amdg-email' });
    var input = el('input', { 'class': 'amdg-input', id: 'amdg-email', type: 'email', name: 'email', autocomplete: 'email', inputmode: 'email', required: '', maxlength: '254', dir: 'ltr' });
    // two separate, unticked, required approvals (texts versioned in src/lib/tool-gate/consent-texts.json)
    var privacy = el('input', { type: 'checkbox', id: 'amdg-privacy', name: 'privacy', required: '' });
    var privacyText = el('span');
    var privacyCheck = el('label', { 'class': 'amdg-check', 'for': 'amdg-privacy' }, [privacy, privacyText]);
    var consent = el('input', { type: 'checkbox', id: 'amdg-consent', name: 'consent', required: '' });
    var consentText = el('span');
    var consentCheck = el('label', { 'class': 'amdg-check', 'for': 'amdg-consent' }, [consent, consentText]);
    var newTabNote = el('span', { 'class': 'amdg-sr', id: 'amdg-newtab' });
    var err = el('p', { 'class': 'amdg-err', role: 'alert', 'aria-live': 'polite' });
    var btnText = el('span');
    var arrow = el('span', { 'class': 'amdg-arrow', 'aria-hidden': 'true', text: '→' });
    var btn = el('button', { 'class': 'amdg-btn', type: 'submit' }, [btnText, arrow]);
    // hidden from people; a bot that fills every field fills this one too
    var hp = el('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off' });
    var hpWrap = el('div', { 'class': 'amdg-hp', 'aria-hidden': 'true' }, [hp]);
    var files = el('p', { 'class': 'amdg-files' });
    var eyebrow = el('span', { 'class': 'amdg-eyebrow', text: 'AMD NSRI · Tools' });
    var langBtns = LANGS.map(function (L) {
      var b = el('button', { type: 'button', 'class': 'amdg-lang', 'aria-pressed': 'false', lang: L.toLowerCase(), text: L });
      b.addEventListener('click', function () { lang = L; render(); });
      return b;
    });
    var form = el('form', { novalidate: '' }, [label, input, privacyCheck, consentCheck, newTabNote, err, hpWrap, btn]);
    var panel = el('div', { 'class': 'amdg-panel' }, [
      el('div', { 'class': 'amdg-top' }, [eyebrow, el('div', { 'class': 'amdg-langs' }, langBtns)]),
      title, lead, blockedMsg, test, form, el('div', { 'class': 'amdg-rule', 'aria-hidden': 'true' }), files,
    ]);
    var root = el('div', { 'class': 'amdg', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'amdg-title', 'aria-describedby': 'amdg-lead' }, [panel]);

    // an approval text with its [[text|/path]] links: the page opens in a new tab, in the panel's language, so what
    // was typed here is kept
    function fillApproval(node, markup) {
      node.textContent = '';
      markup.split(/(\[\[[^\]|]+\|[^\]]+\]\])/).forEach(function (part) {
        var m = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/);
        if (!m) { if (part) node.appendChild(document.createTextNode(part)); return; }
        node.appendChild(el('a', { href: m[2] + '?lang=' + lang, target: '_blank', rel: 'noopener', 'aria-describedby': 'amdg-newtab', text: m[1] }));
      });
    }

    function render() {
      var tx = s.text[lang] || s.text.EN;
      root.setAttribute('dir', lang === 'AR' ? 'rtl' : 'ltr');
      root.setAttribute('lang', lang.toLowerCase());
      title.textContent = tx.title;
      lead.textContent = tx.lead;
      if (test) test.textContent = tx.dryRun;
      label.textContent = tx.emailLabel;
      input.setAttribute('placeholder', tx.emailPlaceholder);
      fillApproval(privacyText, s.approvals.privacy[lang] || s.approvals.privacy.EN);
      fillApproval(consentText, s.approvals.consent[lang] || s.approvals.consent.EN);
      newTabNote.textContent = tx.newTab;
      btnText.textContent = btn.disabled ? tx.sending : tx.submit;
      files.textContent = tx.filesNote;
      blockedMsg.hidden = !isBlocked;
      blockedMsg.textContent = isBlocked ? tx.blocked : '';
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
    privacy.addEventListener('change', clearError);
    consent.addEventListener('change', clearError);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      var email = input.value.trim();
      if (!EMAIL.test(email) || email.length > 254) { showError('errEmail'); input.focus(); return; }
      if (!privacy.checked) { showError('errPrivacy'); privacy.focus(); return; }
      if (!consent.checked) { showError('errConsent'); consent.focus(); return; }
      clearError();
      btn.disabled = true; render();
      var t = withTimeout(8000);
      fetch('/api/tool-gate/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, privacy: true, consent: true, website: hp.value, tool: TOOL, lang: lang, ms: Date.now() - shownAt }),
        signal: t.signal,
      })
        .then(function (r) {
          t.done();
          return r.json().then(function (j) { return { status: r.status, body: j || {} }; }, function () { return { status: r.status, body: {} }; });
        })
        .catch(function () { t.done(); return null; })
        .then(function (res) {
          var body = (res && res.body) || {};
          // the server refuses only an address its own check rejects, or one on the removed list; anything else
          // (sent, not sent, slow, down) opens the tool
          if (res && res.status === 400 && body.error === 'invalid email') { btn.disabled = false; showError('errEmail'); input.focus(); return; }
          if (res && res.status === 403 && body.blocked) { btn.disabled = false; isBlocked = true; render(); input.focus(); return; }
          grantAccess(typeof body.token === 'string' ? body.token : null);
          close();
        });
    });

    render();
    document.body.appendChild(root);
    setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } }, 50);
  }

  var access = readAccess();
  if (!access) loadGate(false);
  else if (typeof access.h === 'string') checkRemoved(access.h);
})();
