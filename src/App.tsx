import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuthStore } from "@/stores/authStore";

// Public Pages
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import Categories from "@/pages/Categories";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Community from "@/pages/Community";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import HelpCenter from "@/pages/HelpCenter";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import ArtisanShop from "@/pages/ArtisanShop";

// Customer Dashboard
import CustomerHome from "@/pages/dashboard/customer/CustomerHome";
import CustomerProfile from "@/pages/dashboard/customer/CustomerProfile";
import BrowseProducts from "@/pages/dashboard/customer/BrowseProducts";
import Cart from "@/pages/dashboard/customer/Cart";
import Checkout from "@/pages/dashboard/customer/Checkout";
import OrderHistory from "@/pages/dashboard/customer/OrderHistory";
import OrderTracking from "@/pages/dashboard/customer/OrderTracking";
import Wishlist from "@/pages/dashboard/customer/Wishlist";
import CustomerReviews from "@/pages/dashboard/customer/CustomerReviews";
import CustomerMessages from "@/pages/dashboard/customer/CustomerMessages";

// Artisan Dashboard
import ArtisanHome from "@/pages/dashboard/artisan/ArtisanHome";
import ShopSettings from "@/pages/dashboard/artisan/ShopSettings";
import AddProduct from "@/pages/dashboard/artisan/AddProduct";
import ManageProducts from "@/pages/dashboard/artisan/ManageProducts";
import ArtisanOrders from "@/pages/dashboard/artisan/ArtisanOrders";
import ArtisanOrderDetails from "@/pages/dashboard/artisan/ArtisanOrderDetails";
import Earnings from "@/pages/dashboard/artisan/Earnings";
import Analytics from "@/pages/dashboard/artisan/Analytics";
import CustomOrders from "@/pages/dashboard/artisan/CustomOrders";
import Messages from "@/pages/dashboard/artisan/Messages";

// Admin Dashboard
import AdminHome from "@/pages/dashboard/admin/AdminHome";
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import ProductManagement from "@/pages/dashboard/admin/ProductManagement";
import OrderManagement from "@/pages/dashboard/admin/OrderManagement";
import Revenue from "@/pages/dashboard/admin/Revenue";
import Reports from "@/pages/dashboard/admin/Reports";
import Complaints from "@/pages/dashboard/admin/Complaints";
import AdminSettings from "@/pages/dashboard/admin/AdminSettings";

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Layout Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<Marketplace />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop/:artisanId" element={<ArtisanShop />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Dashboard */}
        <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CustomerHome />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="browse" element={<BrowseProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="tracking" element={<OrderTracking />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="reviews" element={<CustomerReviews />} />
          <Route path="messages" element={<CustomerMessages />} />
        </Route>

        {/* Artisan Dashboard */}
        <Route
          path="/dashboard/artisan"
          element={
            <ProtectedRoute allowedRoles={["artisan"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ArtisanHome />} />
          <Route path="shop" element={<ShopSettings />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ArtisanOrders />} />
          <Route path="order-details" element={<ArtisanOrderDetails />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="custom-orders" element={<CustomOrders />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="reports" element={<Reports />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
