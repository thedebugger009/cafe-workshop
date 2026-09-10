import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RequireAdmin from "./components/RequireAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import NotFound from "./pages/NotFound";

const pageDetails = {
  "/": ["Brew & Bite Cafe | Coffee, Food & Good Moments", "Freshly brewed coffee, delicious food and sweet treats at Brew & Bite Cafe."],
  "/menu": ["Menu | Brew & Bite Cafe", "Explore freshly prepared coffee, meals, snacks and desserts at Brew & Bite Cafe."],
  "/about": ["About Us | Brew & Bite Cafe", "Learn about Brew & Bite Cafe, where great coffee, fresh food and good moments come together."],
  "/contact": ["Contact Us | Brew & Bite Cafe", "Contact Brew & Bite Cafe in Maliahabad, Lucknow for menu, order and cafe enquiries."],
  "/cart": ["Your Cart | Brew & Bite Cafe", "Review the items in your Brew & Bite Cafe cart."],
  "/checkout": ["Checkout | Brew & Bite Cafe", "Complete your Brew & Bite Cafe order."],
};

function setMeta(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
}

function AppContent() {
  const location = useLocation();
  const adminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const details = pageDetails[location.pathname];
    const isNotFound = !details && !["/login", "/register", "/profile", "/orders"].includes(location.pathname) && !adminRoute;
    const title = isNotFound ? "Page Not Found | Brew & Bite Cafe" : details?.[0] || "Brew & Bite Cafe";
    const description = isNotFound
      ? "The requested Brew & Bite Cafe page could not be found."
      : details?.[1] || "Manage your Brew & Bite Cafe account and orders.";

    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="robots"]', adminRoute || isNotFound ? "noindex, nofollow" : "index, follow");
  }, [location.pathname, adminRoute]);
  return (
    <>
     {!adminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/register"
  element={<Register />}
/>
 <Route path="/profile"element={<Profile />} />
 <Route path="/admin/login" element={<AdminLogin />} />
 <Route path="/admin/dashboard" element={<RequireAdmin><AdminOrders dashboard /></RequireAdmin>} />
 <Route path="/admin/orders" element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
 <Route path="/admin/orders/:id" element={<RequireAdmin><AdminOrderDetail /></RequireAdmin>} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route
  path="/terms"
  element={<Terms />}
/>

<Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!adminRoute && <Footer/>}
    </>
  );
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;
