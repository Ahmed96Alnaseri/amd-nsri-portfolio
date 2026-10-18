// Link-preview images (1200x630) for the tool and project pages, in the style of the site card
// (src/app/opengraph-image.tsx): #0d0d0b ground, copper title, IBM Plex Mono, a short copper rule.
// Writes public/og/<section>/<slug>.(png|jpg) and the list the pages read, src/data/og-images.json.
//
//   node --no-warnings generate.mjs                        every tool and project
//   node --no-warnings generate.mjs tools/ipunch ...       only these (section/slug), into public/og as usual
//   node --no-warnings generate.mjs --out <dir> <ids...>   samples into another folder, each also at a third of the
//                                                          size (<slug>-third.png); the list is not touched
//
// The data is read straight from src/data (Node 23+ runs the TypeScript files as they are).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import tools from '../../src/data/tools.ts';
import { PROJECTS, slugify } from '../../src/data/architectureProjects.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const PUBLIC = path.join(ROOT, 'public');
const MANIFEST = path.join(ROOT, 'src/data/og-images.json');

const W = 1200, H = 630;
const C = { BG: '#0d0d0b', COPPER: '#b8956a', COPPER_DIM: '#7a6144', SECONDARY: '#8a8880' };
const fontFile = (subset) => fs.readFileSync(path.join(HERE, `node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-${subset}-500-normal.woff`));
// Latin, with Latin Extended as a fallback for Turkish letters in project names (ğ, ş). The renderer only falls
// back to a font with a different name, so the extended set is registered under its own name, listed second.
const FONTS = [
  { name: 'IBM Plex Mono', data: fontFile('latin'), weight: 500, style: 'normal' },
  { name: 'IBM Plex Mono Ext', data: fontFile('latin-ext'), weight: 500, style: 'normal' },
];
const FAMILY = 'IBM Plex Mono, IBM Plex Mono Ext';

/** Element for satori: h('div', { display: 'flex', ... }, ...children); an img takes its attributes as `attrs`. */
const h = (type, style, ...children) => ({ type, props: { style: { display: 'flex', ...style }, children: children.flat().filter((c) => c != null && c !== false) } });
const img = (src, width, height, style = {}) => ({ type: 'img', props: { src, width, height, style } });

const dataUri = (buf, type) => `data:${type};base64,${buf.toString('base64')}`;

async function render(tree) {
  const svg = await satori(tree, { width: W, height: H, fonts: FONTS });
  return new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
}

/** x of the cut that drops the hero's left wordmark column: the middle of the first empty (page-colour) gap,
 *  at least 2% of the width wide, that starts between 5% and 40% across. null when there is no such gap. */
async function wordmarkCut(png) {
  const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: hh, channels: ch } = info;
  const filled = (x) => {
    for (let y = 0; y < hh; y++) {
      const i = (y * w + x) * ch;
      if (Math.abs(data[i] - 13) + Math.abs(data[i + 1] - 13) + Math.abs(data[i + 2] - 11) > 24) return true;
    }
    return false;
  };
  let start = -1;
  for (let x = Math.round(w * 0.05); x < w; x++) {
    if (!filled(x)) { if (start < 0) start = x; continue; }
    if (start >= 0 && x - start >= w * 0.02 && start <= w * 0.4) return Math.round((start + x) / 2);
    if (start > w * 0.4) return null;
    start = -1;
  }
  return null;
}

/* ── tool card ──────────────────────────────────────────────────────────────────────────────────────
   With a hero: top row (eyebrow + badge), the tool name, the hero's drawing as large as fits, the description.
   The hero's left wordmark column is left out (the name is set as text instead), which lets the drawing grow;
   a hero without a separate wordmark column is shown whole instead (`layout` says which, for the log).
   Tools without a hero get the site-card layout: the name large, a copper rule, the description. */
async function toolCard(tool) {
  const eyebrow = 'AMD NSRI · TOOLS';
  const badge = (tool.cardBadge ?? tool.status).toUpperCase();
  const top = h('div', { justifyContent: 'space-between', fontSize: 24, letterSpacing: 5 },
    h('div', { color: C.COPPER_DIM }, eyebrow), h('div', { color: C.COPPER }, badge));
  const desc = h('div', { fontSize: 28, lineHeight: 1.4, color: C.SECONDARY }, tool.description);
  const padX = 72;

  if (tool.heroImage) {
    const flat = await sharp(path.join(PUBLIC, tool.heroImage.src)).flatten({ background: C.BG }).png().toBuffer();
    const cut = await wordmarkCut(flat);
    if (cut != null) {
      // drop the wordmark column, then trim the page-colour margins (nothing of the drawing is cut)
      const { width: fw, height: fh } = await sharp(flat).metadata();
      const drawing = await sharp(flat).extract({ left: cut, top: 0, width: fw - cut, height: fh }).png().toBuffer();
      const t = await sharp(drawing).trim({ background: C.BG, threshold: 12 }).png().toBuffer({ resolveWithObject: true });
      const art = await sharp(t.data).extend({ top: 4, bottom: 4, left: 4, right: 4, background: C.BG }).png().toBuffer({ resolveWithObject: true });
      const PAD = 48, GAP = 20, NAME = 52;
      // the height left after the top row, the name, two lines of description, the gaps and 32 px top and bottom
      const room = H - 2 * 32 - 24 - NAME * 1.1 - Math.ceil(2 * 28 * 1.4) - 3 * GAP;
      const scale = Math.min((W - 2 * PAD) / art.info.width, room / art.info.height);
      const aw = Math.round(art.info.width * scale), ah = Math.round(art.info.height * scale);
      const png = await sharp(art.data).resize(aw * 2, ah * 2, { kernel: 'lanczos3' }).png().toBuffer();
      return { layout: 'name + drawing', png: await render(h('div', { width: W, height: H, background: C.BG, fontFamily: FAMILY, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: GAP, padding: '32px 0' },
        h('div', { width: W, padding: `0 ${PAD}px`, flexDirection: 'column' }, top),
        h('div', { width: W, padding: `0 ${PAD}px`, fontSize: NAME, lineHeight: 1.1, letterSpacing: -1, color: C.COPPER }, tool.name),
        img(dataUri(png, 'image/png'), aw, ah),
        h('div', { width: W, padding: `0 ${PAD}px` }, desc))) };
    }
    // No separate wordmark column: the hero whole. Its page-colour margins are trimmed off and it fills
    // almost the whole card width: 24 px each side, up to the height left by the text.
    const trimmed = await sharp(flat).trim({ background: C.BG, threshold: 12 }).png().toBuffer({ resolveWithObject: true });
    const pad = Math.round(trimmed.info.width * 0.012);
    const art = await sharp(trimmed.data).extend({ top: pad, bottom: pad, left: pad, right: pad, background: C.BG }).png().toBuffer({ resolveWithObject: true });
    const scale = Math.min((W - 48) / art.info.width, 400 / art.info.height);
    const heroW = Math.round(art.info.width * scale), heroH = Math.round(art.info.height * scale);
    const png = await sharp(art.data).resize(heroW * 2, heroH * 2, { kernel: 'lanczos3' }).png().toBuffer();
    // eyebrow, hero and description kept together as one block in the middle of the card
    return { layout: 'whole hero (no separate wordmark column)', png: await render(h('div', { width: W, height: H, background: C.BG, fontFamily: FAMILY, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40 },
      h('div', { width: W, padding: '0 48px', flexDirection: 'column' }, top),
      img(dataUri(png, 'image/png'), heroW, heroH),
      h('div', { width: W, padding: '0 48px' }, desc))) };
  }
  return { layout: 'text (no hero)', png: await render(h('div', { width: W, height: H, background: C.BG, fontFamily: FAMILY, flexDirection: 'column', justifyContent: 'space-between', padding: `72px ${padX + 8}px` },
    top,
    h('div', { flexDirection: 'column' },
      h('div', { fontSize: tool.name.length > 14 ? 80 : 120, lineHeight: 1.05, letterSpacing: -3, color: C.COPPER }, tool.name),
      h('div', { width: 220, height: 2, background: C.COPPER, marginTop: 32 })),
    desc)) };
}

/* ── project card: title block left, the cover photo right, feathered into the page colour ─────────── */
const PHOTO_W = 620;
async function projectCard(p) {
  const eyebrow = 'AMD NSRI · ARCHITECTURE';
  // place and year are joined with no-break spaces, so a line break can only fall after the type
  const meta = `${p.type} · ${`${p.location} · ${p.year}`.replace(/ /g, ' ')}`;
  const titleSize = p.title.length <= 20 ? 52 : p.title.length <= 32 ? 44 : 38;
  // The cover photo cropped to the panel. The project's ogPhotoPosition ("x% y%") moves the crop; otherwise a
  // "center 35%"-style position on that image moves it up or down, as on the site.
  const pct = (v) => (v === 'left' || v === 'top' ? 0 : v === 'right' || v === 'bottom' ? 100 : v === 'center' || v == null ? 50 : parseFloat(v));
  const [px, py] = p.ogPhotoPosition ? p.ogPhotoPosition.split(/\s+/) : ['center', p.images.find((i) => i.src === p.coverImage)?.position?.split(/\s+/)[1]];
  const xPct = pct(px), yPct = pct(py);
  const src = sharp(path.join(PUBLIC, p.coverImage));
  const { width: sw, height: sh } = await src.metadata();
  const scale = Math.max((PHOTO_W * 2) / sw, (H * 2) / sh);
  const rw = Math.round(sw * scale), rh = Math.round(sh * scale);
  const photo = await sharp(path.join(PUBLIC, p.coverImage)).resize(rw, rh)
    .extract({ left: Math.round(((rw - PHOTO_W * 2) * xPct) / 100), top: Math.round(((rh - H * 2) * yPct) / 100), width: PHOTO_W * 2, height: H * 2 })
    .jpeg({ quality: 90 }).toBuffer();

  return { layout: 'title + photo', png: await render(h('div', { width: W, height: H, background: C.BG, fontFamily: FAMILY, position: 'relative' },
    img(dataUri(photo, 'image/jpeg'), PHOTO_W, H, { position: 'absolute', right: 0, top: 0 }),
    // a long, eased fade so its end never shows as an edge in a bright sky
    h('div', { position: 'absolute', top: 0, left: W - PHOTO_W, width: 340, height: H,
      backgroundImage: `linear-gradient(to right, ${C.BG} 0%, rgba(13,13,11,0.82) 22%, rgba(13,13,11,0.5) 48%, rgba(13,13,11,0.2) 74%, rgba(13,13,11,0.05) 90%, rgba(13,13,11,0) 100%)` }),
    h('div', { flexDirection: 'column', justifyContent: 'space-between', height: H, width: W - PHOTO_W + 40, padding: '72px 48px 72px 72px' },
      h('div', { fontSize: 20, letterSpacing: 5, color: C.COPPER_DIM }, eyebrow),
      h('div', { flexDirection: 'column' },
        h('div', { fontSize: titleSize, lineHeight: 1.12, letterSpacing: -1, color: C.COPPER }, p.title),
        h('div', { width: 160, height: 2, background: C.COPPER, marginTop: 30 })),
      h('div', { fontSize: 22, lineHeight: 1.45, color: C.SECONDARY }, meta)))) };
}

/* ── run ───────────────────────────────────────────────────────────────────────────────────────────── */
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : null;
const only = new Set(args.filter((a, i) => a !== '--out' && i !== outIdx + 1));

const jobs = [
  ...tools.map((t) => ({ id: `tools/${t.slug}`, make: () => toolCard(t), ext: 'png' })),
  ...PROJECTS.map((p) => ({ id: `architecture/${p.slug ?? slugify(p.title)}`, make: () => projectCard(p), ext: 'jpg' })),
].filter((j) => !only.size || only.has(j.id));

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
for (const job of jobs) {
  const { layout, png } = await job.make();
  // tool cards stay PNG (thin drawing lines); project cards are photos, so JPEG keeps them small
  const file = job.ext === 'png'
    ? await sharp(png).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer()
    : await sharp(png).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  const rel = `og/${job.id}.${job.ext}`;
  const dest = path.join(outDir ?? PUBLIC, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, file);
  manifest[job.id] = `/${rel}`;
  // samples (--out) also get a copy at a third of the size, about the width of a link preview on a phone
  if (outDir) fs.writeFileSync(dest.replace(/\.(png|jpg)$/, '-third.png'), await sharp(png).resize(400, 210, { kernel: 'lanczos3' }).png().toBuffer());
  console.log(`${job.id.padEnd(40)} ${(file.length / 1024).toFixed(0).padStart(4)} KB  ${layout.padEnd(42)} ${dest}`);
}
if (!outDir) fs.writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + '\n');
