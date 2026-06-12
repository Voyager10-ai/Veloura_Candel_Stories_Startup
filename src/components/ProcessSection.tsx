import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteMenu from './InfiniteMenu';

import sourcingImg from '../assets/images/sourcing.png';
import blendingImg from '../assets/images/blending.png';
import pouringImg from '../assets/images/pouring.png';
import curingImg from '../assets/images/curing.png';

import './ProcessSection.css';

gsap.registerPlugin(ScrollTrigger);

const processItems = [
  {
    image: sourcingImg,
    link: '#contact',
    title: 'Sourcing',
    description: 'We ethically source 100% natural soy wax and therapeutic-grade essential oils.'
  },
  {
    image: blendingImg,
    link: '#contact',
    title: 'Blending',
    description: 'Master perfumers blend heart, base, and top notes for ultimate fragrance depth.'
  },
  {
    image: pouringImg,
    link: '#contact',
    title: 'Pouring',
    description: 'Each candle is hand-poured at the perfect temperature to guarantee an even cure.'
  },
  {
    image: curingImg,
    link: '#contact',
    title: 'Curing',
    description: 'Every candle is cured for 14 days minimum for flawless scent throw.'
  }
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.process__header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Menu container fade + scale entrance
      gsap.from('.process__menu-container', {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__inner container">
        <div className="process__header">
          <span className="section-label">Our Process</span>
          <h2 className="process-title">Handcrafted Luxury</h2>
          <p className="process__subtitle">
            Every candle goes through a meticulous four-step journey from raw ingredients to your home.
          </p>
        </div>

        <div className="process__menu-container">
          <InfiniteMenu items={processItems} scale={0.9} />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
