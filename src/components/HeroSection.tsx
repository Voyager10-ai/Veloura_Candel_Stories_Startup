import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import ScrollFloat from './ScrollFloat';
import heroCandle from '../assets/images/hero-candle.png';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.6 });

      // Badge
      tl.from('.hero__badge', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Title words
      tl.from(
        '.hero__title-line',
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Subtitle
      tl.from(
        '.hero__subtitle',
        {
          y: 25,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // CTA buttons
      tl.from(
        '.hero__actions .magnetic-btn',
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Feature pills
      tl.from(
        '.hero__feature',
        {
          y: 15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      // Product image
      tl.from(
        image,
        {
          x: 80,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
        },
        0.8
      );

      // Glow pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Note: ScrollFloat handles scroll animations for hero title lines
      // Image parallax on scroll
      gsap.to(image, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Content fade on scroll
      gsap.to(content, {
        y: -30,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Scroll indicator
      tl.from(
        '.hero__scroll-indicator',
        {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={sectionRef}>
      {/* Abstract Bauhaus/Mid-Century Geometric Shapes */}
      <div className="hero__bg-shapes">
        {/* Top Left Concentric Arch */}
        <svg className="hero__shape hero__shape--arch-top-left" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 110 V50 A40 40 0 0 1 90 50 V110" stroke="var(--color-moderate-green)" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
          <path d="M30 110 V50 A20 20 0 0 1 70 50 V110" stroke="var(--color-moderate-green)" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
          <path d="M50 110 V55 A5 5 0 0 1 50 50 V110" stroke="var(--color-moderate-green)" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
        </svg>

        {/* Top Mid Bowtie (Hourglass) */}
        <svg className="hero__shape hero__shape--bowtie-top" viewBox="0 0 80 80" fill="var(--color-moderate-green)" opacity="0.15" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 L70 10 L40 40 L70 70 L10 70 L40 40 Z" />
        </svg>

        {/* Top Right Dot Grid */}
        <svg className="hero__shape hero__shape--dots-right" viewBox="0 0 100 100" fill="var(--color-laurel-green)" opacity="0.25" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="3" />
          <circle cx="35" cy="10" r="3" />
          <circle cx="60" cy="10" r="3" />
          <circle cx="85" cy="10" r="3" />
          <circle cx="10" cy="35" r="3" />
          <circle cx="35" cy="35" r="3" />
          <circle cx="60" cy="35" r="3" />
          <circle cx="85" cy="35" r="3" />
          <circle cx="10" cy="60" r="3" />
          <circle cx="35" cy="60" r="3" />
          <circle cx="60" cy="60" r="3" />
          <circle cx="85" cy="60" r="3" />
          <circle cx="10" cy="85" r="3" />
          <circle cx="35" cy="85" r="3" />
          <circle cx="60" cy="85" r="3" />
          <circle cx="85" cy="85" r="3" />
        </svg>

        {/* Middle Right Circle Donut */}
        <div className="hero__shape hero__shape--donut-right"></div>

        {/* Middle Right Double-D Semicircles */}
        <div className="hero__shape hero__shape--double-d">
          <span></span>
          <span></span>
        </div>

        {/* Bottom Left Concentric U */}
        <svg className="hero__shape hero__shape--u-bottom-left" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 A40 40 0 0 0 90 10" stroke="var(--color-laurel-green)" strokeWidth="4" strokeLinecap="round" opacity="0.2"/>
          <path d="M25 10 A25 25 0 0 0 75 10" stroke="var(--color-laurel-green)" strokeWidth="4" strokeLinecap="round" opacity="0.2"/>
          <path d="M40 10 A10 10 0 0 0 60 10" stroke="var(--color-laurel-green)" strokeWidth="4" strokeLinecap="round" opacity="0.2"/>
        </svg>

        {/* Bottom Mid Hourglass */}
        <svg className="hero__shape hero__shape--hourglass-bottom" viewBox="0 0 80 80" fill="var(--color-laurel-green)" opacity="0.15" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 Q40 40 10 70 L70 70 Q40 40 70 10 Z" />
        </svg>

        {/* Bottom Mid Semicircle */}
        <div className="hero__shape hero__shape--semicircle-bottom"></div>

        {/* Bottom Right Wave */}
        <svg className="hero__shape hero__shape--wave-right" viewBox="0 0 40 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0 Q40 20 20 40 T20 80 T20 120 T20 160" stroke="var(--color-moderate-green)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>
        </svg>
      </div>

      <div className="hero__inner container">
        {/* Left Side: Text Content wrapped in a Glassmorphism Card */}
        <div className="hero__content" ref={contentRef}>
          <div className="hero__content-card">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              HANDCRAFTED LUXURY CANDLES
            </div>

            <h1 className="hero__title">
              <ScrollFloat
                as="span"
                containerClassName="hero__title-line"
                animationType="out"
                scrollStart="top top"
                scrollEnd="60% top"
                ease="power1.inOut"
                stagger={0.03}
              >
                Truly Unique
              </ScrollFloat>
              <ScrollFloat
                as="span"
                containerClassName="hero__title-line hero__title-accent"
                animationType="out"
                scrollStart="top top"
                scrollEnd="60% top"
                ease="power1.inOut"
                stagger={0.03}
              >
                Home Fragrances
              </ScrollFloat>
            </h1>

            <p className="hero__subtitle">
              Using a blend of coconut and rapeseed wax, free from paraffin, soy, colourants or additional additives.
            </p>

            <div className="hero__actions">
              <MagneticButton
                href="#shop"
                className="hero__btn hero__btn--primary"
                strength={0.3}
              >
                Buy Now
                <span className="hero__btn-arrow">→</span>
              </MagneticButton>
              <MagneticButton
                href="#process"
                className="hero__btn hero__btn--secondary"
                strength={0.3}
              >
                Our Process
              </MagneticButton>
            </div>

            <div className="hero__features">
              <div className="hero__feature">
                <span className="hero__feature-dot"></span>
                Natural Wax
              </div>
              <div className="hero__feature">
                <span className="hero__feature-dot"></span>
                Hand-Poured
              </div>
              <div className="hero__feature">
                <span className="hero__feature-dot"></span>
                Toxin Free
              </div>
              <div className="hero__feature">
                <span className="hero__feature-dot"></span>
                60+ Hour Burn
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Capsule-masked Candle Image with Glow & Glass Frame */}
        <div className="hero__image-container">
          <div className="hero__image-wrapper" ref={imageRef}>
            <div className="hero__image-glow" ref={glowRef}></div>
            <div className="hero__capsule-frame">
              <img
                src={heroCandle}
                alt="Veloura luxury candle in frosted glass jar"
                className="hero__capsule-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;
