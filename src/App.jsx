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

function AppContent() {
  const location = useLocation();
  const adminRoute = location.pathname.startsWith("/admin");
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
      </Routes>
      {!adminRoute && <Footer/>}
    </>
  );
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;
