import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BenefitsSection.css';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  id: number;
  value: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    value: '100%',
    label: 'Natural Soy Wax',
    description: 'Clean, non-toxic burn derived entirely from natural, renewable soybeans.',
    icon: '🌿',
    color: '#8A817C', // Warm Grey
  },
  {
    id: 2,
    value: 'Pure',
    label: 'Essential Oils',
    description: 'Therapeutic-grade essential oils blended by master perfumers for deep aroma.',
    icon: '💧',
    color: '#630102', // Maroon
  },
  {
    id: 3,
    value: 'Zero',
    label: 'Paraffin & Toxins',
    description: 'No synthetic dyes, parabens, or phthalates. Just pure, clean air.',
    icon: '🚫',
    color: '#A85858', // Dusty Rose Red
  },
  {
    id: 4,
    value: '60h+',
    label: 'Extended Burn',
    description: 'Slow, low-temperature burns that outlast standard paraffin candles by 50%.',
    icon: '⏳',
    color: '#810100', // Cherry Red
  },
];

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.benefits__label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });

      gsap.from('.benefits__title', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });

      // Cards staggered entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.benefits__card-icon');
    const bar = card.querySelector('.benefits__card-bar');

    gsap.to(card, {
      y: -8,
      boxShadow: `0 20px 40px rgba(27, 23, 22, 0.4), 0 0 30px ${color}22`,
      borderColor: `${color}44`,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1.15,
        backgroundColor: `${color}25`,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (bar) {
      gsap.to(bar, {
        height: '6px',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.benefits__card-icon');
    const bar = card.querySelector('.benefits__card-bar');

    gsap.to(card, {
      y: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.05)',
      duration: 0.5,
      ease: 'power2.out',
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    if (bar) {
      gsap.to(bar, {
        height: '3px',
        opacity: 0.7,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section className="benefits" ref={sectionRef}>
      <div className="benefits__inner container">
        <div className="benefits__header">
          <span className="benefits__label">What's Inside</span>
          <h2 className="benefits__title">Formula & Benefits</h2>
        </div>

        <div className="benefits__grid">
          {benefits.map((b, index) => (
            <div
              key={b.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="benefits__card"
              onMouseEnter={(e) => handleCardMouseEnter(e, b.color)}
              onMouseLeave={handleCardMouseLeave}
            >
              <div 
                className="benefits__card-icon"
                style={{ color: b.color, boxShadow: `0 0 12px ${b.color}15` }}
              >
                <span>{b.icon}</span>
              </div>
              <div className="benefits__card-content">
                <span className="benefits__card-value" style={{ color: b.color }}>
                  {b.value}
                </span>
                <h3 className="benefits__card-label">{b.label}</h3>
                <p className="benefits__card-desc">{b.description}</p>
              </div>
              <div 
                className="benefits__card-bar"
                style={{ background: b.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
