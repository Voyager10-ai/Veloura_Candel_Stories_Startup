import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NumberTicker from './NumberTicker';
import './TrustSection.css';

gsap.registerPlugin(ScrollTrigger);

const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate stat cards stagger entrance
      gsap.from('.trust__card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="trust" id="trust" ref={sectionRef}>
      <div className="trust__inner container">
        <div className="trust__grid">
          <div className="trust__card">
            <div className="trust__stat">
              <span className="trust__symbol">✨</span>
              <div className="trust__value-container">
                <NumberTicker value={70} decimalPlaces={0} duration={1500} className="trust__value" />
                <span className="trust__suffix">+</span>
              </div>
            </div>
            <h3 className="trust__title">Trusted Return Customers</h3>
            <p className="trust__desc">
              Over 70% of our discerning clientele return for our signature scent experiences.
            </p>
          </div>

          <div className="trust__card">
            <div className="trust__stat">
              <span className="trust__symbol">🌹</span>
              <div className="trust__value-container">
                <NumberTicker value={94} decimalPlaces={0} duration={1500} className="trust__value" />
                <span className="trust__suffix">%</span>
              </div>
            </div>
            <h3 className="trust__title">Scent Satisfaction</h3>
            <p className="trust__desc">
              Highly rated for deep aroma throw and pristine, clean-burning soy wax performance.
            </p>
          </div>

          <div className="trust__card">
            <div className="trust__stat">
              <span className="trust__symbol">🕯️</span>
              <div className="trust__value-container">
                <NumberTicker value={15} decimalPlaces={0} duration={1500} className="trust__value" />
                <span className="trust__suffix">+</span>
              </div>
            </div>
            <h3 className="trust__title">Exclusive Blends</h3>
            <p className="trust__desc">
              A curated catalog of hand-poured custom recipes built for olfactory serenity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
