import { ArrowRight } from "lucide-react";
import "./Button.css";

export function Button() {
  return (
    <>
      <div className="hero-buttons">
          <button className="shop-now">
            Shop Now
            <ArrowRight />
          </button>

        <button className="explore-collection">Explore Collection</button>
      </div>
    </>
  );
}
