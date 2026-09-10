import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import {
  User,
  Mail,
  ShoppingBag,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";

import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const {
    currentUser,
    authLoading,
    isAdmin,
  } = useAuth();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await signOut(auth);

      setShowLogoutModal(false);

      navigate("/login");

    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      alert(
        "Unable to logout. Please try again."
      );

    } finally {
      setLogoutLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="profile-page">

        <div className="profile-loading">
          Loading profile...
        </div>

      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="empty-orders">

        <User size={55} />

        <h1>Please Login</h1>

        <p>
          Login to access your profile.
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

  return (
    <main className="profile-page">

      <div className="profile-container">

        <section className="profile-card">

          <div className="profile-avatar">

            <User size={38} />

          </div>

          <div className="profile-title">

            <h1>
              {isAdmin ? "Administrator" : (currentUser.displayName || "Customer")}
            </h1>

            <p>
              {isAdmin ? "Manage cafe orders and your administrator account." : "Manage your Brew & Bite account."}
            </p>

          </div>

          <div className="profile-details">

            {isAdmin && <div className="profile-detail"><ShieldCheck size={20} /><div><span>Account Role</span><strong>Administrator</strong></div></div>}

            <div className="profile-detail">

              <User size={20} />

              <div>

                <span>
                  Full Name
                </span>

                <strong>
                  {currentUser.displayName ||
                    "Not provided"}
                </strong>

              </div>

            </div>

            <div className="profile-detail">

              <Mail size={20} />

              <div>

                <span>
                  Email Address
                </span>

                <strong>
                  {currentUser.email}
                </strong>

              </div>

            </div>

          </div>

          <div className="profile-actions">

            <Link
              to={isAdmin ? "/admin/dashboard" : "/orders"}
              className="profile-orders-button"
            >
              {isAdmin ? <LayoutDashboard size={18} /> : <ShoppingBag size={18} />}

              {isAdmin ? "Admin Dashboard" : "My Orders"}
            </Link>

            <button
              type="button"
              className="profile-logout-button"
              onClick={() =>
                setShowLogoutModal(true)
              }
            >
              <LogOut size={18} />

              Logout
            </button>

          </div>

        </section>

      </div>

      {showLogoutModal && (

        <div className="logout-modal-overlay">

          <div className="logout-modal">

            <button
              type="button"
              className="logout-modal-close"
              onClick={() =>
                setShowLogoutModal(false)
              }
            >
              <X size={20} />
            </button>

            <div className="logout-modal-icon">

              <LogOut size={28} />

            </div>

            <h2>
              Logout
            </h2>

            <p>
              Are you sure you want to logout
              from your account?
            </p>

            <div className="logout-modal-actions">

              <button
                type="button"
                className="logout-cancel-button"
                onClick={() =>
                  setShowLogoutModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-confirm-button"
                disabled={logoutLoading}
                onClick={handleLogout}
              >
                {logoutLoading
                  ? "Logging out..."
                  : "Yes, Logout"}
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default Profile;
