import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const { items, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  if (items.length === 0) {
    return (
      <main className="empty-cart">

        <h1>Your cart is empty</h1>

        <p>
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/menu"
          className="primary-button"
        >
          Explore Menu
        </Link>

      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-container">

        <section className="cart-items-section">

          <h1>Your Cart</h1>

          <p className="cart-items-count">
            {totalItems} items
          </p>

          <div className="cart-items">

            {items.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <h3>{item.name}</h3>

                  <span>{item.category}</span>

                  <strong>
                    ₹{item.price}
                  </strong>

                </div>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    <Minus size={16} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    <Plus size={16} />
                  </button>

                </div>

                <div className="cart-item-total">

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        <aside className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">

            <span>Items</span>

            <span>{totalItems}</span>

          </div>

          <div className="summary-row">

            <span>Subtotal</span>

            <span>
              ₹{totalPrice}
            </span>

          </div>

          <div className="summary-row">

            <span>Delivery</span>

            <span>Free</span>

          </div>

          <div className="summary-total">

            <span>Total</span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>

        </aside>

      </div>

    </main>
  );
}

export default Cart;