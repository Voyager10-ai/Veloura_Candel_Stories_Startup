import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import './Navbar.css';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

const Navbar = ({ onCartClick, cartCount }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

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
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }

      if (ctaRef.current) {
        tl.from(
          ctaRef.current.children,
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
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

  const handleWishlistClick = () => {
    setWishlistCount(prev => prev + 1);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignInOpen(false);
    alert('Logged in successfully!');
  };

  return (
    <>
      <header
        ref={navRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isSearchOpen ? 'navbar--search-active' : ''}`}
        id="navbar"
      >
        <div className="navbar__inner container">
          {/* Logo on the left */}
          <a href="#home" className="navbar__logo" ref={logoRef}>
            <span className="navbar__logo-flame">🕯️</span>
            <span className="navbar__logo-text">Veloura</span>
          </a>

          {/* Navigation links centered */}
          <nav
            ref={linksRef}
            className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`}
          >
            {/* HOME */}
            <MagneticButton href="#home" className="navbar__link-wrap" strength={0.2}>
              <span className="navbar__link" onClick={() => setMobileOpen(false)}>HOME</span>
            </MagneticButton>

            {/* SHOP */}
            <MagneticButton href="#shop" className="navbar__link-wrap" strength={0.2}>
              <span className="navbar__link" onClick={() => setMobileOpen(false)}>SHOP</span>
            </MagneticButton>

            {/* POLICIES DROPDOWN */}
            <div className="navbar__link-wrap navbar__dropdown">
              <span className="navbar__link">
                POLICIES <span className="navbar__arrow">▾</span>
              </span>
              <div className="navbar__dropdown-menu">
                <a href="#shop" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Shipping Policy</a>
                <a href="#shop" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Refund Policy</a>
                <a href="#shop" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Privacy Policy</a>
                <a href="#shop" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Terms of Service</a>
              </div>
            </div>

            {/* SOCIALS DROPDOWN */}
            <div className="navbar__link-wrap navbar__dropdown">
              <span className="navbar__link">
                SOCIALS <span className="navbar__arrow">▾</span>
              </span>
              <div className="navbar__dropdown-menu">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Facebook</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="navbar__dropdown-item" onClick={() => setMobileOpen(false)}>Pinterest</a>
              </div>
            </div>

            {/* ORDERS & PREFERENCES */}
            <MagneticButton href="#shop" className="navbar__link-wrap" strength={0.2}>
              <span className="navbar__link" onClick={() => setMobileOpen(false)}>ORDERS & PREFERENCES</span>
            </MagneticButton>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div ref={ctaRef} className="navbar__right-actions">
            {/* Search Icon */}
            <button 
              className="navbar__icon-btn" 
              onClick={() => setIsSearchOpen(true)} 
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

            {/* Heart / Wishlist Icon */}
            <button 
              className="navbar__icon-btn" 
              onClick={handleWishlistClick} 
              aria-label="Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              {wishlistCount > 0 && <span className="navbar__wishlist-badge">{wishlistCount}</span>}
            </button>

            {/* Cart Icon */}
            <button className="navbar__icon-btn navbar__cart-btn" onClick={onCartClick} aria-label="Open cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </button>
            
            {/* Sign In (Pill button) */}
            <button 
              className="navbar__btn navbar__btn--signin" 
              onClick={() => setIsSignInOpen(true)}
            >
              Sign in
            </button>

            {/* Contact (Rectangular button) */}
            <a 
              href="#contact" 
              className="navbar__btn navbar__btn--contact"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="navbar__mobile-triggers">
            <button className="navbar__icon-btn" onClick={onCartClick} aria-label="Open cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
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

        {/* Sliding search overlay */}
        {isSearchOpen && (
          <div className="navbar__search-overlay">
            <div className="navbar__search-inner container">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__search-icon-lens"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                type="text" 
                placeholder="Search scents, collection, candles..." 
                className="navbar__search-input"
                autoFocus
              />
              <button 
                className="navbar__search-close" 
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Glassmorphic Sign In Modal */}
      {isSignInOpen && (
        <div className="navbar__modal-backdrop" onClick={() => setIsSignInOpen(false)}>
          <div className="navbar__modal" onClick={(e) => e.stopPropagation()}>
            <button className="navbar__modal-close" onClick={() => setIsSignInOpen(false)}>✕</button>
            <h3 className="navbar__modal-title">Welcome Back</h3>
            <p className="navbar__modal-subtitle">Sign in to manage orders and preferences.</p>
            <form onSubmit={handleSignInSubmit} className="navbar__modal-form">
              <div className="navbar__modal-field">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required />
              </div>
              <div className="navbar__modal-field">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="navbar__modal-submit">Sign In</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
