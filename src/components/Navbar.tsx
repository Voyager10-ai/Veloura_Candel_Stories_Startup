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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Scroll to shop section and could filter products
      const shopSection = document.getElementById('shop');
      if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'Stories', href: '#stories' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
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

            {/* Sign In link in mobile menu */}
            <a href="#" className="navbar__signin navbar__signin--mobile" onClick={() => setMobileOpen(false)}>
              <svg className="navbar__signin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Sign In</span>
            </a>
          </nav>

          <div ref={ctaRef} className="navbar__right-actions">
            {/* Search Button */}
            <button
              className="navbar__icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              id="search-toggle"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__icon-svg">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Sign In Button */}
            <a href="#" className="navbar__signin navbar__signin--desktop">
              <svg className="navbar__signin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="navbar__signin-text">Sign In</span>
            </a>

            {/* Cart Button */}
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
            {/* Mobile Search */}
            <button
              className="navbar__icon-btn navbar__icon-btn--mobile"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__icon-svg">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

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

      {/* Search Overlay */}
      <div className={`search-overlay ${searchOpen ? 'search-overlay--open' : ''}`}>
        <div className="search-overlay__backdrop" onClick={() => setSearchOpen(false)} />
        <div className="search-overlay__content">
          <button className="search-overlay__close" onClick={() => setSearchOpen(false)} aria-label="Close search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <form className="search-overlay__form" onSubmit={handleSearchSubmit}>
            <svg className="search-overlay__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="search-overlay__input"
              placeholder="Search candles, collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <p className="search-overlay__hint">Press <kbd>Esc</kbd> to close</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
