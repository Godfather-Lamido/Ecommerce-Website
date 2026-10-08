import "./category.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Category({ image, title, slug }) {
  return (
    <Link to={`/category/${slug}`} className="category-card">
      <img src={image} alt={title} />

      <div className="category-gradient" />

      <div className="category-overlay">
        <div>
          <h3>{title}</h3>
          <span>Explore collection</span>
        </div>

        <div className="category-shop">
          <ArrowRight size={17} />
        </div>
      </div>
    </Link>
  );
}