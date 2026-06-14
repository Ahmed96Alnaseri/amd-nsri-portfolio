'use client';

import { useEffect, useRef, useState } from 'react';

const LAYERS = [
  {
    num: '01', name: 'CLADDING PANEL',
    material: 'Perforated aluminum 3mm',
    note: 'Pattern logic controls perforation density per zone',
  },
  {
    num: '02', name: 'SUBSTRUCTURE',
    material: 'Galvanized steel brackets',
    note: 'Transfers load from panel to primary structure',
  },
  {
    num: '03', name: 'HORIZONTAL RAIL',
    material: 'Aluminum extrusion',
    note: 'Carries vertical panel load, allows thermal movement',
  },
  {
    num: '04', name: 'INSULATION',
    material: 'Mineral wool 100mm',
    note: 'Thermal and acoustic separation layer',
  },
  {
    num: '05', name: 'PRIMARY STRUCTURE',
    material: 'Concrete or steel frame',
    note: 'Main building structure, anchor point for system',
  },
];

export default function FabricationIntelligenceSection() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<{ idx: number; x: number; y: number } | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = (idx: number) => (e: React.MouseEvent) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({ idx, x: e.clientX - rect.left, y: e.clientY - rect.top });
      setTooltipVisible(true);
    }
  };

  const moveTooltip = (idx: number) => (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({ idx, x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
    leaveTimer.current = setTimeout(() => setTooltip(null), 200);
  };

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty('--revealed', '1');
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealRefs.current.filter(Boolean).forEach((el) => textObserver.observe(el!));

    const svgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && svgRef.current) {
            svgRef.current.classList.add('fi-svg-visible');
            svgObserver.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (svgRef.current) svgObserver.observe(svgRef.current);

    return () => {
      textObserver.disconnect();
      svgObserver.disconnect();
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  const KEYWORDS = [
    { label: 'Panel Division',         note: 'Geometry rationalization for fabrication' },
    { label: 'Unfolding Logic',        note: 'Flat pattern extraction from 3D surfaces' },
    { label: 'Substructure',           note: 'Support systems and fixing geometry' },
    { label: 'Material Limits',        note: 'Bend radii, sheet sizes, tolerances' },
    { label: 'Assembly Sequence',      note: 'Installation order and site logic' },
    { label: 'Production Constraints', note: 'CNC, laser, press brake parameters' },
  ];

  return (
    <section className="fabint-section" aria-labelledby="fabint-heading">
      <span className="fabint-bg-number" aria-hidden="true">05</span>

      <div className="fabint-top-rule" aria-hidden="true">
        <span className="fabint-section-label">05 — Fabrication Intelligence</span>
        <div className="fabint-rule-line" />
        <span className="fabint-header-tag">Exploded assembly — P-04</span>
      </div>

      <div className="fabint-inner">

        {/* Left — text */}
        <div className="fabint-left">
          <p
            ref={setRef(0)}
            className="fabint-eyebrow reveal-item"
            style={{ '--delay': '0ms' } as React.CSSProperties}
          >
            Production logic
          </p>

          <h2
            id="fabint-heading"
            ref={setRef(1)}
            className="fabint-heading reveal-item"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            The hidden<br />
            <em>intelligence</em><br />
            behind buildable<br />
            design.
          </h2>

          <p
            ref={setRef(2)}
            className="fabint-body reveal-item"
            style={{ '--delay': '160ms' } as React.CSSProperties}
          >
            Behind every complex form there is a hidden structure of decisions:
            panel division, unfolding logic, substructure coordination, material
            limits, assembly sequence, and production constraints. AMD NSRI treats
            fabrication not as the end of design, but as part of the design
            language itself.
          </p>

          <div
            ref={setRef(3)}
            className="fabint-kw-table reveal-item"
            style={{ '--delay': '240ms' } as React.CSSProperties}
          >
            {KEYWORDS.map((kw, i) => (
              <div key={i} className="fabint-kw-row">
                <span className="fabint-kw-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="fabint-kw-label">{kw.label}</span>
                <span className="fabint-kw-note">{kw.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — exploded isometric assembly diagram */}
        <div ref={containerRef} className="fabint-right" aria-hidden="true">
          <span className="fabint-tick fabint-tick-tl" />
          <span className="fabint-tick fabint-tick-br" />
          <svg
            ref={svgRef}
            className="fabint-svg"
            viewBox="0 0 700 510"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
          {/*
            Portrait oblique: ox=155, H=75 (vertical face height), W=55 (dxW=48, dyW=28)
            No right/side faces — each layer: front face + top edge only
            Layer anchors (oy = front-face bottom-left y):
              L1 oy=95   D=6   L2 oy=188  D=18
              L3 oy=281  D=8   L4 oy=374  D=24
              L5 oy=467  D=34
            Gap = 18px between layers
          */}
          <g transform="translate(0,0)">{/* nudge wrapper */}

            {/* ══════════════════════════════════════════════════════
                ALIGNMENT DASHES — straight vertical lines in gaps
                Front-left x=155, Front-right x=203 (+28 y offset)
                ══════════════════════════════════════════════════════ */}
            {/* Front-left column x=155 */}
            <line x1="155" y1="95"  x2="155" y2="113" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            <line x1="155" y1="188" x2="155" y2="206" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            <line x1="155" y1="281" x2="155" y2="299" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            <line x1="155" y1="374" x2="155" y2="392" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            {/* Front-right column x=203 */}
            <line x1="203" y1="123" x2="203" y2="141" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            <line x1="203" y1="216" x2="203" y2="234" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            <line x1="203" y1="309" x2="203" y2="327" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />
            <line x1="203" y1="402" x2="203" y2="420" stroke="#2a2a26" strokeWidth="0.6" strokeDasharray="3 4" className="fi-align" />

            {/* ══════════════════════════════════════════════════════
                LAYER 05 — PRIMARY STRUCTURE  (oy=467, D=34)
                ══════════════════════════════════════════════════════ */}
            <g
              onMouseEnter={showTooltip(4)}
              onMouseMove={moveTooltip(4)}
              onMouseLeave={hideTooltip}
              style={{ cursor: 'crosshair' }}
            >
              <polygon points="155,467 203,495 203,420 155,392"
                fill="rgba(5,5,4,0.97)" stroke="#5a5854" strokeWidth="1.1" className="fi-l5" />
              <polygon points="155,392 203,420 174,437 126,409"
                fill="rgba(7,7,6,0.97)" stroke="#5a5854" strokeWidth="1.1" className="fi-l5" />
              <line x1="155" y1="458" x2="203" y2="486" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
              <line x1="155" y1="448" x2="203" y2="476" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
              <line x1="155" y1="439" x2="203" y2="467" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
              <line x1="155" y1="430" x2="203" y2="458" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
              <line x1="155" y1="420" x2="203" y2="448" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
              <line x1="155" y1="411" x2="203" y2="439" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
              <line x1="155" y1="401" x2="203" y2="429" stroke="#2e2e2a" strokeWidth="0.5" className="fi-l5" />
            </g>
            {/* Label — outside hover group so it doesn't flicker */}
            <line x1="203" y1="457" x2="215" y2="457" stroke="#4a4a46" strokeWidth="0.7" className="fi-label" />
            <text x="219" y="461" fill="#5a5854" fontSize="9" fontFamily="monospace" className="fi-l5-text">05 — PRIMARY STRUCTURE</text>

            {/* ══════════════════════════════════════════════════════
                LAYER 04 — INSULATION  (oy=374, D=24)
                ══════════════════════════════════════════════════════ */}
            <g
              onMouseEnter={showTooltip(3)}
              onMouseMove={moveTooltip(3)}
              onMouseLeave={hideTooltip}
              style={{ cursor: 'crosshair' }}
            >
              <polygon points="155,374 203,402 203,327 155,299"
                fill="rgba(18,18,16,0.97)" stroke="#464642" strokeWidth="0.9" strokeDasharray="4 3" className="fi-l4" />
              <polygon points="155,299 203,327 182,339 134,311"
                fill="rgba(20,20,18,0.97)" stroke="#464642" strokeWidth="0.9" strokeDasharray="4 3" className="fi-l4" />
              <line x1="155" y1="355" x2="203" y2="383" stroke="#2a2a28" strokeWidth="0.5" strokeDasharray="2 5" className="fi-l4" />
              <line x1="155" y1="337" x2="203" y2="365" stroke="#2a2a28" strokeWidth="0.5" strokeDasharray="2 5" className="fi-l4" />
              <line x1="155" y1="318" x2="203" y2="346" stroke="#2a2a28" strokeWidth="0.5" strokeDasharray="2 5" className="fi-l4" />
            </g>
            <line x1="203" y1="364" x2="215" y2="364" stroke="#4a4a46" strokeWidth="0.7" className="fi-label" />
            <text x="219" y="368" fill="#5a5854" fontSize="9" fontFamily="monospace" className="fi-l4-text">04 — INSULATION</text>

            {/* ══════════════════════════════════════════════════════
                LAYER 03 — HORIZONTAL RAIL  (oy=281, D=8)
                ══════════════════════════════════════════════════════ */}
            <g
              onMouseEnter={showTooltip(2)}
              onMouseMove={moveTooltip(2)}
              onMouseLeave={hideTooltip}
              style={{ cursor: 'crosshair' }}
            >
              <polygon points="155,281 203,309 203,234 155,206"
                fill="rgba(9,9,8,0.97)" stroke="#424240" strokeWidth="0.9" className="fi-l3" />
              <polygon points="155,206 203,234 196,238 148,210"
                fill="rgba(10,10,9,0.97)" stroke="#424240" strokeWidth="0.9" className="fi-l3" />
              <line x1="155" y1="259" x2="203" y2="287" stroke="#363634" strokeWidth="0.7" className="fi-l3" />
              <line x1="155" y1="229" x2="203" y2="257" stroke="#363634" strokeWidth="0.7" className="fi-l3" />
            </g>
            <line x1="203" y1="271" x2="215" y2="271" stroke="#4a4a46" strokeWidth="0.7" className="fi-label" />
            <text x="219" y="275" fill="#5a5854" fontSize="9" fontFamily="monospace" className="fi-l3-text">03 — HORIZONTAL RAIL</text>

            {/* ══════════════════════════════════════════════════════
                LAYER 02 — SUBSTRUCTURE  (oy=188, D=18)
                ══════════════════════════════════════════════════════ */}
            <g
              onMouseEnter={showTooltip(1)}
              onMouseMove={moveTooltip(1)}
              onMouseLeave={hideTooltip}
              style={{ cursor: 'crosshair' }}
            >
              <polygon points="155,188 203,216 203,141 155,113"
                fill="rgba(9,9,8,0.97)" stroke="#626260" strokeWidth="1" className="fi-l2" />
              <polygon points="155,113 203,141 187,150 139,122"
                fill="rgba(10,10,9,0.97)" stroke="#626260" strokeWidth="1" className="fi-l2" />
              <line x1="169" y1="121" x2="169" y2="196" stroke="#787874" strokeWidth="0.8" className="fi-l2" />
              <line x1="189" y1="133" x2="189" y2="208" stroke="#787874" strokeWidth="0.8" className="fi-l2" />
              <line x1="155" y1="151" x2="203" y2="179" stroke="#787874" strokeWidth="0.8" className="fi-l2" />
            </g>
            <line x1="203" y1="178" x2="215" y2="178" stroke="#4a4a46" strokeWidth="0.7" className="fi-label" />
            <text x="219" y="182" fill="#686864" fontSize="9" fontFamily="monospace" className="fi-l2-text">02 — SUBSTRUCTURE</text>

            {/* ══════════════════════════════════════════════════════
                LAYER 01 — CLADDING PANEL  (oy=95, D=6) — COPPER
                ══════════════════════════════════════════════════════ */}
            <g
              onMouseEnter={showTooltip(0)}
              onMouseMove={moveTooltip(0)}
              onMouseLeave={hideTooltip}
              style={{ cursor: 'crosshair' }}
            >
              <polygon points="155,95 203,123 203,48 155,20"
                fill="rgba(9,9,8,0.97)" stroke="#b8956a" strokeWidth="1.2" className="fi-l1" />
              <polygon points="155,20 203,48 198,51 150,23"
                fill="rgba(10,9,7,0.97)" stroke="#b8956a" strokeWidth="1.2" className="fi-l1" />
              <circle cx="169" cy="85"  r="2.5" stroke="#b8956a" strokeWidth="0.7" fill="rgba(0,0,0,0.95)" className="fi-l1-dot" />
              <circle cx="186" cy="94"  r="2.5" stroke="#b8956a" strokeWidth="0.7" fill="rgba(0,0,0,0.95)" className="fi-l1-dot" />
              <circle cx="169" cy="66"  r="2.5" stroke="#b8956a" strokeWidth="0.7" fill="rgba(0,0,0,0.95)" className="fi-l1-dot" />
              <circle cx="186" cy="76"  r="2.5" stroke="#b8956a" strokeWidth="0.7" fill="rgba(0,0,0,0.95)" className="fi-l1-dot" />
              <circle cx="169" cy="47"  r="2.5" stroke="#b8956a" strokeWidth="0.7" fill="rgba(0,0,0,0.95)" className="fi-l1-dot" />
              <circle cx="186" cy="57"  r="2.5" stroke="#b8956a" strokeWidth="0.7" fill="rgba(0,0,0,0.95)" className="fi-l1-dot" />
            </g>
            <line x1="203" y1="85"  x2="215" y2="85"  stroke="#b8956a" strokeWidth="0.7" className="fi-label" />
            <text x="219" y="89" fill="#b8956a" fontSize="9" fontFamily="monospace" className="fi-l1-text">01 — CLADDING PANEL</text>

            {/* ── Diagram footer ── */}
            <text x="126" y="505" fill="rgba(232,228,220,0.10)" fontSize="7" fontFamily="monospace" className="fi-l5-text">AMD NSRI / EXPLODED ASSEMBLY / P-04 FACADE PANEL</text>

          </g>
          </svg>

          {/* Hover tooltip */}
          {tooltip !== null && (
            <div
              className={`fi-tooltip${tooltipVisible ? ' fi-tooltip-visible' : ''}`}
              style={{
                left: Math.min(tooltip.x + 20, (containerRef.current?.offsetWidth ?? 600) - 280),
                top: Math.max(tooltip.y - 110, 8),
              }}
            >
              <div className="fi-tt-num">{LAYERS[tooltip.idx].num}</div>
              <div className="fi-tt-name">{LAYERS[tooltip.idx].name}</div>
              <div className="fi-tt-material">{LAYERS[tooltip.idx].material}</div>
              <div className="fi-tt-note">{LAYERS[tooltip.idx].note}</div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom title-block strip — drawing sheet language */}
      <div className="fabint-bottom" aria-hidden="true">
        <span>Facade panel system</span>
        <span>Exploded assembly</span>
        <span>Scale 1 : 5</span>
        <span className="fabint-bottom-fill">Sheet 05 / 06</span>
      </div>
    </section>
  );
}
