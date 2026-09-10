import {
  Coffee,
  Heart,
  Leaf,
  Users,
} from "lucide-react";

function About() {
  return (
    <main className="about-page">

      <section className="about-hero">

        <span>Our Story</span>

        <h1>
          More Than Just a Cafe
        </h1>

        <p>
          Brew & Bite is a place where great coffee,
          delicious food and good moments come together.
        </p>

      </section>

      <section className="about-content">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
            alt="Brew and Bite Cafe"
          />
        </div>

        <div className="about-text">

          <span>Welcome to Brew & Bite</span>

          <h2>
            Fresh Food, Great Coffee and Warm Moments
          </h2>

          <p>
            At Brew & Bite, we believe a cafe should be
            more than just a place to grab a cup of coffee.
          </p>

          <p>
            We focus on serving freshly prepared meals,
            quality coffee and delicious desserts in a
            comfortable and welcoming environment.
          </p>

          <p>
            Whether you're meeting friends, enjoying a
            quick meal or simply relaxing with your
            favourite coffee, we want every visit to feel
            special.
          </p>

        </div>

      </section>

      <section className="about-values">

        <div className="section-heading">
          <span>What matters to us</span>

          <h2>Our Values</h2>

          <p>
            Simple principles that help us create a better
            experience for every customer.
          </p>
        </div>

        <div className="about-values-grid">

          <div className="about-value-card">
            <Coffee size={30} />

            <h3>Quality</h3>

            <p>
              We focus on great ingredients and carefully
              prepared food and drinks.
            </p>
          </div>

          <div className="about-value-card">
            <Leaf size={30} />

            <h3>Freshness</h3>

            <p>
              Our food and drinks are prepared fresh to
              deliver the best possible taste.
            </p>
          </div>

          <div className="about-value-card">
            <Heart size={30} />

            <h3>Care</h3>

            <p>
              Every order is prepared with attention and
              care for our customers.
            </p>
          </div>

          <div className="about-value-card">
            <Users size={30} />

            <h3>Community</h3>

            <p>
              We want our cafe to be a welcoming place
              where people can connect and relax.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default About;