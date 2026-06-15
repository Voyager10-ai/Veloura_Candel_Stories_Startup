import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConfettiButton from './ConfettiButton';

// Import all product and category image assets
import candleAmber from '../assets/images/candle-amber.png';
import candleSage from '../assets/images/candle-sage.png';
import candleRose from '../assets/images/candle-rose.png';
import candleJasmine from '../assets/images/candle-jasmine.png';
import candleVanilla from '../assets/images/candle-vanilla.png';
import candleCedar from '../assets/images/candle-cedar.png';
import saffron from '../assets/images/saffron.png';
import lavender from '../assets/images/lavender.png';
import lemongrass from '../assets/images/lemongrass.png';
import catTaper from '../assets/images/cat-taper.png';
import catDecorative from '../assets/images/cat-decorative.png';
import catDessert from '../assets/images/cat-dessert.png';
import catColour from '../assets/images/cat-colour.png';
import blending from '../assets/images/blending.png';
import pouring from '../assets/images/pouring.png';
import curing from '../assets/images/curing.png';
import sourcing from '../assets/images/sourcing.png';
import heroCandle from '../assets/images/hero-candle.png';

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
  // Category 1: Premium Candles
  {
    id: 1,
    name: 'Amber & Oud',
    category: 'Premium Candles',
    scent: 'Sandalwood · Vanilla · Bergamot',
    description: 'A warm, enveloping fragrance that wraps your space in cozy sophistication.',
    price: 1299,
    image: candleAmber,
    color: '#D98E32',
    tags: ['Soy Wax', 'Warm Vibe', '60hr Burn'],
  },
  {
    id: 102,
    name: 'Royal Saffron Glow',
    category: 'Premium Candles',
    scent: 'Kashmir Saffron · Rose · Patchouli',
    description: 'An exotic scent celebrating rare spices, hand-poured in a dark crimson glass jar.',
    price: 1499,
    image: saffron,
    color: '#D98E32',
    tags: ['Exotic Blend', 'Crimson Jar', 'Rich Throw'],
  },
  {
    id: 103,
    name: 'Golden Sunflower Blend',
    category: 'Premium Candles',
    scent: 'Sunflower Nectar · Honey · Vetiver',
    description: 'A bright, uplifting floral scent decorated with pressed organic sunflower petals.',
    price: 1399,
    image: sourcing,
    color: '#D98E32',
    tags: ['Botanical Decor', 'Floral Scent', 'Soothe'],
  },

  // Category 2: Taper Candles
  {
    id: 2,
    name: 'Sage & Sea Tapers',
    category: 'Taper Candles',
    scent: 'Soft Sage · Eucalyptus · Moss',
    description: 'Fresh coastal air meets earthy botanicals for a grounding experience.',
    price: 349,
    image: candleSage,
    color: '#C9A86A',
    tags: ['Ribbed Texturing', 'Sage Green', 'Scented'],
  },
  {
    id: 202,
    name: 'Spiraled Honeycomb Tapers',
    category: 'Taper Candles',
    scent: 'Unscented (Pure Beeswax Aroma)',
    description: 'Textured taper candles with spiral geometric lines, burning dripless and clean.',
    price: 299,
    image: catTaper,
    color: '#C9A86A',
    tags: ['Organic Tones', 'Dripless', 'Pair of 2'],
  },
  {
    id: 203,
    name: 'Terracotta Classic Tapers',
    category: 'Taper Candles',
    scent: 'Unscented',
    description: 'Warm earth-toned taper candles, hand-dipped and designed for elegant table layouts.',
    price: 299,
    image: curing,
    color: '#C9A86A',
    tags: ['Terracotta Color', 'Hand-Dipped', 'Elegant'],
  },

  // Category 3: Decorative Candles
  {
    id: 3,
    name: 'Rose & Blush',
    category: 'Decorative Candles',
    scent: 'Peony · Rose Water · Amber',
    description: 'Delicate floral notes dance with soft warmth to create romantic ambiance.',
    price: 1299,
    image: candleRose,
    color: '#E8D3A9',
    tags: ['Floral', 'Therapeutic', 'Natural Oils'],
  },
  {
    id: 302,
    name: 'Pastel Bubble Cube',
    category: 'Decorative Candles',
    scent: 'Cotton Candy · Lavender',
    description: 'The iconic aesthetic bubble cube candle, perfect as a home decor focal point.',
    price: 399,
    image: catDecorative,
    color: '#E8D3A9',
    tags: ['Aesthetic Decor', 'Pastel Shades', 'Bubble Mold'],
  },
  {
    id: 303,
    name: 'Venus Bust Art Candle',
    category: 'Decorative Candles',
    scent: 'Sandalwood · Musk',
    description: 'A sculptural classical bust candle, hand-poured in marble-finish soy wax.',
    price: 499,
    image: pouring,
    color: '#E8D3A9',
    tags: ['Sculptural Art', 'Marble Finish', 'Collector Item'],
  },

  // Category 4: Dessert Candles
  {
    id: 4,
    name: 'Jasmine Dream',
    category: 'Dessert Candles',
    scent: 'Night Jasmine · Tuberose · Musk',
    description: 'An alluring floral scent that transports you to a blooming midnight garden.',
    price: 1199,
    image: candleJasmine,
    color: '#B5C2B7',
    tags: ['Delicate Scent', 'Soothing', 'Midnight Bloom'],
  },
  {
    id: 402,
    name: 'Strawberry Cream Bowl',
    category: 'Dessert Candles',
    scent: 'Fresh Strawberry · Sweet Vanilla Cream',
    description: 'A realistic glass bowl candle topped with whipped soy cream and strawberry wax embeds.',
    price: 599,
    image: catDessert,
    color: '#D98E32',
    tags: ['Whipped Cream Wax', 'Strawberry Scent', 'Gourmet'],
  },
  {
    id: 403,
    name: 'Chocolate Fudge Sundae',
    category: 'Dessert Candles',
    scent: 'Dark Chocolate · Fudge · Caramel',
    description: 'A decadent treat candle featuring layers of fudge wax, whipped cream, and a wax cherry.',
    price: 549,
    image: blending,
    color: '#D98E32',
    tags: ['Decadent Cocoa', 'Sundae Mold', 'Sweet Delights'],
  },

  // Category 5: Wax Melts & Sachets
  {
    id: 5,
    name: 'Vanilla Noir',
    category: 'Wax Melts & Sachets',
    scent: 'Dark Vanilla · Amber · Tonka Bean',
    description: 'A rich, seductive take on vanilla, layered with deep balsamic woods.',
    price: 1199,
    image: candleVanilla,
    color: '#A1887F',
    tags: ['Rich Aroma', 'Cosy Blend', 'Sensual'],
  },
  {
    id: 502,
    name: 'Lavender Botanical Sachet',
    category: 'Wax Melts & Sachets',
    scent: 'French Lavender · Rosemary',
    description: 'A beautiful botanical soy wax sachet decorated with lavender buds to freshen up closets.',
    price: 199,
    image: lavender,
    color: '#C9A86A',
    tags: ['Botanical Decor', 'Closet Freshener', 'Aromatherapy'],
  },
  {
    id: 503,
    name: 'Lemongrass Healing Melts',
    category: 'Wax Melts & Sachets',
    scent: 'Lemongrass · Eucalyptus',
    description: 'Refreshing and insect-repelling melts, ideal for focus and clean air vibes.',
    price: 199,
    image: lemongrass,
    color: '#C9A86A',
    tags: ['Focus & Cleanse', 'Lemongrass Oils', 'Soothing'],
  },

  // Category 6: Colour Candles
  {
    id: 6,
    name: 'Cedarwood Forest',
    category: 'Colour Candles',
    scent: 'Cedar · Cypress · Pine Needle',
    description: 'Woodland moss and towering evergreens capture the stillness of mountain air.',
    price: 1199,
    image: candleCedar,
    color: '#8D9B82',
    tags: ['Woodland', 'Deep Peace', 'Cleansing'],
  },
  {
    id: 602,
    name: 'Crimson Red Pillar Set',
    category: 'Colour Candles',
    scent: 'Spiced Apple · Cinnamon',
    description: 'A beautiful set of multi-height solid red pillar candles with a warm spicy fragrance.',
    price: 599,
    image: catColour,
    color: '#E8D3A9',
    tags: ['Solid Color Pillar', 'Spiced Apple', 'Holiday Vibe'],
  },
  {
    id: 603,
    name: 'Ocean Blue Tealights Pack',
    category: 'Colour Candles',
    scent: 'Sea Breeze · Jasmine',
    description: 'A pack of 6 color-accented soy tealights for floating displays and candle holders.',
    price: 249,
    image: heroCandle,
    color: '#E8D3A9',
    tags: ['Tealight Pack', 'Sea Breeze Scent', '6-Piece Set'],
  },
];

interface ShopSectionProps {
  onAddToCart: (product: Product) => void;
  activeCategoryFilter: string;
}

const ShopSection = ({ onAddToCart, activeCategoryFilter }: ShopSectionProps) => {
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

  const filteredProducts = activeCategoryFilter === 'All'
    ? shopProducts
    : shopProducts.filter(p => p.category === activeCategoryFilter);

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
          {filteredProducts.map((product) => {
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
