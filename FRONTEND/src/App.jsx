import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute.jsx";

import Home from "./pages/Home/Home.jsx";
import ProductsPage from "./pages/Products/ProductsPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import WishlistPage from "./pages/Cart/WishlistPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import SignupPage from "./pages/Auth/SignupPage.jsx";
import GoogleLoginPage from "./pages/Auth/GoogleLoginPage.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import AdminUsers from "./pages/AdminUsers/AdminUsers.jsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google" element={<GoogleLoginPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Cart — accessible to all but checkout inside requires auth */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bag" element={<CartPage />} />

        {/* Protected — any authenticated user */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Protected — admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
