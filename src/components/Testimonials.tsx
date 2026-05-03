import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Alexander V. Wright',
    role: 'Arquiteto Principal, Wright & Partners',
    content: 'O nível de maestria e a seleção de materiais fornecidos pela Boa Vista Pisos são inigualáveis. O mármore Carrara deles transformou nosso último projeto de cobertura em uma obra-prima.',
    stars: 5,
    initial: 'A',
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    role: 'Designer de Interiores',
    content: 'Encontrar um fornecedor que entenda a união entre a textura bruta e o luxo refinado é raro. A coleção de concreto industrial deles é a melhor com que já trabalhei.',
    stars: 5,
    initial: 'E',
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    role: 'Incorporador Privado',
    content: 'Desde a consulta inicial até a instalação final, a atenção aos detalhes foi excepcional. Eles não apenas vendem pisos; eles entregam fundações arquitetônicas.',
    stars: 5,
    initial: 'M',
  },
];

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotateX: 8 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 82%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="testimonials-section">
      {/* Unique warm stone ambient */}
      <div className="testimonials-ambient-left" />
      <div className="testimonials-ambient-right" />

      <div className="container">
        <div className="testimonials-header">
          <p className="testimonials-eyebrow">DEPOIMENTOS</p>
          <h2 className="section-title">
            Perspectivas do<br />
            <span className="orange-text">Setor</span>
          </h2>
          <p className="testimonials-subtitle">
            Profissionais que confiam no nosso padrão de excelência.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card glass-card">
              {/* Quote icon */}
              <div className="testimonial-quote-icon">
                <Quote size={28} />
              </div>

              {/* Stars */}
              <div className="testimonial-stars">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--accent-orange)" color="var(--accent-orange)" />
                ))}
              </div>

              <p className="testimonial-content">"{t.content}"</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div className="testimonial-author-info">
                  <strong className="testimonial-author-name">{t.name}</strong>
                  <span className="testimonial-author-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
