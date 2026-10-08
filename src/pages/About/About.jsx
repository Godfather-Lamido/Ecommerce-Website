import { ArrowRight, BadgeCheck, HeartHandshake, SearchCheck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';

const principles = [
  {
    icon: <SearchCheck size={21} />,
    title: 'Easy to explore',
    description: 'Browse a broad mix of products with clear categories, useful search, and practical sorting.',
  },
  {
    icon: <BadgeCheck size={21} />,
    title: 'Clear product details',
    description: 'See product descriptions, ratings, availability, and pricing before adding something to your cart.',
  },
  {
    icon: <HeartHandshake size={21} />,
    title: 'A considerate experience',
    description: 'Save favourites, adjust quantities, and keep your cart close while you decide what works for you.',
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <span className="about-eyebrow">A little about us</span>
        <h1>Everyday finds, made easier to discover.</h1>
        <p>
          E-Sharp is a modern storefront built around a simple idea: finding something useful
          should feel clear, considered, and enjoyable from the first browse to the final click.
        </p>
        <div className="about-hero-actions">
          <Link to="/shop" className="primary-btn">
            <ShoppingBag size={17} />
            Explore the shop
          </Link>
          <Link to="/contact" className="about-text-link">
            Talk to our team <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story-heading">
          <span className="about-eyebrow">What we are building</span>
          <h2 id="about-story-title">A more thoughtful way to shop online.</h2>
        </div>
        <div className="about-story-copy">
          <p>
            Shopping online can quickly become noisy. E-Sharp brings product discovery into one
            straightforward place, with a clean catalog, focused product cards, and helpful tools
            that make comparing and saving items easier.
          </p>
          <p>
            The experience is designed to work naturally across the journey: discover products,
            explore a category, check the details, save a favourite, and keep track of what you
            want in your cart.
          </p>
        </div>
      </section>

      <section className="about-principles" aria-labelledby="about-principles-title">
        <div className="about-section-heading">
          <span className="about-eyebrow">Our approach</span>
          <h2 id="about-principles-title">Useful by design.</h2>
          <p>We focus on the details that make browsing feel simpler and more trustworthy.</p>
        </div>
        <div className="about-principle-grid">
          {principles.map(({ icon, title, description }) => (
            <article className="about-principle-card card" key={title}>
              <span className="about-principle-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-transparency" aria-labelledby="about-transparency-title">
        <div>
          <span className="about-eyebrow">A note on the storefront</span>
          <h2 id="about-transparency-title">A clear, evolving experience.</h2>
        </div>
        <div>
          <p>
            E-Sharp is currently an evolving storefront experience. Product information and
            availability are loaded from the DummyJSON catalog; your cart and saved items are
            stored in this browser. Checkout is a demonstration flow and does not process real
            payments or place real orders.
          </p>
          <Link to="/contact" className="about-text-link">
            Questions or feedback? Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
