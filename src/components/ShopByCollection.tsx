import { useRef, useEffect, useState } from 'react';
import './ShopByCollection.css';

// Import image assets
import logoImg from '../assets/images/logo.png';
import catPremium from '../assets/images/cat-premium.png';
import catTaper from '../assets/images/cat-taper.png';
import catDecorative from '../assets/images/cat-decorative.png';
import catDessert from '../assets/images/cat-dessert.png';
import catWaxMelts from '../assets/images/cat-waxmelts.png';
import catColour from '../assets/images/cat-colour.png';

interface CollectionItem {
  id: string;
  name: string;
  label: string;
  image: string;
  color: string;
}

const collections: CollectionItem[] = [
  {
    id: 'All',
    name: 'All',
    label: 'All Collection',
    image: logoImg,
    color: 'linear-gradient(45deg, #C9A86A, #E8D3A9, #D98E32)',
  },
  {
    id: 'Premium Candles',
    name: 'Premium',
    label: 'Premium',
    image: catPremium,
    color: 'linear-gradient(45deg, #D98E32, #f39c12)',
  },
  {
    id: 'Taper Candles',
    name: 'Taper',
    label: 'Taper',
    image: catTaper,
    color: 'linear-gradient(45deg, #C9A86A, #95a5a6)',
  },
  {
    id: 'Decorative Candles',
    name: 'Decorative',
    label: 'Decorative',
    image: catDecorative,
    color: 'linear-gradient(45deg, #E8D3A9, #e74c3c)',
  },
  {
    id: 'Dessert Candles',
    name: 'Dessert',
    label: 'Dessert',
    image: catDessert,
    color: 'linear-gradient(45deg, #D98E32, #e67e22)',
  },
  {
    id: 'Wax Melts & Sachets',
    name: 'Wax Melts',
    label: 'Wax Melts',
    image: catWaxMelts,
    color: 'linear-gradient(45deg, #C9A86A, #2ecc71)',
  },
  {
    id: 'Colour Candles',
    name: 'Coloured',
    label: 'Coloured',
    image: catColour,
    color: 'linear-gradient(45deg, #E8D3A9, #3498db)',
  },
];

interface ShopByCollectionProps {
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
}

const ShopByCollection = ({ activeCategoryFilter, setActiveCategoryFilter }: ShopByCollectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScrollArrows = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollArrows);
      // Run once on load
      checkScrollArrows();
      window.addEventListener('resize', checkScrollArrows);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollArrows);
      }
      window.removeEventListener('resize', checkScrollArrows);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.6;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleBubbleClick = (categoryId: string) => {
    setActiveCategoryFilter(categoryId);
    // Smooth scroll to the shop section
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="collections-nav">
      <div className="collections-nav__inner container">
        <h2 className="collections-nav__title">-- SHOP BY COLLECTION --</h2>
        
        <div className="collections-nav__slider-wrapper">
          {showLeftArrow && (
            <button 
              className="collections-nav__arrow collections-nav__arrow--left" 
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <span>‹</span>
            </button>
          )}

          <div className="collections-nav__scroll-container" ref={scrollContainerRef}>
            <div className="collections-nav__list">
              {collections.map((item) => {
                const isActive = activeCategoryFilter === item.id;
                return (
                  <button
                    key={item.id}
                    className={`collections-nav__item ${isActive ? 'collections-nav__item--active' : ''}`}
                    onClick={() => handleBubbleClick(item.id)}
                  >
                    <div className="collections-nav__bubble-outer" style={{ backgroundImage: item.color }}>
                      <div className="collections-nav__bubble-inner">
                        <img 
                          src={item.image} 
                          alt={item.label} 
                          className="collections-nav__image" 
                        />
                      </div>
                    </div>
                    <span className="collections-nav__label">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {showRightArrow && (
            <button 
              className="collections-nav__arrow collections-nav__arrow--right" 
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <span>›</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
