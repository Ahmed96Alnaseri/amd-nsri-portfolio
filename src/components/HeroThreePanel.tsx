'use client';

import { useEffect, useRef } from 'react';

// Static SVG fallback for when Three.js fails or is loading
function FallbackPanel() {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', opacity: 0.35 }}
      aria-hidden="true"
    >
      {/* Outer panel frame */}
      <rect x="40" y="60" width="520" height="680" stroke="#2a2a26" strokeWidth="1" fill="none" />
      <rect x="60" y="80" width="480" height="640" stroke="#2e2e2a" strokeWidth="0.5" fill="none" />

      {/* Perforation grid - circular cutouts */}
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const x = 100 + col * 56;
          const y = 130 + row * 48;
          return (
            <circle
              key={`${row}-${col}`}
              cx={x} cy={y} r="7"
              stroke="#2a2a26" strokeWidth="0.8" fill="none"
            />
          );
        })
      )}

      {/* Construction lines */}
      <line x1="60" y1="80" x2="540" y2="720" stroke="#2e2e2a" strokeWidth="0.3" opacity="0.4" />
      <line x1="540" y1="80" x2="60" y2="720" stroke="#2e2e2a" strokeWidth="0.3" opacity="0.4" />

      {/* Panel subdivision */}
      <line x1="60" y1="400" x2="540" y2="400" stroke="#2a2a26" strokeWidth="0.5" />
      <line x1="300" y1="80" x2="300" y2="720" stroke="#2a2a26" strokeWidth="0.5" />

      {/* Accent corner marks */}
      <path d="M40 60 L40 100" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M40 60 L80 60" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M560 60 L560 100" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M520 60 L560 60" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M40 740 L40 700" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M40 740 L80 740" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M560 740 L560 700" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
      <path d="M520 740 L560 740" stroke="#b8956a" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function HeroThreePanel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    let three: typeof import('three') | null = null;
    let renderer: import('three').WebGLRenderer | null = null;
    let animId: number;

    async function init() {
      try {
        three = await import('three');
        const { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Color,
                MeshStandardMaterial, DirectionalLight, AmbientLight,
                CircleGeometry, PlaneGeometry, Group, EdgesGeometry,
                LineSegments, LineBasicMaterial } = three;

        if (!mountRef.current) return;

        const W = mountRef.current.clientWidth;
        const H = mountRef.current.clientHeight;

        // Scene
        const scene = new Scene();

        // Camera
        const camera = new PerspectiveCamera(35, W / H, 0.1, 100);
        camera.position.set(0, 0, 10);

        // Renderer — transparent canvas
        renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting — subtle, industrial
        const ambient = new AmbientLight(0xffffff, 0.15);
        scene.add(ambient);

        const dirLight = new DirectionalLight(0xd4b896, 1.2); // warm copper tint
        dirLight.position.set(3, 5, 8);
        scene.add(dirLight);

        const rimLight = new DirectionalLight(0x1a2030, 0.6); // cool blue-gray rim
        rimLight.position.set(-5, -2, -4);
        scene.add(rimLight);

        // Panel group
        const panelGroup = new Group();

        // Base panel
        const panelGeo = new PlaneGeometry(4.8, 6.4);
        const panelMat = new MeshStandardMaterial({
          color: new Color('#1e1e1c'),
          roughness: 0.75,
          metalness: 0.55,
        });
        const panel = new Mesh(panelGeo, panelMat);
        panelGroup.add(panel);

        // Panel edges — thin technical outline
        const edgesGeo = new EdgesGeometry(panelGeo);
        const edgesMat = new LineBasicMaterial({ color: new Color('#3a3a36'), linewidth: 1 });
        const edges = new LineSegments(edgesGeo, edgesMat);
        edges.position.z = 0.002;
        panelGroup.add(edges);

        // Grid subdivision lines
        const lineMat = new LineBasicMaterial({ color: new Color('#2a2a26'), linewidth: 1 });
        // Horizontal
        for (let i = -3; i <= 3; i++) {
          const geo = new PlaneGeometry(4.8, 0.001);
          const line = new Mesh(geo, lineMat);
          line.position.y = i * 0.8;
          line.position.z = 0.003;
          panelGroup.add(line);
        }
        // Vertical
        for (let i = -2; i <= 2; i++) {
          const geo = new PlaneGeometry(0.001, 6.4);
          const line = new Mesh(geo, lineMat);
          line.position.x = i * 0.96;
          line.position.z = 0.003;
          panelGroup.add(line);
        }

        // Perforations — circular cutouts (dark holes)
        const holeMat = new MeshStandardMaterial({
          color: new Color('#0d0d0b'),
          roughness: 1,
          metalness: 0,
        });

        const ROWS = 10;
        const COLS = 6;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const holeGeo = new CircleGeometry(0.09, 16);
            const hole = new Mesh(holeGeo, holeMat);
            hole.position.set(
              -2.16 + c * 0.72,
              -3.2 + r * 0.72,
              0.004
            );
            panelGroup.add(hole);
          }
        }

        panelGroup.position.set(0.5, 0, 0);
        scene.add(panelGroup);

        // Animate
        function animate() {
          animId = requestAnimationFrame(animate);
          panelGroup.rotation.x += 0.0003;
          panelGroup.rotation.y += 0.0005;
          renderer!.render(scene, camera);
        }
        animate();
        animFrameRef.current = animId;

        // Resize
        const handleResize = () => {
          if (!mountRef.current || !renderer) return;
          const w = mountRef.current.clientWidth;
          const h = mountRef.current.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animId);
          renderer?.dispose();
          if (mountRef.current && renderer?.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
        };
      } catch (err) {
        console.warn('Three.js failed to load — using SVG fallback', err);
      }
    }

    const cleanup = init();

    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      aria-hidden="true"
    >
      {/* SVG fallback is hidden once Three.js canvas mounts */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="three-fallback"
      >
        <FallbackPanel />
      </div>
      <style jsx>{`
        .three-fallback { z-index: 0; }
        div[ref] canvas { position: relative; z-index: 1; }
      `}</style>
    </div>
  );
}
