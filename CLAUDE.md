# AMD NSRI Design System

## IDENTITY
A design-driven ecosystem for architecture, computational design, facade systems,
digital tools, and fabrication intelligence.
Tone: Precise. Minimal. Industrial. Experimental. Technical. Mature.
NOT gaming. NOT crypto. NOT generic startup.

---

## COLORS

```css
--color-bg:            #0d0d0b
--color-surface:       #141412
--color-surface-2:     #1c1c19
--color-border:        #2a2a26
--color-text-primary:  #e8e4dc
--color-text-secondary:#8a8880
--color-text-meta:     #5a5854
--color-accent:        #b8956a
--color-accent-dim:    #7a6144
--color-line:          #2e2e2a
```

---

## TYPOGRAPHY

- Title font: **DM Serif Display** (Google Fonts) — headings only
- Body font: **IBM Plex Mono** (Google Fonts) — everything else
- Never use Inter, Roboto, Arial, or system fonts.
- Heading letter-spacing: `-0.02em`
- Label letter-spacing: `0.08em`
- Body line-height: `1.7`

Import:
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&display=swap
```

---

## SPACING

- 8px base grid
- Section padding: 160px top and bottom minimum
- Side margins: 80px minimum, 120px on large screens
- Section numbers (01, 02...) visible as large muted background text

---

## GRID

- 12-column grid inspired by architectural drawings
- Mix full-width cinematic sections with contained text columns
- Asymmetric layouts preferred: text left + visual right, or reversed

---

## ANIMATIONS — CSS ONLY, NO LIBRARIES

- Scroll reveal: `opacity 0 + translateY(20px)` → `opacity 1 + translateY(0)`
- Duration: `700ms`. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`. Stagger: `80ms`.
- Hover transitions: `400ms` minimum. Never instant.
- No bouncing. No spring effects. No flashy transitions.

---

## DECORATIVE ELEMENTS

- Thin 1px technical lines as dividers
- Grid overlays, panel outlines, construction lines as background texture
- Perforation dot patterns used sparingly
- All decorative elements: opacity `0.03` to `0.12` only

---

## NEVER DO

- No bright colors
- No neon or crypto gradients
- No purple on white
- No SaaS-style rounded buttons
- No stock photos
- No centered hero with gradient blob
- No card carousels
- No emojis
- No Material Design shadows

---

## GRADIENTS

Gradients are atmospheric depth, not decoration.
Background always: `#0d0d0b`
Gradient overlays: radial, maximum opacity 0.15
Color hints: warm copper `#b8956a` and deep blue-gray `#1a2030`

### Hero gradient:
```css
background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,149,106,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(26,32,48,0.12) 0%, transparent 60%),
            #0d0d0b;
```

### Section transition:
```css
background: linear-gradient(180deg, #0d0d0b 0%, #10100e 50%, #0d0d0b 100%);
```

---

## ANIMATIONS (DETAIL)

CSS keyframes and IntersectionObserver only. No Framer Motion. No GSAP.

- **Geometry Generation** (Hero background): SVG points appear, connect into lines, form panel grid. Animate SVG `stroke-dashoffset` with CSS keyframes.
- **Scroll Reveal** (all sections): IntersectionObserver triggers opacity+translateY. 700ms, cubic-bezier(0.16, 1, 0.3, 1), 80ms stagger.
- **Panel Assembly** (Ecosystem section): Five cards slide into position from slight offset on scroll.
- **Project Card Hover**: Hidden technical overlay appears — tags, grid lines, production keywords. 400ms opacity transition.
- **Background Parallax**: Grid lines move at 0.3x scroll speed vs foreground.
- **Navigation Hover**: Thin underline draws left to right. 300ms linear.
- **Button Hover**: Fill from bottom to top with accent color. 350ms.

---

## 3D HERO ELEMENT

Use Three.js. Hero section only.
- Flat perforated metal panel with circular cutouts
- Color: `#1e1e1c` with subtle specular highlight
- Very slow auto-rotation: X `0.0003`, Y `0.0005` per frame
- No user interaction — passive only
- Position: right side of hero, partially cropped by viewport edge
- Canvas transparent — blends into dark background
- Fallback if Three.js fails: static SVG panel outline
- The 3D element must NOT dominate. Typography is primary.

---

## TECHNICAL LIMITS

- `localStorage` and `sessionStorage` do NOT work in artifacts — use React state
- Only core Tailwind utility classes available in React — no custom config
- Always single file per artifact — CSS and JS inside the same HTML or React file
- Never put API keys in public code

---

## TECH STACK

- Next.js 14 App Router + TypeScript + Tailwind CSS
- shadcn/ui — install with: `npx shadcn@latest init`
- Use shadcn for: navigation, dialogs, forms, separators, tabs
- Override ALL shadcn default styles completely
- Every component must match the AMD NSRI design system

---

## PLATFORM CONTENT

- **Name**: AMD NSRI
- **Founder**: Ahmed Alnaseri — Iraqi architect, Istanbul
- **Mission**: Connecting architectural imagination with fabrication reality
- **AMD meaning**: From Ahmed. Also from the Arabic word أَمَد — meaning goal, endpoint, distance, time, duration, and the path toward a destination. Let this meaning inform the platform's language. Never state it literally on the site.

### Hero copy:
```
AMD NSRI
A design-driven ecosystem connecting architectural imagination with fabrication reality.
From concept to geometry.
From geometry to systems.
From systems to tools.
From tools to fabrication.
From fabrication to built reality.
[Explore the Ecosystem]    [View Selected Works]
```

---

## NAVIGATION

### Desktop (sticky, transparent → solid on scroll):
`AMD NSRI  |  Tools  |  Design  |  Architecture  |  Fabrication  |  Works  |  Journal  |  Contact`

### Mobile (hamburger → full-screen vertical):
```
01  Identity       — Platform identity and founder
02  Tools          — Computational design systems
03  Design         — Experimental design and objects
04  Architecture   — Spatial concepts and visualization
05  Fabrication    — Production and fabrication logic
06  Works          — All projects
07  Journal        — Articles and process notes
08  Contact        — Collaboration inquiries
```

---

## HOME PAGE — 8 SECTIONS

### Section 01 — Hero
Layout: text left, Three.js panel right (partially cropped)
Background: atmospheric radial gradient, copper hint
SVG technical line animation generating behind text
Scroll behavior: hero lines transform from points to panel outlines to architectural mass.

### Section 02 — Platform Statement
Full-width. Large muted "02" as background text. Thin top border.

### Section 03 — Five-Part Ecosystem
Title: "One platform. Five connected directions."
Five technical cards. 2-2-1 grid desktop, single column mobile.

Cards:
- 01 AMD NSRI — Identity, philosophy, founder, journey, design direction.
- 02 AMD Tools — Computational systems, Grasshopper, panelization, automation, AI-assisted design.
- 03 AMD Design — Facade studies, parametric objects, furniture, experimental pieces, material explorations.
- 04 AMD Architecture — Buildings, spaces, urban concepts, visualization, architectural storytelling.
- 05 AMD Fabrication — Shop drawings, production geometry, unfolding, panel division, substructure logic.

### Section 04 — Concept to Built Reality Flow
Horizontal timeline desktop, vertical mobile.
Stages: Concept → Geometry → System → Tool → Fabrication → Built Reality

### Section 05 — Featured Works
3-column grid desktop, 1 column mobile. Technical mini-sheet cards.

### Section 06 — Founder
Asymmetric: text left, abstract geometry SVG right. No photos.

### Section 07 — Fabrication Intelligence
Full-width dark section. Subtle exploded panel diagram as background.

### Section 08 — Call to Action
Wide margins, large text, two buttons.

---

## BUILD ORDER

1. Project setup (Next.js + Tailwind + shadcn + fonts)
2. Create and confirm CLAUDE.md
3. Global CSS variables and base styles
4. Navigation component
5. Hero section (Three.js panel + SVG animation)
6. Platform Statement section
7. Ecosystem section (five cards)
8. Concept-to-Reality flow
9. Featured Works (placeholder cards)
10. Founder section
11. Fabrication Intelligence section
12. Call to Action
13. Footer
14. Inner page shells
15. Case Study template

Stop after each item. Wait for screenshot feedback before continuing.

---

## FEEDBACK LOOP

After building each section: stop. Wait for the user to send a screenshot.
The user will circle or annotate the exact issue.
Read the screenshot carefully. Fix only what is marked. Confirm what changed.
Do not ask for text descriptions — wait for the screenshot.

---

## MODEL SWITCHING PROTOCOL

Signal format:
- `[SWITCH TO OPUS]` — design judgment, architecture, complex reasoning
- `[SWITCH TO SONNET]` — repetitive section code, inner page shells, isolated fixes

Always signal BEFORE starting the task. Wait for user confirmation before proceeding.

---

## FINAL PRINCIPLE

This website must feel like a technical archive, portfolio, and design system combined.
Every spacing, color, animation speed, font size, and line weight must feel intentional.
Nothing should look like a template. Nothing should look generated.
AMD NSRI must feel like it was designed by the same intelligence that builds the work inside it.

---

# PROJECT HANDBOOK (added 2026-10-19, trimmed 2026-10-22)

Everything above this line is the original design-system brief, kept word for word.
Everything below is the working handbook for Claude sessions on this project.
Private notes (local paths, plans, account details) are kept outside the repository and imported here:

@~/.claude/amd-nsri-private.md

---

## WHO I AM

- Ahmed Alnaseri, architect in Istanbul, owner of AMD NSRI (https://amdnsri.com).

---

## MY WORKING RULES

### How to talk to me
- Reply in English only, short and simple. Long or complicated instructions confuse me.
- Never use Turkish words in chat replies (website translation text is fine).
- Symptom first: tell me what you found before proposing a fix.
- When you ask me to run something: one command per code block, then ask me for a screenshot.
- Give complete final scripts, not partial edits.
- Report plainly, mark unsure things, show what you checked. Stop and ask when the request does not match reality.

### Git and deploy
- Always ask before every push to main, even after all checks pass.
- Merge into main with a merge commit (`--no-ff`). A fast-forward push of a commit already built as a Vercel preview does not start a production deploy; if that happens, push an empty commit.
- `git save` is an alias for add + commit + push. It pushes the CURRENT branch, so never run it (or run_git_save.bat) without asking me.
- Preview first: new branch, local or Vercel preview, screenshots, then ask.
- Check the live site after each deploy, in the browser pane. Repeated curl calls to amdnsri.com trigger Vercel's security checkpoint (403).
- Vercel previews need a Vercel login in the browser pane: I sign in myself.
- The repository is public: never commit personal details, local paths, plans or account details. They belong in the private notes.

### Safety
- Never delete anything outside the project folder. Ask before any delete inside it. Never put cleanup in compound commands. Write test files to new, uniquely named folders.
- Do not touch DNS at all.
- Never sign in and never enter credentials for me. No real emails are sent until I approve.
- Never put secrets in code, logs, summaries or this file. Setting names only.

### Site work
- Trilingual site: every text add, edit or delete must be done in EN, TR and AR (src/lib/translations.ts).
- Arabic must be Modern Standard Arabic, never dialect. Always check Arabic right-to-left layout.
- Check desktop and phone widths (375 and 390 px) and Arabic RTL; show screenshots.
- Keep the design system above (dark #0d0d0b, copper #b8956a, DM Serif Display + IBM Plex Mono).
- Project routing: a Built project is also copied to src/data/fabrication-projects.ts; a Concept Design project is also copied to src/data/design-projects.ts.
- My specs often use names that are not in the code (for example title instead of name): map them to the real names and tell me about any differences.
- `next build` while `next dev` runs breaks the dev server (shared .next folder): build in a separate git worktree instead.

---

## DECISIONS

- Email gate instead of the old newsletter:
  - email asked once before the 4 free tool pages (IPunch, NESTRI, NESTRI PRO, Expanded Mesh Generator); the /tools/<tool> detail pages stay open for search engines
  - forward-only by SMTP to the gate mailbox; nothing stored on our side (no database, no Vercel storage, no logs with emails)
  - single opt-in with two required checkboxes: "I have read the Privacy Notice" and explicit consent; one welcome email after sign-up, no confirmation email
  - if SMTP fails or the hourly limit is reached, the sign-up is lost (accepted); the visitor still gets access
  - gate API routes run in Vercel Frankfurt (fra1)
  - off by default
- Mail for the gate: one mailbox on news.amdnsri.com, at most 60 emails per hour; each sign-up uses 2 (sign-up + welcome).
- Old Neon/Resend newsletter code stays in place, unused and off.
- /privacy and /consent show the gate versions when the gate is on, the newsletter versions when only the newsletter is on, and 404 when both are off.
- OG preview images are static files made by scripts/og-images (the Next OG library fails to build on Windows).
- Search engines see English only (TR/AR are switched in the browser). Searchable TR/AR addresses (SEO step 6) are postponed.

---

## SETTINGS (names only, never values)

- Email gate (src/lib/tool-gate/config.ts): TOOL_GATE_MODE (off | preview | live; default off; preview is never active in production), SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS, SMTP_FROM, TOOL_GATE_TO, TOOL_GATE_HOURLY_MAX (optional, default 50, max 60), TOOL_GATE_BLOCK_KEY and TOOL_GATE_BLOCKED (optional: the removed list, see src/lib/tool-gate/removed.ts and scripts/gate-block-hash.mjs), TOOL_GATE_LOCAL_TEST (only for local `next start` testing).
- Contact form (Resend): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
- Old newsletter (off): NEWSLETTER_MODE, NEWSLETTER_SECRET, DATABASE_URL, SITE_URL, RESEND_API_KEY, CONTACT_FROM_EMAIL, NEWSLETTER_REPLY_TO, CRON_SECRET, NEWSLETTER_PREVIEW_CONFIRM_TTL_MINUTES.
- Vercel cron: /api/newsletter/cleanup daily at 03:00 (does nothing without a database and CRON_SECRET).
- Redirects: amd-nsri-portfolio-alpha.vercel.app → amdnsri.com (next.config.mjs); www.amdnsri.com → amdnsri.com (Vercel).
- Card images: width and height are stored next to cardImage in src/data/tools.ts; update them when a card file is replaced.
- OG images: cd scripts/og-images, npm install, npm run generate; then commit public/og/ and src/data/og-images.json.

---

## HELPER FILES

- In the project:
  - start_dev.bat: opens a window "AMD Dev Server" running npm run dev
  - run_git_save.bat: runs git save (commit + push of the current branch). Never run it without asking me.
  - sleep_pc.bat: puts the PC to sleep
  - start_claude_rc.vbs: opens Claude in the project folder and turns on remote control
- Dev server port can be 3000 or 3001: check it with an HTTP request. .claude/launch.json exists, but the Browser preview tool may pick another project's config; start the dev server in a Terminal tab instead.
