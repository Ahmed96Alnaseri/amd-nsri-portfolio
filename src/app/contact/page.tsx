'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ─── data ─────────────────────────────────────────────────────────── */
const SUBJECTS = [
  'Architecture Project',
  'Facade System',
  'Computational Design',
  'Fabrication Intelligence',
  'Digital Tool',
  'Collaboration',
  'Other',
] as const;

const MAX_CHARS = 600;

/* ─── types ─────────────────────────────────────────────────────────── */
type Fields = { name: string; email: string; subject: string; message: string };
type Errs   = Partial<Record<keyof Fields, string>>;

/* ─── helpers ───────────────────────────────────────────────────────── */
function validate(f: Fields): Errs {
  const e: Errs = {};
  if (!f.name.trim())    e.name    = 'Required';
  if (!f.email.trim())   e.email   = 'Required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Invalid address';
  if (!f.subject)        e.subject = 'Select a subject';
  if (!f.message.trim()) e.message = 'Required';
  return e;
}

/* ─── sub-components ─────────────────────────────────────────────────── */
function Label({ text, error }: { text: string; error?: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px',
      marginBottom: '8px',
    }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: error ? '#e05555' : 'var(--color-text-meta)',
        transition: 'color 300ms ease',
      }}>{text}</span>
      {error && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '0.06em',
          color: '#e05555',
        }}>— {error}</span>
      )}
    </div>
  );
}

function SuccessState() {
  return (
    <div style={{ paddingTop: '48px' }}>
      {/* Circle checkmark */}
      <div style={{
        width: '56px',
        height: '56px',
        border: '1px solid var(--color-accent)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '36px',
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M4.5 11l4 4 9-9"
            stroke="var(--color-accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: 'ctaCheckDraw 550ms cubic-bezier(0.16,1,0.3,1) 100ms forwards',
            }}
          />
        </svg>
      </div>

      <p style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase' as const,
        color: 'var(--color-accent)',
        marginBottom: '20px',
      }}>
        <span style={{ display: 'block', width: '28px', height: '1px', background: 'var(--color-accent)', opacity: 0.7 }} />
        Transmitted
      </p>

      <h2 style={{
        fontFamily: 'var(--font-title)',
        fontSize: 'clamp(32px, 4.5vw, 54px)',
        letterSpacing: '-0.025em',
        lineHeight: 1.05,
        color: 'var(--color-text-primary)',
        marginBottom: '20px',
      }}>
        Message received.
      </h2>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        lineHeight: 1.85,
        letterSpacing: '0.02em',
        color: 'var(--color-text-secondary)',
        maxWidth: '380px',
        marginBottom: '40px',
      }}>
        Thank you for reaching out. I&apos;ll review your message and
        respond within 1–2 business days.
      </p>

      <div style={{ width: '32px', height: '1px', background: 'var(--color-border)', marginBottom: '32px' }} />

      <Link href="/" style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: 'var(--color-text-meta)',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'color 300ms ease',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-meta)')}
      >
        <span>←</span> Return to AMD NSRI
      </Link>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm]         = useState<Fields>({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused]   = useState<string | null>(null);
  const [errors, setErrors]     = useState<Errs>({});
  const [submitting, setSubmit] = useState(false);
  const [done, setDone]         = useState(false);

  const update = (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n; });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmit(true);
    await new Promise(r => setTimeout(r, 1300));
    setDone(true);
    setSubmit(false);
  };

  const inputBase = (name: string): React.CSSProperties => ({
    width: '100%',
    background: focused === name ? 'rgba(184,149,106,0.03)' : 'transparent',
    border: `1px solid ${
      errors[name]   ? '#e05555' :
      focused === name ? 'var(--color-accent)' :
      'var(--color-border)'
    }`,
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    letterSpacing: '0.04em',
    lineHeight: 1.6,
    padding: '15px 20px',
    outline: 'none',
    transition: 'border-color 300ms ease, background 300ms ease',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none' as const,
    boxSizing: 'border-box' as const,
    display: 'block',
  });

  return (
    <>
      {/* ── page-scoped styles ─────────────────────────────────────── */}
      <style>{`
        .cpage-input::placeholder {
          color: var(--color-text-meta);
          font-family: var(--font-body);
          letter-spacing: 0.04em;
        }
        .cpage-select option {
          background: #141412;
          color: var(--color-text-primary);
          font-family: var(--font-body);
        }
        .cpage-textarea {
          resize: none;
          scrollbar-width: thin;
          scrollbar-color: var(--color-border) transparent;
        }
        .cpage-textarea::-webkit-scrollbar       { width: 4px; }
        .cpage-textarea::-webkit-scrollbar-track { background: transparent; }
        .cpage-textarea::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 2px; }
        .cpage-submit-btn:hover:not(:disabled) {
          background: var(--color-accent) !important;
          color: #0d0d0b !important;
        }
        .cpage-email-link:hover { color: var(--color-accent) !important; }
        @keyframes ctaCheckDraw { to { stroke-dashoffset: 0; } }
        @keyframes ctaPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(0.82); }
        }
        @keyframes ctaSpin { to { transform: rotate(360deg); } }
        .avail-pulse { animation: ctaPulseDot 2.2s ease-in-out infinite; }
        /* two-col responsive */
        @media (max-width: 767px) {
          .cpage-grid  { grid-template-columns: 1fr !important; gap: 56px !important; }
          .cpage-wrap  { padding: 96px 24px 64px !important; }
          .cpage-strip { flex-wrap: wrap; gap: 0 20px; }
          .cpage-strip > span { border-right: none !important; padding: 10px 0 0 !important; }
        }
      `}</style>

      <div className="cpage-wrap" style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
        padding: 'clamp(96px, 12vh, 140px) clamp(24px, 8vw, 120px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Ghost number */}
        <span aria-hidden="true" style={{
          position: 'absolute',
          top: '8%',
          right: '-1vw',
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(140px, 22vw, 320px)',
          color: 'var(--color-text-primary)',
          opacity: 0.013,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}>06</span>

        {/* ── Back link ─────────────────────────────────────────────── */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--color-text-meta)',
          textDecoration: 'none',
          marginBottom: '48px',
          position: 'relative',
          zIndex: 1,
          transition: 'color 300ms ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-meta)')}
        >
          <span style={{ fontSize: '15px' }}>←</span>
          AMD NSRI
        </Link>

        {/* ── Top rule ──────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '72px',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text-meta)',
            whiteSpace: 'nowrap',
          }}>06 — Contact</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-meta)',
            whiteSpace: 'nowrap',
          }}>Istanbul, Turkey · Est. 2026</span>
        </div>

        {/* ── Two-column grid ───────────────────────────────────────── */}
        <div className="cpage-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(48px, 10vw, 140px)',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* LEFT — identity + contact info */}
          <div>
            {/* Eyebrow */}
            <p style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '24px',
            }}>
              <span style={{ display: 'block', width: '28px', height: '1px', background: 'var(--color-accent)', opacity: 0.7 }} />
              Get in touch
            </p>

            {/* Heading */}
            <h1 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.04,
              color: 'var(--color-text-primary)',
              marginBottom: '36px',
            }}>
              Start a<br />
              conversation.
            </h1>

            {/* Copper rule */}
            <div style={{ width: '36px', height: '1px', background: 'var(--color-accent)', opacity: 0.7, marginBottom: '48px' }} />

            {/* Contact blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              {/* Email */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-meta)',
                  marginBottom: '10px',
                }}>Email</p>
                <a
                  href="mailto:ahmed@amdnsri.com"
                  className="cpage-email-link"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'color 300ms ease',
                  }}
                >
                  ahmed@amdnsri.com
                  <span style={{ color: 'var(--color-accent)', opacity: 0.65, fontSize: '11px' }}>↗</span>
                </a>
              </div>

              {/* Location */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-meta)',
                  marginBottom: '10px',
                }}>Location</p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '4px',
                }}>Istanbul, Turkey</p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-meta)',
                }}>41.0082° N, 28.9784° E</p>
              </div>

              {/* Availability */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '18px 20px',
                border: '1px solid var(--color-border)',
                background: 'rgba(20,20,18,0.6)',
                marginTop: '8px',
              }}>
                <span className="avail-pulse" style={{
                  display: 'block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  flexShrink: 0,
                  marginTop: '4px',
                }} />
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                    marginBottom: '5px',
                  }}>Currently available</p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    letterSpacing: '0.03em',
                    lineHeight: 1.6,
                    color: 'var(--color-text-meta)',
                  }}>Open to new architecture and fabrication projects</p>
                </div>
              </div>

            </div>

            {/* Corner ticks — bottom-left registration */}
            <div style={{
              marginTop: '64px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M0 14V0h14" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.35" />
              </svg>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-text-meta)',
                opacity: 0.5,
              }}>AMD NSRI / 2026</span>
            </div>
          </div>

          {/* RIGHT — form or success */}
          {done ? <SuccessState /> : (
            <form onSubmit={handleSubmit} noValidate style={{ paddingTop: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

                {/* Name */}
                <div style={{ marginBottom: '24px' }}>
                  <Label text="Name" error={errors.name} />
                  <input
                    className="cpage-input"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={update('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    autoComplete="name"
                    style={inputBase('name')}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '24px' }}>
                  <Label text="Email" error={errors.email} />
                  <input
                    className="cpage-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={update('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    autoComplete="email"
                    style={inputBase('email')}
                  />
                </div>

                {/* Subject */}
                <div style={{ marginBottom: '24px' }}>
                  <Label text="Subject" error={errors.subject} />
                  <div style={{ position: 'relative' }}>
                    <select
                      className="cpage-input cpage-select"
                      value={form.subject}
                      onChange={update('subject')}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputBase('subject'), cursor: 'pointer', paddingRight: '44px' }}
                    >
                      <option value="">Select a subject</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span aria-hidden="true" style={{
                      position: 'absolute',
                      right: '18px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-meta)',
                      fontSize: '9px',
                      pointerEvents: 'none',
                      letterSpacing: '0.1em',
                    }}>▼</span>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '32px' }}>
                  <Label text="Message" error={errors.message} />
                  <div style={{ position: 'relative' }}>
                    <textarea
                      className="cpage-input cpage-textarea"
                      placeholder="Tell me about your project, brief, or idea..."
                      value={form.message}
                      onChange={update('message')}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      maxLength={MAX_CHARS}
                      rows={8}
                      style={inputBase('message')}
                    />
                    {/* Character counter */}
                    <span style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '14px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: form.message.length > MAX_CHARS - 80
                        ? 'var(--color-accent)'
                        : 'var(--color-text-meta)',
                      opacity: form.message.length === 0 ? 0 : 1,
                      pointerEvents: 'none',
                      transition: 'color 300ms ease, opacity 300ms ease',
                    }}>
                      {form.message.length}&thinsp;/&thinsp;{MAX_CHARS}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="cpage-submit-btn"
                  style={{
                    width: '100%',
                    padding: '18px 32px',
                    background: 'transparent',
                    border: '1px solid var(--color-accent)',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'background 400ms ease, color 400ms ease, opacity 300ms ease',
                    opacity: submitting ? 0.65 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                  }}
                >
                  {submitting ? (
                    <>
                      <span style={{
                        width: '11px',
                        height: '11px',
                        border: '1px solid currentColor',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'ctaSpin 700ms linear infinite',
                      }} />
                      Sending
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-meta)',
                  textAlign: 'center',
                  marginTop: '16px',
                  lineHeight: 1.6,
                }}>
                  Or write directly to{' '}
                  <a href="mailto:ahmed@amdnsri.com" className="cpage-email-link" style={{
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 300ms ease',
                  }}>ahmed@amdnsri.com</a>
                </p>

              </div>
            </form>
          )}
        </div>

        {/* ── Bottom title-block strip ───────────────────────────────── */}
        <div className="cpage-strip" style={{
          display: 'flex',
          alignItems: 'stretch',
          borderTop: '1px solid var(--color-line)',
          marginTop: '80px',
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-text-meta)',
          position: 'relative',
          zIndex: 1,
        }}>
          {['AMD NSRI', 'Contact', 'Est. 2026'].map((label, i) => (
            <span key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px clamp(14px, 2.5vw, 36px)',
              borderRight: '1px solid var(--color-line)',
              whiteSpace: 'nowrap',
              ...(i === 0 ? { paddingLeft: 0 } : {}),
            }}>{label}</span>
          ))}
          <span style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '14px 0',
            color: 'var(--color-accent-dim)',
          }}>Sheet 06 / 06</span>
        </div>

      </div>
    </>
  );
}
