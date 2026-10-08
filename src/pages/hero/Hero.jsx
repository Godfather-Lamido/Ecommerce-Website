import './Hero.css';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import { Benefit } from '../../components/benefit/Benefit';
import { Category } from '../../components/category/category';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';

import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

export default function Hero() {
  const { products, categories } = useProducts();
  const benefits = [
    {
      icon: <Truck size={30} />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <ShieldCheck size={30} />,
      title: 'Secure Payments',
      description: '100% secure checkout',
    },
    {
      icon: <RotateCcw size={30} />,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: <Headset size={30} />,
      title: '24/7 Support',
      description: 'Always here to help',
    },
  ];

  const featuredCategories = categories
    .map((category) => ({
      ...category,
      image: products.find((product) => product.categoryId === category.slug)?.image,
    }))
    .filter((category) => category.image)
    .slice(0, 6);

  const heroProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <div>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-label">TRENDING NOW</span>

              <h1>Discover Products You&apos;ll Love</h1>

              <p>Shop the latest trending products curated for modern lifestyles.</p>

              <div className="hero-buttons">
                <Link to="/shop" className="hero-button-link">
                  <Button className="shop-now">Shop now</Button>
                </Link>
                <Link to="/search" className="hero-button-link">
                  <Button variant="secondary" className="explore-collection">Explore Collection</Button>
                </Link>
              </div>

              <div className="hero-stats">
                <span>Loved by 50,000+ customers worldwide</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-visual-wrap">
              {heroProducts.map((product, index) => {
                const positions = [
                  'top-left',
                  'bottom-left',
                  'top-right',
                  'bottom-right',
                ];

                return (
                  <div key={product.id} className={`floating-product ${positions[index]}`}>
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                    <strong>{formatPrice(product.price, product.currency)}</strong>
                  </div>
                );
              })}

              <div className="hero-portrait">
                <img src="/images/heroimage.png" alt="Lifestyle shopper portrait" />
              </div>
            </div>
          </div>
        </section>

        <div className="benefits">
          <div className="benefits-track">
            {benefits.map((item, index) => (
              <Benefit
                key={`benefit-${index}`}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>

      <section className="categories-section">
        <div className="categories-header">
          <h2>Shop by Categories</h2>
          <Link to="/shop#categories">View All Categories</Link>
        </div>

        <div className="categories">
          {featuredCategories.map((category) => (
            <Category key={category.slug} image={category.image} title={category.name} slug={category.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
