import React, { useState, useEffect } from 'react';

// Date cible : Pâques 2025 (20 avril 2025)
const TARGET_DATE = new Date('2026-04-05T23:59:59');

const PromoCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FF4500 0%, #FF6A00 60%, #FF8C00 100%)',
        borderBottom: '3px solid rgba(0,0,0,0.1)',
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        zIndex: 49,
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20px', left: '10%',
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '16px 20px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '12px',
        position: 'relative', zIndex: 1,
      }}>
        {/* Left: Title + Discount */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div style={{
              fontSize: '11px', fontWeight: '700', letterSpacing: '2px',
              color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', marginBottom: '2px',
            }}>
              🐣 Offre Spéciale
            </div>
            <div style={{
              fontSize: '20px', fontWeight: '900', color: '#fff',
              letterSpacing: '-0.5px', lineHeight: 1,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              PÂQUES
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            borderRadius: '50px',
            padding: '6px 18px',
          }}>
            <span style={{
              fontSize: '22px', fontWeight: '900', color: '#fff',
              textShadow: '0 2px 6px rgba(0,0,0,0.25)',
            }}>
              -20% sur nos tarifs
            </span>
          </div>

          <p style={{
            fontSize: '13px', color: 'rgba(255,255,255,0.85)',
            fontStyle: 'italic', margin: 0,
          }}>
            Vivez ce temps pascal dans la productivité
          </p>
        </div>

        {/* Center: Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { value: timeLeft.days, label: 'Jours' },
            { value: timeLeft.hours, label: 'Heures' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: '10px',
                  padding: '6px 10px',
                  minWidth: '52px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                  <div style={{
                    fontSize: '26px', fontWeight: '900', color: '#fff',
                    lineHeight: 1, fontVariantNumeric: 'tabular-nums',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                </div>
                <div style={{
                  fontSize: '10px', color: 'rgba(255,255,255,0.7)',
                  marginTop: '3px', fontWeight: '600', letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}>
                  {item.label}
                </div>
              </div>
              {i < 3 && (
                <div style={{
                  fontSize: '20px', fontWeight: '900', color: 'rgba(255,255,255,0.6)',
                  marginBottom: '14px', lineHeight: 1,
                }}>:</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right: CTA + Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#reservation"
            style={{
              background: '#fff',
              color: '#FF4500',
              fontWeight: '800',
              fontSize: '14px',
              padding: '10px 22px',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.2px',
            }}
            onMouseEnter={e => {
              (e.target as HTMLAnchorElement).style.transform = 'scale(1.05)';
              (e.target as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLAnchorElement).style.transform = 'scale(1)';
              (e.target as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
          >
            Consulter l'offre →
          </a>
          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              width: '28px', height: '28px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            title="Fermer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCountdown;
