import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const slides = [
  {
    id: 1,
    eyebrow: "New Season Drop",
    title: "Redefine Your Everyday Style.",
    description: "Explore premium apparel, tailored fits, and statement streetwear crafted for confidence.",
    ctaText: "Shop Collection",
    ctaLink: "/shop",
    bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    eyebrow: "Luxury & Lifestyle",
    title: "The Details Make the Statement.",
    description: "Discover curated watches, genuine leather bags, and timeless accessories.",
    ctaText: "Explore Accessories",
    ctaLink: "/shop",
    bgImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    eyebrow: "Exclusive Footwear",
    title: "Step Out in Absolute Comfort.",
    description: "From classic sneakers to sleek boots—find your perfect pair today.",
    ctaText: "Shop Footwear",
    ctaLink: "/shop",
    bgImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly slower rotation for better readability
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="hero-slider card">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.bgImage})` }}
        >
          <div className="hero-content">
            <span className="eyebrow">{slide.eyebrow}</span>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <Link to={slide.ctaLink} className="primary-btn">{slide.ctaText}</Link>
          </div>
        </div>
      ))}
      <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}