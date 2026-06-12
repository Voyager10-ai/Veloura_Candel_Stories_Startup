import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoLoop, { type LogoItem } from './LogoLoop';
import './InstagramFeed.css';

gsap.registerPlugin(ScrollTrigger);

interface InstagramPost {
  id: number;
  imageUrl: string;
  likes: string;
  comments: string;
}

const posts: InstagramPost[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
    likes: '1.2k',
    comments: '48',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
    likes: '942',
    comments: '32',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?q=80&w=600&auto=format&fit=crop',
    likes: '1.8k',
    comments: '56',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop',
    likes: '1.4k',
    comments: '64',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop',
    likes: '2.1k',
    comments: '88',
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=600&auto=format&fit=crop',
    likes: '1.6k',
    comments: '50',
  },
];

const socialLogos: LogoItem[] = [
  {
    node: (
      <div className="social-icon-wrapper">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
        <span className="social-name">INSTAGRAM</span>
      </div>
    ),
    href: 'https://www.instagram.com/veloura__candle_stories?igsh=MWtxbngzemdqZnlnMA==',
    ariaLabel: 'Instagram'
  },
  {
    node: (
      <div className="social-icon-wrapper">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
        <span className="social-name">FACEBOOK</span>
      </div>
    ),
    href: 'https://facebook.com/',
    ariaLabel: 'Facebook'
  },
  {
    node: (
      <div className="social-icon-wrapper">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-svg">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span className="social-name">WHATSAPP</span>
      </div>
    ),
    href: 'https://wa.me/919607643703?text=Hi!%20I\'d%20like%20to%20order%20some%20Veloura%20luxury%20candles.',
    ariaLabel: 'WhatsApp'
  }
];

const InstagramFeed = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.instagram__header', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Posts stagger
      gsap.from('.instagram__post', {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Button entrance
      gsap.from('.instagram__btn-wrap', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="instagram" ref={sectionRef}>
      <div className="instagram__inner container">
        <div className="instagram__header">
          <span className="section-label">FOLLOW THE SERENITY</span>
        </div>

        <div className="instagram__grid">
          {posts.map((post) => (
            <div key={post.id} className="instagram__post">
              <img 
                src={post.imageUrl} 
                alt="Veloura aesthetic luxury candle post" 
                className="instagram__image" 
              />
              <div className="instagram__overlay">
                <span className="instagram__overlay-item">
                  <span className="instagram__overlay-icon">❤️</span> {post.likes}
                </span>
                <span className="instagram__overlay-item">
                  <span className="instagram__overlay-icon">💬</span> {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="instagram__btn-wrap instagram__press-loop">
          <span className="press-loop-label">CONNECT WITH US</span>
          <LogoLoop 
            logos={socialLogos}
            speed={35}
            direction="left"
            logoHeight={36}
            gap={96}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="var(--color-deep-bluish)"
            scaleOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
