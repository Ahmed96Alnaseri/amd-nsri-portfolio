import Image from 'next/image';

interface HeroPanelImageProps {
  rightBleed?: string;
  solidStop?: number;
  objectPosition?: string;
  grayscale?: boolean;
  opacity?: number;
}

export default function HeroPanelImage({
  rightBleed = '0%',
  solidStop = 0.22,
  objectPosition = 'right center',
  grayscale = false,
  opacity = 0.7,
}: HeroPanelImageProps) {
  const s0 = Math.round(solidStop * 100);
  const s1 = Math.round((solidStop + 0.10) * 100);
  const s2 = Math.round((solidStop + 0.20) * 100);
  const s3 = Math.round((solidStop + 0.32) * 100);
  const s4 = Math.round((solidStop + 0.44) * 100);
  const s5 = Math.round((solidStop + 0.56) * 100);

  const gradient =
    `linear-gradient(to right, ` +
    `#0d0d0b 0%, ` +
    `#0d0d0b ${s0}%, ` +
    `rgba(13,13,11,0.90) ${s1}%, ` +
    `rgba(13,13,11,0.65) ${s2}%, ` +
    `rgba(13,13,11,0.30) ${s3}%, ` +
    `rgba(13,13,11,0.08) ${s4}%, ` +
    `rgba(13,13,11,0.00) ${s5}%` +
    `)`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: `-${rightBleed}`,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/hero-panel2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition,
          opacity,
          filter: grayscale ? 'grayscale(100%)' : 'none',
        }}
      />

      {/* Left-to-right fade — solid dark → image */}
      <div style={{ position: 'absolute', inset: 0, background: gradient, zIndex: 3 }} />

      {/* Top edge fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(to bottom, #0d0d0b 0%, #0d0d0b 55%, rgba(13,13,11,0.6) 80%, transparent 100%)',
        zIndex: 4,
      }} />

      {/* Bottom edge fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '14%',
        background: 'linear-gradient(to top, #0d0d0b 0%, transparent 100%)',
        zIndex: 4,
      }} />
    </div>
  );
}
