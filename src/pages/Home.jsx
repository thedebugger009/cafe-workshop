import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Coffee,
  Salad,
  Heart,
} from "lucide-react";
import menuData from "../data/menuData";
import FoodCard from "../components/FoodCard";
function Home() {
  const offerProducts = menuData
    .filter((product) => [2, 4, 9, 13].includes(product.id))
    .map((product) => ({
      ...product,
      id: `offer-${product.id}`,
      originalPrice: product.price,
      price: Math.round(product.price * 0.85),
    }));

  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            Freshly Brewed • Freshly Made
          </span>

          <h1>
            Great Coffee.
            <span> Delicious Moments.</span>
          </h1>

          <p>
            Enjoy freshly brewed coffee, tasty meals and
            delicious desserts prepared with care every day.
          </p>

          <div className="hero-buttons">

            <Link
              to="/menu"
              className="primary-button"
            >
              Explore Menu

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              className="secondary-button"
            >
              About Our Cafe
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
            alt="Coffee at Brew and Bite Cafe"
          />

        </div>

      </section>
      <section className="features-section">

  <div className="section-heading">

    <span>Why choose us</span>

    <h2>
      More Than Just Coffee
    </h2>

    <p>
      We focus on fresh ingredients, great taste and
      creating a comfortable experience for every customer.
    </p>

  </div>

  <div className="features-grid">

    <div className="feature-card">

      <div className="feature-icon">
        <Coffee size={28} />
      </div>

      <h3>Freshly Brewed</h3>

      <p>
        Our coffee is freshly brewed to give you
        rich flavor in every cup.
      </p>

    </div>

    <div className="feature-card">

      <div className="feature-icon">
        <Salad size={28} />
      </div>

      <h3>Fresh Ingredients</h3>

      <p>
        We use quality ingredients to prepare
        fresh and delicious food every day.
      </p>

    </div>

    <div className="feature-card">

      <div className="feature-icon">
        <Heart size={28} />
      </div>

      <h3>Made With Love</h3>

      <p>
        Every meal and drink is prepared with
        attention, care and passion.
      </p>

    </div>

  </div>

</section>
<section className="popular-menu">

  <div className="section-heading">

    <span>Our favourites</span>

    <h2>
      Popular Menu
    </h2>

    <p>
      Discover some of our most loved food and drinks,
      freshly prepared for every order.
    </p>

  </div>

  <div className="popular-menu-grid">

    {menuData.slice(0, 4).map((product) => (
      <FoodCard
        key={product.id}
        product={product}
      />
    ))}

  </div>

  <div className="view-menu-wrapper">

    <Link
      to="/menu"
      className="primary-button"
    >
      View Full Menu

      <ArrowRight size={18} />
    </Link>

  </div>

</section>
<section className="offers-section">
  <div className="section-heading">
    <span>Limited-time treats</span>
    <h2>15% Off Your Cafe Favourites</h2>
    <p>Enjoy a little extra on handpicked coffee, pizza, burgers and desserts.</p>
  </div>
  <div className="offers-grid">
    {offerProducts.map((product) => <FoodCard key={product.id} product={product} />)}
  </div>
</section>
<section className="cafe-experience">
  <div className="experience-content">
    <span>Made for your moments</span>
    <h2>Come for the coffee,<br />stay for the good times.</h2>
    <p>From a quiet morning cup to an evening catch-up, Brew & Bite makes every visit feel warm and welcoming.</p>
    <Link to="/contact" className="secondary-button">Plan Your Visit</Link>
  </div>
  <div className="experience-highlights">
    <div><strong>8 AM – 10 PM</strong><span>Open every day</span></div>
    <div><strong>Fresh daily</strong><span>Made with care</span></div>
    <div><strong>Good company</strong><span>Always welcome</span></div>
  </div>
</section>
    </main>
  );
}

export default Home;
