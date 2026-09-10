import menuData from "../data/menuData";
import FoodCard from "../components/FoodCard";

function Menu() {
  return (
    <main className="menu-page">

      <section className="menu-header">

        <span>Fresh & Delicious</span>

        <h1>Our Menu</h1>

        <p>
          Explore our collection of freshly prepared
          coffee, meals, snacks and desserts.
        </p>

      </section>

      <section className="menu-products">

        {menuData.map((product) => (
          <FoodCard
            key={product.id}
            product={product}
          />
        ))}

      </section>

    </main>
  );
}

export default Menu;