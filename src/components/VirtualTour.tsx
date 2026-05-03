import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

const VirtualTour: React.FC = () => {
  const [iframeError, setIframeError] = useState(false);

  // Direct Google Maps Street View link for users to open
  const mapsUrl = "https://www.google.com/maps/@2.854621928644923,-60.64307256511704,3a,75y,48.38h,83.31t/data=!3m7!1e1!3m5!1sCAoSFkNJSE0wb2dLRUlDQWdJQzE1cmlPR3c.!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail!7i16384!8i8192?entry=ttu";

  return (
    <section id="virtual-tour" className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '4rem', maxWidth: '700px' }}>
          <p style={{
            fontSize: '0.8rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--accent-orange)',
            marginBottom: '1.2rem'
          }}>
            EXPERIÊNCIA IMERSIVA
          </p>
          <h2 className="section-title">
            Tour Virtual<br />
            <span className="orange-text italic">pelo Showroom</span>
          </h2>
          <p style={{
            color: 'var(--muted-gray)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginTop: '1.5rem',
            maxWidth: '540px'
          }}>
            Visite nossa loja em Boa Vista pelo Google Maps 360°. Navegue pelos ambientes e confira nossos materiais premium in loco.
          </p>
        </div>

        {/* iframe container */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            background: '#141414',
          }}
        >
          {!iframeError ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1773802367684!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzE1cmlPR3c.!2m2!1d2.854621928644923!2d-60.64307256511704!3f48.37717050657783!4f-6.691971807381336!5f0.7820865974627469"
              style={{ border: 0, width: '100%', height: '580px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tour Virtual Boa Vista Pisos"
              onError={() => setIframeError(true)}
            />
          ) : (
            /* Fallback card when iframe fails */
            <div style={{
              height: '580px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '3rem',
              textAlign: 'center',
            }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'rgba(255,107,0,0.1)',
                border: '1px solid rgba(255,107,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <MapPin size={32} color="var(--accent-orange)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Visite Nosso Showroom</h3>
                <p style={{ color: 'var(--muted-gray)', maxWidth: '400px' }}>
                  Abra o tour 360° diretamente no Google Maps para a melhor experiência.
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  background: 'var(--accent-orange)', color: '#fff',
                  padding: '1rem 2.5rem', borderRadius: '50px',
                  fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em',
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={18} />
                Abrir Tour 360° no Maps
              </a>
            </div>
          )}

          {/* Live badge */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            background: 'rgba(13,13,13,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '0.6rem 1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            pointerEvents: 'none',
            zIndex: 2,
          }}>
            <span style={{
              width: 8, height: 8,
              borderRadius: '50%',
              background: 'var(--accent-orange)',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--accent-orange)'
            }} />
            <span style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ice-white)'
            }}>
              Tour 360° ao vivo
            </span>
          </div>

          {/* CTA overlay button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              background: 'rgba(13,13,13,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              zIndex: 2,
              color: 'var(--ice-white)',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={14} />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Abrir no Maps
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
