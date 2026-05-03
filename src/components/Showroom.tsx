import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import carrara from '../assets/carrara.png';
import nero from '../assets/nero.png';
import concrete from '../assets/concrete.png';
import travertine from '../assets/travertine.png';
import villa from '../assets/villa.png';

gsap.registerPlugin(Draggable);

const projects = [
  { id: 1, title: 'Penthouse Vila Nova', category: 'Residencial Luxo', image: carrara, year: '2025' },
  { id: 2, title: 'Lobby Corporate Tower', category: 'Comercial Premium', image: nero, year: '2024' },
  { id: 3, title: 'Residência Quinta Lago', category: 'Arquitetura Moderna', image: concrete, year: '2024' },
  { id: 4, title: 'Hotel Boutique Central', category: 'Hospitalidade', image: travertine, year: '2023' },
  { id: 5, title: 'Loft Atelier Soho', category: 'Design de Interiores', image: villa, year: '2023' },
];

const Showroom: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Calculate max drag distance
    const maxX = () => -(track.scrollWidth - container.offsetWidth);

    let draggable: Draggable[];
    const setupDraggable = () => {
      draggable = Draggable.create(track, {
        type: 'x',
        bounds: { minX: maxX(), maxX: 0 },
        inertia: true,
        edgeResistance: 0.9,
        onDrag() {
          const progress = Math.abs(this.x / maxX());
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: Math.min(progress, 1) });
          }
        },
        onThrowUpdate() {
          const progress = Math.abs(this.x / maxX());
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: Math.min(progress, 1) });
          }
        },
      });
    };
    setupDraggable();

    // Card entrance animation
    const cards = track.querySelectorAll<HTMLElement>('.showroom-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        }
      }
    );

    const handleResize = () => {
      if (draggable && draggable[0]) {
        draggable[0].applyBounds({ minX: maxX(), maxX: 0 });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (draggable) draggable.forEach(d => d.kill());
    };
  }, []);

  return (
    <section id="showroom" className="showroom-section">
      {/* Ambient background glow */}
      <div className="showroom-ambient" />

      {/* Title block */}
      <div className="container showroom-title-block">
        <div className="showroom-title-inner">
          <p className="showroom-eyebrow">SHOWROOM DE PROJETOS</p>
          <h2 className="section-title">
            Transformação em<br />
            <span className="orange-text italic">Cada Detalhe</span>
          </h2>
          <p className="showroom-desc">
            Explore nossa galeria de projetos realizados. Arraste para descobrir.
          </p>
        </div>

        {/* Progress bar */}
        <div className="showroom-progress-track">
          <div className="showroom-progress-bar" ref={progressRef} />
        </div>
        <div className="showroom-scroll-hint">
          <span className="showroom-scroll-line" />
          <span>Arraste para explorar</span>
        </div>
      </div>

      {/* Draggable track container */}
      <div className="showroom-pin-container" ref={containerRef}>
        <div className="showroom-track" ref={trackRef}>
          {projects.map((project, idx) => (
            <div key={project.id} className="showroom-card">
              <div className="showroom-card-inner">
                <img
                  src={project.image}
                  alt={project.title}
                  className="showroom-card-img"
                  draggable={false}
                />
                <div className="showroom-card-overlay">
                  <div className="showroom-card-meta">
                    <span className="showroom-card-num">0{idx + 1}</span>
                    <span className="showroom-card-year">{project.year}</span>
                  </div>
                  <div className="showroom-card-info">
                    <span className="showroom-card-category">{project.category}</span>
                    <h3 className="showroom-card-title">{project.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="showroom-card showroom-cta-card">
            <div className="showroom-cta-inner">
              <div className="showroom-cta-decor" />
              <p className="showroom-cta-eyebrow">PRÓXIMO PASSO</p>
              <h4 className="showroom-cta-heading">
                Pronto para seu<br />próximo projeto?
              </h4>
              <a href="#contato" className="showroom-cta-link">
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom;
