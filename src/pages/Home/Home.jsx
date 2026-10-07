import Header from "../../components/header/Header";
import Hero from "../../pages/hero/Hero";
// import FeaturedProducts from "./Sections/FeaturedProducts";

// import "./Home.css";

export default function Home() {
  return (
    <main>
      <Header />

      <Hero />

      <h1>Featured Products</h1>

      {/* <FeaturedProducts /> */}
    </main>
  );
}