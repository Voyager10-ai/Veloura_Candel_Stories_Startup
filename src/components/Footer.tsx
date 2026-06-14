import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoImg from '../assets/images/logo.png';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Watermark entrance
      gsap.from('.footer__watermark', {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Links columns stagger
      gsap.from('.footer__column', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Bottom bar fade-in
      gsap.from('.footer__bottom', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        delay: 0.35,
        scrollTrigger: {
          trigger: footer,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" id="footer" ref={footerRef}>
      <div className="footer__inner container">
        
        {/* Large Background Watermark */}
        <div className="footer__watermark">VELOURA</div>

        <div className="footer__grid">
          <div className="footer__column">
            <h4 className="footer__title">Products</h4>
            <ul className="footer__links">
              <li><a href="#shop">All Candles</a></li>
              <li><a href="#shop">Best Sellers</a></li>
              <li><a href="#shop">Gift Sets</a></li>
              <li><a href="#shop">New Releases</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#collaborations">Collaborations</a></li>
              <li><a href="#stories">Stories</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Company</h4>
            <ul className="footer__links">
              <li><a href="#process">About Us</a></li>
              <li><a href="#collaborations">Careers</a></li>
              <li><a href="#collaborations">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__title">Legal</h4>
            <ul className="footer__links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__brand">
            <a href="#home" className="footer__logo">
              <img src={logoImg} alt="Veloura Logo" className="footer__logo-img" />
            </a>
          </div>
          
          <p className="footer__copyright">
            © {currentYear} Veloura. All rights reserved.
          </p>
          
          <span className="footer__made-with">
            crafted with serenity
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
