import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, MapPin, Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import logoPisos from '../assets/logopisos.svg';

const Footer: React.FC = () => {
  const navigate = useNavigate();



  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-main">
      {/* Marquee line */}
      <div className="footer-marquee-wrap">
        <div className="footer-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="footer-marquee-item">
              BOA VISTA PISOS &nbsp;·&nbsp; DESIGN DE ALTO PADRÃO &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand footer-reveal">
            <div className="footer-logo-wrap">
              <img src={logoPisos} alt="Boa Vista Pisos" className="footer-logo-img" />
            </div>
            <p className="footer-brand-desc">
              Transformando espaços em ambientes extraordinários através da curadoria de revestimentos de altíssimo padrão em Boa Vista, Roraima.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="footer-social-btn" aria-label="WhatsApp">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="footer-social-btn" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="footer-col footer-reveal">
            <h4 className="footer-col-heading">NAVEGAÇÃO</h4>
            <ul className="footer-col-links">
              <li><button onClick={() => scrollToSection('hero')} className="footer-link-item">Início</button></li>
              <li><button onClick={() => scrollToSection('showroom')} className="footer-link-item">Galeria</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="footer-link-item">Projetos</button></li>
              <li><button onClick={() => navigate('/produtos')} className="footer-link-item">Produtos</button></li>
              <li><button onClick={() => scrollToSection('contato')} className="footer-link-item">Contato</button></li>
            </ul>
          </div>

          {/* Collections */}
          <div className="footer-col footer-reveal">
            <h4 className="footer-col-heading">COLEÇÕES</h4>
            <ul className="footer-col-links">
              <li><span className="footer-link-item">Mármores Luxuosos</span></li>
              <li><span className="footer-link-item">Porcelanatos Premium</span></li>
              <li><span className="footer-link-item">Madeiras Nobres</span></li>
              <li><span className="footer-link-item">Vinílicos de Alta Performance</span></li>
              <li><span className="footer-link-item">Peças Especiais</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col footer-reveal">
            <h4 className="footer-col-heading">BOA VISTA / RR</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>Boa Vista, Roraima<br />Brasil</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <a href="tel:+5595999999999" className="footer-contact-link">(95) 99999-9999</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:contato@boavistapisos.com.br" className="footer-contact-link">contato@boavistapisos.com.br</a>
              </li>
            </ul>

            <a href="#" className="footer-cta-mini">
              Ver Catálogo <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom footer-reveal">
          <p className="footer-copy">© 2026 BOA VISTA PISOS — TODOS OS DIREITOS RESERVADOS</p>
          <div className="footer-bottom-right">
            <a href="#" className="footer-legal-link">Privacidade</a>
            <a href="#" className="footer-legal-link">Termos</a>
            <span className="footer-by">DESENVOLVIDO POR ANTIGRAVITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
