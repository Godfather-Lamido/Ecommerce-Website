import "./Hero.css";

import { Button } from "../../components/common/Button/Button";
import { Benefit } from "../../components/benefit/Benefit";
import { Category } from "../../components/category/category";

import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

import fashion from "../../../public/images/category/fashion.png";
import electronic from "../../../public/images/category/electronics.png";
import beauty from "../../../public/images/category/beauty.png";
import fitness from "../../../public/images/category/fitness.png";
import homeDeco from "../../../public/images/category/home deco.png";
import accessories from "../../../public/images/category/accessories.png";

export function Hero() {
  const benefits = [
    {
      icon: <Truck size={30} />,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Secure Payments",
      description: "100% secure checkout",
    },
    {
      icon: <RotateCcw size={30} />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Headset size={30} />,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ];

  const categories = [
    {
      title: "Fashion",
      image: fashion,
    },
    {
      title: "Electronics",
      image: electronic,
    },
    {
      title: "Beauty",
      image: beauty,
    },
    {
      title: "Fitness",
      image: fitness,
    },
    {
      title: "Home Decor",
      image: homeDeco,
    },
    {
      title: "Accessories",
      image: accessories,
    },
  ];

  const sampleProducts = [
    {
      img: "https://images.unsplash.com/photo-1600180758895-0f3c1e4b8f2d?auto=format&fit=crop&w=500&q=80",
      title: "Classic Sneakers",
      price: "$79.99",
    },
    {
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      title: "Classic Watch",
      price: "$129.99",
    },
    {
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
      title: "Wireless Headphones",
      price: "$89.99",
    },
    {
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
      title: "Leather Handbag",
      price: "$64.99",
    },
  ];

  return (
    <>
      <div>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-label">TRENDING NOW</span>

              <h1>Discover Products You'll Love</h1>

              <p>
                Shop the latest trending products curated for modern lifestyles.
              </p>

              <Button />

              <div className="hero-stats">
                <span>Loved by 50,000+ customers worldwide</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="circular-animation">
              <div className="orbit-ring">
                {sampleProducts.map((product, index) => {
                  const productAngle = (360 / sampleProducts.length) * index;

                  return (
                    <div
                      key={product.title}
                      className="orbit-item"
                      style={{
                        "--angle": `${productAngle}deg`,
                      }}
                    >
                      <div className="product-card">
                        <img src={product.img} alt={product.title} />

                        <div className="product-info">
                          <span>{product.title}</span>
                          <strong>{product.price}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="benefits">
          <div className="benefits-track">
            {benefits.map((item, index) => (
              <Benefit
                key={`first-${index}`}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}

            {benefits.map((item, index) => (
              <Benefit
                key={`second-${index}`}
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
          <a href="#">View All Categories</a>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <Category
              key={category.title}
              image={category.image}
              title={category.title}
            />
          ))}
        </div>
      </section>
    </>
  );
}
