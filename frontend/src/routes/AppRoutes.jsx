import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Cart from "../pages/Cart";
import Success from "../pages/Success";
import Orders from "../pages/Orders";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import TrackOrder from "../pages/TrackOrder";
import Review from "../pages/Review";
import AdminReviews from "../pages/AdminReviews";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Analytics from "../pages/Analytics";
import CustomerManagement
from "../pages/CustomerManagement";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/booking"
        element={<Booking />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/track-order"
        element={<TrackOrder />}
      />

      <Route
        path="/review/:orderId"
        element={<Review />}
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-reviews"
        element={<AdminReviews />}
      />
           <Route path="/TrackOrder" element={<TrackOrder />} />

      <Route
  path="/about"
  element={<About />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>

<Route path="/faq" element={<FAQ />} />

<Route
  path="/analytics"
  element={<Analytics />}
/>

<Route
  path="/customers"
  element={
    <CustomerManagement />
  }
/>

    </Routes>
  );
}