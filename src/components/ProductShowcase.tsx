import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConfettiButton from './ConfettiButton';
import candleAmber from '../assets/images/candle-amber.png';
import candleSage from '../assets/images/candle-sage.png';
import candleRose from '../assets/images/candle-rose.png';
import './ProductShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export interface Product {
  id: number;
  name: string;
  category: string;
  scent: string;
  description: string;
  price: number;
  image: string;
  color: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Amber & Oud',
    category: 'Woody & Warm',
    scent: 'Sandalwood · Vanilla · Bergamot',
    description: 'A warm, enveloping fragrance that wraps your space in cozy sophistication.',
    price: 1299,
    image: candleAmber,
    color: '#D98E32', // Soft Amber
    tags: ['100% Soy Wax', 'Cozy Vibe', '60 Hour Burn', 'Lead-Free Wick'],
  },
  {
    id: 2,
    name: 'Sage & Sea',
    category: 'Fresh & Coastal',
    scent: 'Eucalyptus · Moss · Sea Salt',
    description: 'Fresh coastal air meets earthy botanicals for a grounding experience.',
    price: 1299,
    image: candleSage,
    color: '#C9A86A', // Antique Gold
    tags: ['Hand-Poured', 'Fresh Blend', 'Vegan', 'Aromatic'],
  },
  {
    id: 3,
    name: 'Rose & Blush',
    category: 'Floral & Romantic',
    scent: 'Peony · Rose Water · Amber',
    description: 'Delicate floral notes dance with soft warmth to create romantic ambiance.',
    price: 1299,
    image: candleRose,
    color: '#E8D3A9', // Champagne Gold
    tags: ['Delicate Scent', 'Therapeutic', 'Natural Oils', 'Blissful'],
  },
];

interface ProductShowcaseProps {
  onAddToCart: (product: Product) => void;
}

const ProductShowcase = ({ onAddToCart }: ProductShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const activeProduct = products[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  // GSAP scroll-triggered entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.products__header', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Slider container animation
      gsap.from('.products__slider-container', {
        y: 60,
        opacity: 0,
        duration: 1,
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

  // GSAP slide transition when activeIndex changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: -60, scale: 0.85, rotate: -6 },
          { opacity: 1, x: 0, scale: 1, rotate: 0, duration: 0.75, ease: 'power4.out' }
        );
      }
      if (infoRef.current) {
        gsap.fromTo(infoRef.current,
          { opacity: 0, x: 45 },
          { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: 0.05 }
        );
      }
    }, sliderRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // Interactive 3D mouse tilt effect on the slider card
  useEffect(() => {
    const card = sliderRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (max 6 degrees for subtle luxury feel)
      const rotateX = -(y - centerY) / centerY * 6;
      const rotateY = (x - centerX) / centerX * 6;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="products" id="scents" ref={sectionRef}>
      <div className="products__inner container">
        <div className="products__header">
          <span className="section-label">Our Scents</span>
          <h2 className="section-title">Find Your Signature Fragrance</h2>
          <p className="products__subtitle">
            Each candle is hand-poured with 100% natural soy wax and infused with premium essential oils.
          </p>
        </div>

        <div className="products__slider-container">
          <button 
            className="products__arrow products__arrow--prev" 
            onClick={handlePrev}
            aria-label="Previous fragrance"
          >
            <span>‹</span>
          </button>

          <div className="products__slider-card" ref={sliderRef}>
            <div className="products__slider-inner">
              <div className="products__image-side">
                <div 
                  className="products__image-glow"
                  style={{
                    background: `radial-gradient(circle, ${activeProduct.color}25 0%, transparent 70%)`
                  }}
                ></div>
                <img 
                  ref={imageRef}
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="products__slider-image"
                />
              </div>

              <div className="products__info-side" ref={infoRef}>
                <span className="products__category" style={{ color: activeProduct.color }}>
                  {activeProduct.category}
                </span>
                <h3 className="products__name">{activeProduct.name}</h3>
                <p className="products__scent-notes">{activeProduct.scent}</p>
                <p className="products__desc">{activeProduct.description}</p>
                
                <div className="products__tags">
                  {activeProduct.tags.map((tag, i) => (
                    <span key={i} className="products__tag">{tag}</span>
                  ))}
                </div>

                <div className="products__buy-action">
                  <span className="products__price">₹{activeProduct.price.toLocaleString('en-IN')}</span>
                  <ConfettiButton 
                    className="products__add-btn" 
                    id={`add-to-cart-${activeProduct.id}`}
                    onClick={() => onAddToCart(activeProduct)}
                    confettiConfig={{
                      particleCount: 150,
                      spread: 80,
                      colors: [
                        '#C9A86A', // Antique Gold
                        '#E8D3A9', // Champagne Gold
                        '#D98E32', // Soft Amber
                        '#F8F4EE', // Warm Ivory
                        '#ffffff'  // Pure White
                      ]
                    }}
                  >
                    Add to Cart
                  </ConfettiButton>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="products__arrow products__arrow--next" 
            onClick={handleNext}
            aria-label="Next fragrance"
          >
            <span>›</span>
          </button>
        </div>

        <div className="products__dots">
          {products.map((_, index) => (
            <button
              key={index}
              className={`products__dot ${index === activeIndex ? 'products__dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
