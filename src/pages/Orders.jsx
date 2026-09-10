import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import {
  Clock,
  Package,
  MapPin,
  Utensils,
  ShoppingBag,
} from "lucide-react";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { currentUser, authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const statusTabs = ["All", "Pending", "Preparing", "Ready", "Confirmed", "Delivered", "Cancelled"];
  const visibleOrders = activeStatus === "All" ? orders : orders.filter((order) => (order.status || "Pending") === activeStatus);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!currentUser) return;

        console.log(
          "Fetching orders for user:",
          currentUser.uid
        );

        const userOrdersQuery = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
        const indexedOrdersQuery = query(userOrdersQuery, orderBy("createdAt", "desc"));
        const updateOrders = (querySnapshot) => {
          const orderData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          orderData.sort((first, second) => (second.createdAt?.seconds || 0) - (first.createdAt?.seconds || 0));
          setOrders(orderData);
          setLoading(false);
        };
        let fallbackUnsubscribe;
        const fallbackToUnindexedQuery = (caughtError) => {
          if (!caughtError.message.includes("index")) {
            setError(caughtError.message);
            setLoading(false);
            return;
          }
          // The same live data is available without the composite index; sorting is done above.
          fallbackUnsubscribe = onSnapshot(userOrdersQuery, updateOrders, (fallbackError) => {
            setError(fallbackError.message);
            setLoading(false);
          });
        };
        const unsubscribe = onSnapshot(indexedOrdersQuery, updateOrders, fallbackToUnindexedQuery);
        return () => {
          unsubscribe();
          fallbackUnsubscribe?.();
        };

  }, [currentUser, authLoading]);

  if (authLoading) {
    return (
      <main className="empty-orders">
        <p>Loading your orders...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="empty-orders">

        <Package size={55} />

        <h1>Please Login</h1>

        <p>
          Login to view your orders.
        </p>

        <Link
          to="/login"
          className="primary-button"
        >
          Login
        </Link>

      </main>
    );
  }

  if (loading) {
    return <main className="empty-orders"><p>Loading your orders...</p></main>;
  }

  if (error) {
    return (
      <main className="empty-orders">

        <Package size={55} />

        <h1>Unable to load orders</h1>

        <p>{error}</p>

      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="empty-orders">

        <Package size={55} />

        <h1>No orders yet</h1>

        <p>
          Your placed orders will appear here.
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
    <main className="orders-page">

      <div className="orders-container">

        <div className="orders-header">

          <span>Your purchases</span>

          <h1>My Orders</h1>

          <p>
            View your recent cafe orders
            and their current status.
          </p>

        </div>

        <div className="order-tabs" role="tablist" aria-label="Filter orders by status">
          {statusTabs.map((status) => (
            <button key={status} type="button" role="tab" aria-selected={activeStatus === status} className={activeStatus === status ? "active" : ""} onClick={() => setActiveStatus(status)}>
              {status}
            </button>
          ))}
        </div>

        <div className="orders-list">

          {visibleOrders.length ? visibleOrders.map((order) => (

            <article
              className="order-card"
              key={order.id}
            >

              <div className="order-card-header">

                <div>

                  <span className="order-label">
                    Order ID
                  </span>

                  <h3>
                    #{order.id}
                  </h3>

                </div>

                <span
                  className={`order-status ${
                    order.status
                      ?.toLowerCase()
                      .replace(" ", "-") ||
                    "pending"
                  }`}
                >
                  {order.status || "Pending"}
                </span>

              </div>

              <div className="order-meta">

                <div>
                  <Clock size={17} />

                  <span>
                    {order.createdAt?.toDate
                      ? order.createdAt
                          .toDate()
                          .toLocaleString()
                      : "Just now"}
                  </span>
                </div>

                <div>
                  <ShoppingBag size={17} />

                  <span>
                    {order.totalItems || 0} items
                  </span>
                </div>

                <div>
                  <Utensils size={17} />

                  <span>
                    {order.customer?.orderType ||
                      "N/A"}
                  </span>
                </div>

              </div>

              {order.customer?.orderType ===
                "delivery" &&
                order.customer?.address && (

                  <div className="order-address">

                    <MapPin size={17} />

                    <span>
                      {order.customer.address}
                    </span>

                  </div>

                )}

              {order.customer?.orderType ===
                "dine-in" &&
                order.customer?.tableNumber && (

                  <div className="order-address">

                    <Utensils size={17} />

                    <span>
                      Table{" "}
                      {order.customer.tableNumber}
                    </span>

                  </div>

                )}

              <div className="order-items">

                {order.items?.map((item) => (

                  <div
                    className="order-item"
                    key={item.id}
                  >

                    <div className="order-item-left">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>

                        <h4>
                          {item.name}
                        </h4>

                        <span>
                          {item.quantity} × ₹
                          {item.price}
                        </span>

                      </div>

                    </div>

                    <strong>
                      ₹
                      {item.quantity *
                        item.price}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="order-card-footer">

                <span>Total</span>

                <strong>
                  ₹{order.totalPrice}
                </strong>

              </div>

            </article>

          )) : <div className="orders-filter-empty"><h2>No {activeStatus.toLowerCase()} orders</h2><p>Orders with this status will appear here.</p></div>}

        </div>

      </div>

    </main>
  );
}

export default Orders;
