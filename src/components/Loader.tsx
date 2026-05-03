import React, { useEffect, useRef } from 'react';
import heropg from '../assets/heropg.png';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Progressive loading animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Finish animation: fade out loader
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            loaderRef.current.style.opacity = '0';
            loaderRef.current.style.transform = 'scale(1.04)';
            setTimeout(onComplete, 700);
          }
        }, 300);
      }

      if (barRef.current) barRef.current.style.width = `${progress}%`;
      if (counterRef.current) counterRef.current.textContent = Math.floor(progress).toString();
    }, 80);

    // Animate text in
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        overflow: 'hidden',
      }}
    >
      {/* Hero image as full-screen bg */}
      <img
        src={heropg}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.85) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '3rem',
      }}>
        <h1
          ref={textRef}
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(1.6rem, 5vw, 3.2rem)',
            letterSpacing: '0.5em',
            fontWeight: 300,
            color: '#F5F5F5',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            textTransform: 'uppercase',
          }}
        >
          BOA VISTA PISOS
        </h1>

        <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Counter */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
          }}>
            <span ref={counterRef}>0</span>
            <span>%</span>
          </div>

          {/* Progress track */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}>
            <div
              ref={barRef}
              style={{
                width: '0%',
                height: '100%',
                background: 'var(--premium-orange)',
                transition: 'width 0.1s linear',
                borderRadius: '1px',
              }}
            />
          </div>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}>
            Carregando experiência
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
