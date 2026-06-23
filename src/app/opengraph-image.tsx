import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AMD NSRI — Computational Design & Fabrication Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TITLE = 'AMD NSRI';
const EYEBROW = 'EST. 2026 · ISTANBUL';
const TAGLINE = 'Computational Design · Facade Engineering · Fabrication Intelligence';

/**
 * Fetch IBM Plex Mono as a TTF from Google Fonts. Requesting the css2 endpoint
 * without a browser User-Agent makes Google return a truetype src (which Satori
 * can rasterize). Returns null on any failure so the image still renders with
 * Satori's default font rather than throwing.
 */
async function loadIbmPlexMono(): Promise<ArrayBuffer | null> {
  try {
    const text = encodeURIComponent(TITLE + EYEBROW + TAGLINE);
    const cssUrl = `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&text=${text}`;
    const css = await (await fetch(cssUrl)).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (match) {
      const res = await fetch(match[1]);
      if (res.status === 200) return await res.arrayBuffer();
    }
  } catch {
    // graceful fallback — see return below
  }
  return null;
}

export default async function OpengraphImage() {
  const fontData = await loadIbmPlexMono();

  const BG = '#0d0d0b';
  const COPPER = '#b8956a';
  const COPPER_DIM = '#7a6144';
  const SECONDARY = '#8a8880';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '72px 80px',
          fontFamily: 'IBM Plex Mono',
        }}
      >
        {/* Top — eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 6,
            color: COPPER_DIM,
            textTransform: 'uppercase',
          }}
        >
          {EYEBROW}
        </div>

        {/* Center — wordmark + rule */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 168,
              lineHeight: 1,
              letterSpacing: -6,
              color: COPPER,
            }}
          >
            {TITLE}
          </div>
          <div
            style={{
              display: 'flex',
              width: 220,
              height: 2,
              background: COPPER,
              marginTop: 36,
            }}
          />
        </div>

        {/* Bottom — tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 1,
            color: SECONDARY,
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'IBM Plex Mono', data: fontData, weight: 500, style: 'normal' }]
        : undefined,
    },
  );
}
