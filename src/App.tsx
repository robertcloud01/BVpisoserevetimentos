import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Assets & Components
import logoPisos from './assets/logopisos.svg';
import Gallery from './components/Gallery';
import Portfolio from './components/Portfolio';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import Footer from './components/Footer';
import VirtualTour from './components/VirtualTour';
import Loader from './components/Loader';
import CanvasBackground from './components/CanvasBackground';

// Hero slideshow images (NOT heropg.png — that's now the loader BG)
import apartment from './assets/apartment.png';
import bathroom from './assets/bathroom.png';
import villa from './assets/villa.png';
import travertine from './assets/travertine.png';
import concrete from './assets/concrete.png';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { src: apartment, alt: 'Apartamento de luxo com piso em mármore' },
  { src: bathroom, alt: 'Banheiro premium revestido em pedra natural' },
  { src: villa, alt: 'Villa moderna com acabamento em concreto polido' },
  { src: travertine, alt: 'Sala elegante com piso em travertino' },
  { src: concrete, alt: 'Fachada contemporânea em concreto aparente' },
];

function App() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const slideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Advance slide
  const advanceSlide = (current: number) => {
    setPrevSlide(current);
    setCurrentSlide((current + 1) % heroSlides.length);
  };

  // Auto-advance slideshow
  useEffect(() => {
    if (!loaded) return;
    slideTimeout.current = setTimeout(() => {
      advanceSlide(currentSlide);
    }, 4500);
    return () => clearTimeout(slideTimeout.current);
  }, [loaded, currentSlide]);

  // GSAP + Lenis setup after loader
  useEffect(() => {
    if (!loaded) return;

    // Smooth scroll
    const lenis = new Lenis({ lerp: 0.08 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Hero text entrance
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.45 });
      gsap.fromTo('.hero-btn', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.65 });
      gsap.fromTo('.hero-indicators', { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.9 });

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>('.stat-item').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [loaded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loader — uses heropg as bg */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <CanvasBackground />

      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease 0.1s' }}>
        {/* ── NAVIGATION ── */}
        <nav className="nav-main">
          <div className="nav-logo" onClick={() => scrollToSection('hero')} style={{ cursor: 'pointer' }}>
            <img src={logoPisos} alt="Boa Vista Pisos" className="nav-logo-img" />
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('showroom')} className="nav-link">GALERIA</button>
            <button onClick={() => scrollToSection('portfolio')} className="nav-link">PROJETOS</button>
            <button onClick={() => navigate('/produtos')} className="nav-link">PRODUTOS</button>
            <button onClick={() => scrollToSection('contato')} className="nav-link cta glass-card">CONTATO</button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="hero" ref={heroRef} className="hero">
          {/* Auto-sliding background */}
          <div className="hero-slideshow">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`hero-slide ${idx === currentSlide ? 'hero-slide--active' : ''} ${idx === prevSlide ? 'hero-slide--prev' : ''}`}
                aria-hidden={idx !== currentSlide}
              >
                <img src={slide.src} alt={slide.alt} className="hero-slide-img" />
              </div>
            ))}

            {/* Slide progress indicators */}
            <div className="hero-slide-dots">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`hero-slide-dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => {
                    clearTimeout(slideTimeout.current);
                    setPrevSlide(currentSlide);
                    setCurrentSlide(idx);
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="hero-overlay-gradient" />
          <div className="hero-overlay-bottom" />

          {/* Content */}
          <div className="container hero-content">
            <h1 className="hero-title">
              <span className="block orange-text">TRANSFORME</span>
              <span className="block italic">SEU ESPAÇO</span>
            </h1>
            <p className="hero-subtitle">
              Curadoria premium de pisos e revestimentos em Boa Vista. Do minimalismo ao luxo, elevamos o padrão do seu ambiente.
            </p>
            <div className="hero-btn glass-card" onClick={() => scrollToSection('showroom')}>
              VER COLEÇÃO <ArrowRight size={24} />
            </div>
          </div>

          {/* Bottom indicators */}
          <div className="hero-indicators">
            <div className="hero-indicator-item">BOA VISTA / RR<span className="hero-indicator-dot" /></div>
            <div className="hero-indicator-item">EXCLUSIVIDADE<span className="hero-indicator-dot" /></div>
            <div className="hero-indicator-item">DESIGN</div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {[
                { value: '500+', label: 'Projetos Realizados' },
                { value: '12', label: 'Anos de Experiência' },
                { value: '98%', label: 'Clientes Satisfeitos' },
                { value: '40+', label: 'Marcas Exclusivas' },
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Gallery />
        <VirtualTour />
        <Process />
        <Portfolio />

        {/* ── PRODUTOS CTA ── */}
        <section className="products-cta-section section-padding">
          <div className="container">
            <div className="products-cta-card glass-card">
              <div className="products-cta-bg-glow" />
              <div className="products-cta-content">
                <p className="products-cta-eyebrow">COLEÇÃO 2026</p>
                <h2 className="section-title">
                  Nossa Coleção<br />
                  <span className="orange-text">Exclusiva</span>
                </h2>
                <p className="products-cta-desc">
                  Mais de 40 produtos selecionados das melhores pedreiras e manufaturas do mundo. Do mármore ao vinílico de alto desempenho.
                </p>
                <button onClick={() => navigate('/produtos')} className="products-cta-btn">
                  Ver Todos os Produtos <ArrowRight size={20} />
                </button>
              </div>
              <div className="products-cta-preview">
                <div className="products-mini-grid">
                  {[
                    "https://images.unsplash.com/photo-1581850518616-bcb8188c4436?q=80&w=400",
                    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=400",
                    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400",
                    "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=400",
                  ].map((src, i) => (
                    <div key={i} className="products-mini-img">
                      <img src={src} alt="Produto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* ── CONTACT ── */}
        <section id="contato" className="section-padding">
          <div className="container">
            <div className="glass-card contact-card">
              <div className="contact-glow" />
              <div className="contact-content">
                <h2 className="contact-eyebrow">CONTATO</h2>
                <h3 className="contact-title">
                  Pronto para elevar<br />seu ambiente?
                </h3>
                <p className="contact-desc">
                  Junte-se ao seleto grupo de arquitetos e proprietários que confiam na Boa Vista Pisos para seus projetos mais ambiciosos.
                </p>

                <div className="contact-grid">
                  <div className="contact-methods-list">
                    <a href="mailto:contato@boavistapisos.com.br" className="contact-method-item">
                      <div className="contact-method-icon"><Mail size={22} /></div>
                      <div className="contact-method-details">
                        <span className="contact-method-label">Envie um e-mail</span>
                        <strong className="contact-method-value">contato@boavistapisos.com.br</strong>
                      </div>
                    </a>
                    <a href="tel:+5595999999999" className="contact-method-item">
                      <div className="contact-method-icon"><Phone size={22} /></div>
                      <div className="contact-method-details">
                        <span className="contact-method-label">Ligue para nós</span>
                        <strong className="contact-method-value">(95) 99999-9999</strong>
                      </div>
                    </a>
                  </div>

                  <div className="contact-social-block">
                    <p className="contact-social-label">SIGA NOSSA JORNADA</p>
                    <div className="contact-socials">
                      <a href="#" className="contact-social-btn"><Instagram size={20} /></a>
                      <a href="#" className="contact-social-btn"><Facebook size={20} /></a>
                      <a href="#" className="contact-social-btn"><MessageSquare size={20} /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default App;
