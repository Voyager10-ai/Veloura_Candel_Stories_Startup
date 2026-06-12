import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Large background heading entrance (one-time)
      gsap.from('.contact__bg-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Glow ignition whenever scrolling down into the section
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          gsap.timeline()
            .to('.contact__bg-title', {
              color: '#810100',
              textShadow: '0 0 30px rgba(129, 1, 0, 0.95), 0 0 60px rgba(99, 1, 2, 0.8), 0 0 100px rgba(129, 1, 0, 0.6)',
              duration: 0.8,
              ease: 'power2.out',
            })
            .to('.contact__bg-title', {
              color: 'rgba(129, 1, 0, 0.25)',
              textShadow: '0 0 0px rgba(129, 1, 0, 0)',
              duration: 1.5,
              ease: 'power2.inOut',
              delay: 1.2,
              clearProps: 'color,textShadow',
            });
        }
      });

      // Form wrapper entrance
      gsap.from('.contact__content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact__inner container">
        <h2 className="contact__bg-title">READY TO GLOW</h2>
        
        <div className="contact__content">
          <form className="contact__form" onSubmit={handleSubmit} id="newsletter-form">
            <div className="contact__form-inner">
              <input
                type="email"
                placeholder="your@email.com"
                className="contact__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="newsletter-email"
              />
              <button
                type="submit"
                className="contact__submit-btn"
                id="newsletter-submit"
              >
                {submitted ? '✓ Subscribed!' : 'Get 15% Off'}
              </button>
            </div>
          </form>

          <p className="contact__subtext">
            Join 50k+ fragrance lovers. No spam, just serenity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
