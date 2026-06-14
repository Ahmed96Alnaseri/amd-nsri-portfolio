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
