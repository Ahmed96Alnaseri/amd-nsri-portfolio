'use client';

import { useEffect, useRef } from 'react';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'amd-facade': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

/* Strips the widget's standalone chrome so it sits directly on the section:
   its own background, title bar and footer belong to the standalone page, not here.
   Applied to this instance's shadow root, so the standalone page keeps them. */
const EMBED_CSS = `
  .widget { background: transparent; }
  .topline { padding: 0; border-bottom: none; }
  .title { display: none; }
  .mode { position: absolute; top: 16px; right: 16px; z-index: 10; border-radius: 0; }
  .detail { border-bottom: none; }
  .components, .note { display: none; }
`;

export default function AmdFacade() {
  const hostRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;

    // The widget's definition lives in the standalone page, so that file stays the
    // single source of truth; here only its script is lifted out and run.
    const define = async () => {
      if (customElements.get('amd-facade')) return;
      const html = await fetch('/amd-nsri-facade.html').then((r) => r.text());
      if (cancelled || customElements.get('amd-facade')) return;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('script').forEach((source) => {
        if (!source.textContent?.includes('amd-facade')) return;
        const script = document.createElement('script');
        script.textContent = source.textContent;
        document.head.appendChild(script);
      });
    };

    define()
      .then(() => customElements.whenDefined('amd-facade'))
      .then(() => {
        const root = hostRef.current?.shadowRoot;
        if (cancelled || !root || root.querySelector('style[data-embed]')) return;
        const style = document.createElement('style');
        style.setAttribute('data-embed', '');
        style.textContent = EMBED_CSS;
        root.appendChild(style);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <amd-facade
      ref={hostRef}
      aria-label="Interactive metal façade assembly"
      style={{ width: '100%', display: 'block' }}
    />
  );
}
