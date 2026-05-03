import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Curadoria',
    description: 'Cada material é escolhido pessoalmente em pedreiras exclusivas ao redor do mundo, garantindo qualidade inigualável.',
    number: '01',
    icon: '◇',
  },
  {
    title: 'Refino',
    description: 'Processamento de alta precisão que respeita os veios naturais e a história geológica de cada pedra.',
    number: '02',
    icon: '◈',
  },
  {
    title: 'Execução',
    description: 'Instalação técnica e supervisão artística para garantir a perfeição absoluta da sua visão arquitetônica.',
    number: '03',
    icon: '◉',
  },
];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connector line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.5, ease: 'power2.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 75%',
            }
          }
        );
      }

      // Animate each step card
      gsap.utils.toArray<HTMLElement>('.process-step-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        );
      });

      // Animate step icons
      gsap.utils.toArray<HTMLElement>('.process-icon').forEach((icon, i) => {
        gsap.fromTo(icon,
          { scale: 0, rotate: -90 },
          {
            scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.7)', delay: i * 0.15 + 0.3,
            scrollTrigger: { trigger: icon, start: 'top 80%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section">
      {/* Unique concrete-like textured BG */}
      <div className="process-bg-texture" />

      <div className="container">
        <div className="process-header">
          <p className="process-eyebrow">A JORNADA</p>
          <h2 className="section-title">
            O Caminho para a<br />
            <span className="orange-text">Perfeição</span>
          </h2>
          <p className="process-subtitle">
            Três etapas. Uma obsessão pela excelência.
          </p>
        </div>

        {/* Horizontal connector */}
        <div className="process-connector">
          <div className="process-connector-line" ref={lineRef} />
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-step-card glass-card">
              {/* Number badge */}
              <div className="process-num-badge">{step.number}</div>

              {/* Icon */}
              <div className="process-icon">{step.icon}</div>

              {/* Divider line */}
              <div className="process-card-line" />

              <h4 className="process-step-title">{step.title}</h4>
              <p className="process-step-desc">{step.description}</p>

              {/* Bottom accent */}
              <div className="process-card-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
