import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoImg from '../assets/images/logo.png';
import MagneticButton from './MagneticButton';
import InteractiveHoverButton from './InteractiveHoverButton';
import './Navbar.css';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

const Navbar = ({ onCartClick, cartCount }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (logoRef.current) {
        tl.from(logoRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (linksRef.current) {
        tl.from(
          linksRef.current.children,
          {
            y: -15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current,
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'Stories', href: '#stories' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      id="navbar"
    >
      <div className="navbar__inner container">
        <a href="#home" className="navbar__logo" ref={logoRef}>
          <img src={logoImg} alt="Veloura Logo" className="navbar__logo-img" />
        </a>

        <nav
          ref={linksRef}
          className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`}
        >
          {navLinks.map((link) => (
            <MagneticButton
              key={link.label}
              href={link.href}
              className="navbar__link-wrap"
              strength={0.25}
            >
              <span className="navbar__link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </span>
            </MagneticButton>
          ))}
          <InteractiveHoverButton
            href="#shop"
            className="navbar__cta navbar__cta--mobile"
            text="Shop Now"
          />
        </nav>

        <div ref={ctaRef} className="navbar__right-actions">
          <button className="navbar__cart-btn navbar__cart-btn--desktop" onClick={onCartClick} aria-label="Open cart">
            <span className="navbar__cart-icon">🛒</span>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          
          <InteractiveHoverButton
            href="#shop"
            className="navbar__cta navbar__cta--desktop"
            text="Shop Now"
          />
        </div>

        <div className="navbar__mobile-triggers">
          <button className="navbar__cart-btn navbar__cart-btn--mobile" onClick={onCartClick} aria-label="Open cart">
            <span className="navbar__cart-icon">🛒</span>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          
          <button
            className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
