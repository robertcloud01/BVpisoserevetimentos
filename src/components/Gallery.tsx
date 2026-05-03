import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Eagerly import all images from assets directory
const imagesModules = import.meta.glob('../assets/*.{webp,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });
const images = Object.values(imagesModules) as string[];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.gallery-header', 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: '.gallery-header',
            start: 'top 80%',
          }
        }
      );
      
      // Items animation
      gsap.fromTo('.gallery-item', 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-masonry',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="section-padding">
      <div className="container">
        <div className="gallery-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="products-cta-eyebrow" style={{ justifyContent: 'center' }}>PORTFÓLIO DE SUCESSO</p>
          <h2 className="section-title">
            Nossa <span className="orange-text">Galeria</span>
          </h2>
          <p className="contact-desc" style={{ maxWidth: '600px', margin: '1rem auto' }}>
            Inspire-se com alguns dos nossos projetos mais recentes, onde o design encontra a excelência em cada detalhe.
          </p>
        </div>
        
        <div className="gallery-masonry">
          {images.map((src, index) => (
            <div key={index} className="gallery-item">
              <img src={src} alt={`Projeto ${index + 1}`} loading="lazy" />
              <div className="gallery-item-overlay">
                <span className="gallery-item-text">Ver Detalhes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
