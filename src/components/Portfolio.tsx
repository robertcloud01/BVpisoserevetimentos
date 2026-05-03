import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import apartment from '../assets/apartment.png';
import bathroom from '../assets/bathroom.png';
import villa from '../assets/villa.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Penthouse Skyline',
    category: 'Integração Total em Mármore',
    location: 'Boa Vista, RR',
    image: apartment,
    size: 'large',
  },
  {
    id: 2,
    title: 'Minimalist Loft',
    category: 'Concreto Escovado',
    location: 'Comercial Premium',
    image: bathroom,
    size: 'small',
  },
  {
    id: 3,
    title: 'Heritage Villa',
    category: 'Restauração de Travertino',
    location: 'Arquitetura Clássica',
    image: villa,
    size: 'small',
  },
];

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.portfolio-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-header', start: 'top 80%' }
        }
      );

      // Cards stagger reveal
      gsap.utils.toArray<HTMLElement>('.pf-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
            scrollTrigger: { trigger: item, start: 'top 85%' }
          }
        );
      });

      // Subtle parallax on images
      gsap.utils.toArray<HTMLElement>('.pf-img').forEach(img => {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="portfolio-section section-padding">
      {/* Unique portfolio ambient: deep dark with subtle grid */}
      <div className="portfolio-bg-grid" />

      <div className="container">
        <div className="portfolio-header">
          <p className="portfolio-eyebrow">Obras Selecionadas</p>
          <h2 className="section-title">
            Ícones<br />
            <span className="orange-text">Arquitetônicos</span>
          </h2>
          <p className="portfolio-header-desc">
            Projetos onde cada centímetro quadrado conta uma história.
          </p>
        </div>

        <div className="pf-grid">
          {projects.map(project => (
            <div
              key={project.id}
              className={`pf-item pf-item--${project.size}`}
            >
              <div className="pf-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="pf-img"
                />
                <div className="pf-card-overlay">
                  <div className="pf-card-content">
                    <span className="pf-category">{project.category}</span>
                    <h3 className="pf-title">{project.title}</h3>
                    <span className="pf-location">{project.location}</span>
                  </div>
                  <div className="pf-icon-btn">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-footer">
          <button className="portfolio-all-btn">
            Ver Todos os Projetos <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
