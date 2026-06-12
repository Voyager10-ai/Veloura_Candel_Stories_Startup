import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConfettiButton from './ConfettiButton';
import candleAmber from '../assets/images/candle-amber.png';
import candleSage from '../assets/images/candle-sage.png';
import candleRose from '../assets/images/candle-rose.png';
import candleJasmine from '../assets/images/candle-jasmine.png';
import candleVanilla from '../assets/images/candle-vanilla.png';
import candleCedar from '../assets/images/candle-cedar.png';
import './ShopSection.css';

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

export const shopProducts: Product[] = [
  {
    id: 1,
    name: 'Amber & Oud',
    category: 'Woody & Warm',
    scent: 'Sandalwood · Vanilla · Bergamot',
    description: 'A warm, enveloping fragrance that wraps your space in cozy sophistication.',
    price: 1299,
    image: candleAmber,
    color: '#D98E32',
    tags: ['Soy Wax', 'Warm Vibe', '60hr Burn'],
  },
  {
    id: 2,
    name: 'Sage & Sea',
    category: 'Fresh & Coastal',
    scent: 'Eucalyptus · Moss · Sea Salt',
    description: 'Fresh coastal air meets earthy botanicals for a grounding experience.',
    price: 1299,
    image: candleSage,
    color: '#C9A86A',
    tags: ['Hand-Poured', 'Earthy', 'Vegan'],
  },
  {
    id: 3,
    name: 'Rose & Blush',
    category: 'Floral & Romantic',
    scent: 'Peony · Rose Water · Amber',
    description: 'Delicate floral notes dance with soft warmth to create romantic ambiance.',
    price: 1299,
    image: candleRose,
    color: '#E8D3A9',
    tags: ['Floral', 'Therapeutic', 'Natural Oils'],
  },
  {
    id: 4,
    name: 'Jasmine Dream',
    category: 'Exotic & Floral',
    scent: 'Night Jasmine · Tuberose · Musk',
    description: 'An alluring floral scent that transports you to a blooming midnight garden.',
    price: 1199,
    image: candleJasmine,
    color: '#B5C2B7',
    tags: ['Delicate Scent', 'Soothing', 'Midnight Bloom'],
  },
  {
    id: 5,
    name: 'Vanilla Noir',
    category: 'Sweet & Sensual',
    scent: 'Dark Vanilla · Amber · Tonka Bean',
    description: 'A rich, seductive take on vanilla, layered with deep balsamic woods.',
    price: 1199,
    image: candleVanilla,
    color: '#A1887F',
    tags: ['Rich Aroma', 'Cosy Blend', 'Sensual'],
  },
  {
    id: 6,
    name: 'Cedarwood Forest',
    category: 'Earthy & Woody',
    scent: 'Cedar · Cypress · Pine Needle',
    description: 'Woodland moss and towering evergreens capture the stillness of mountain air.',
    price: 1199,
    image: candleCedar,
    color: '#8D9B82',
    tags: ['Woodland', 'Deep Peace', 'Cleansing'],
  },
];

interface ShopSectionProps {
  onAddToCart: (product: Product) => void;
}

const ShopSection = ({ onAddToCart }: ShopSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.shop__header', {
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

      // Product cards staggering in
      gsap.from('.shop__card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.shop__grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card mouse move tilt logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = -(y - centerY) / centerY * 5;
    const rotateY = (x - centerX) / centerX * 5;

    gsap.to(cardElement, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (cardElement: HTMLDivElement) => {
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  return (
    <section className="shop" id="shop" ref={sectionRef}>
      <div className="shop__inner container">
        <div className="shop__header">
          <span className="section-label">Luxury Collection</span>
          <h2 className="section-title">Explore Our Candles</h2>
          <p className="shop__subtitle">
            Curate your space with our full sensory suite. Handcrafted with sustainably sourced ingredients and signature scents.
          </p>
        </div>

        <div className="shop__grid">
          {shopProducts.map((product) => {
            let cardRef: HTMLDivElement | null = null;
            return (
              <div 
                key={product.id} 
                className="shop__card"
                ref={(el) => { cardRef = el; }}
                onMouseMove={(e) => cardRef && handleMouseMove(e, cardRef)}
                onMouseLeave={() => cardRef && handleMouseLeave(cardRef)}
              >
                <div className="shop__card-glass">
                  <div className="shop__image-wrapper">
                    <div 
                      className="shop__image-glow"
                      style={{
                        background: `radial-gradient(circle, ${product.color}15 0%, transparent 70%)`
                      }}
                    />
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="shop__image" 
                    />
                    <div className="shop__category-tag" style={{ borderLeft: `2px solid ${product.color}` }}>
                      {product.category}
                    </div>
                  </div>

                  <div className="shop__content">
                    <h3 className="shop__name">{product.name}</h3>
                    <p className="shop__notes">{product.scent}</p>
                    <p className="shop__description">{product.description}</p>
                    
                    <div className="shop__tags">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="shop__tag">{tag}</span>
                      ))}
                    </div>

                    <div className="shop__action">
                      <span className="shop__price">₹{product.price.toLocaleString('en-IN')}</span>
                      <ConfettiButton 
                        className="shop__add-btn"
                        id={`shop-add-btn-${product.id}`}
                        onClick={() => onAddToCart(product)}
                        confettiConfig={{
                          particleCount: 120,
                          spread: 60,
                          colors: [product.color, '#C9A86A', '#E8D3A9', '#ffffff']
                        }}
                      >
                        Add to Cart
                      </ConfettiButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
