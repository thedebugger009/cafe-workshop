import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function FoodCard({ product }) {
  const dispatch = useDispatch();
  return <div className="food-card"><div className="food-card-image"><img src={product.image} alt={product.name} /><span className="food-category">{product.category}</span>{product.originalPrice && <span className="food-offer-badge">15% OFF</span>}</div><div className="food-card-content"><h3>{product.name}</h3><p>{product.description}</p><div className="food-card-bottom"><span className="food-price">{product.originalPrice && <del>₹{product.originalPrice}</del>}₹{product.price}</span><button className="add-cart-button" onClick={() => dispatch(addToCart(product))}><ShoppingBag size={17} />Add</button></div></div></div>;
}

export default FoodCard;
