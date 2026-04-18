import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiUser, FiShoppingBag, FiHeart, FiStar, FiLogOut,
  FiMenu, FiChevronLeft, FiSettings, FiBarChart2,
  FiMessageSquare, FiPackage, FiDollarSign, FiUsers, FiAlertCircle,
  FiPlusCircle, FiShoppingCart, FiTruck, FiGrid, FiFileText,
} from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { getInitials, cn } from "@/lib/utils";
import ConfirmModal from "@/components/features/ConfirmModal";

const customerLinks = [
  { label: "Dashboard", path: "/dashboard/customer", icon: FiHome, end: true },
  { label: "Profile", path: "/dashboard/customer/profile", icon: FiUser },
  { label: "Browse Products", path: "/dashboard/customer/browse", icon: FiGrid },
  { label: "Cart", path: "/dashboard/customer/cart", icon: FiShoppingCart },
  { label: "Checkout", path: "/dashboard/customer/checkout", icon: FiDollarSign },
  { label: "Order History", path: "/dashboard/customer/orders", icon: FiPackage },
  { label: "Order Tracking", path: "/dashboard/customer/tracking", icon: FiTruck },
  { label: "Wishlist", path: "/dashboard/customer/wishlist", icon: FiHeart },
  { label: "Reviews", path: "/dashboard/customer/reviews", icon: FiStar },
  { label: "Messages", path: "/dashboard/customer/messages", icon: FiMessageSquare },
];

const artisanLinks = [
  { label: "Dashboard", path: "/dashboard/artisan", icon: FiHome, end: true },
  { label: "Shop Settings", path: "/dashboard/artisan/shop", icon: FiSettings },
  { label: "Add Product", path: "/dashboard/artisan/add-product", icon: FiPlusCircle },
  { label: "Manage Products", path: "/dashboard/artisan/products", icon: FiGrid },
  { label: "Orders", path: "/dashboard/artisan/orders", icon: FiPackage },
  { label: "Order Details", path: "/dashboard/artisan/order-details", icon: FiFileText },
  { label: "Earnings", path: "/dashboard/artisan/earnings", icon: FiDollarSign },
  { label: "Analytics", path: "/dashboard/artisan/analytics", icon: FiBarChart2 },
  { label: "Custom Orders", path: "/dashboard/artisan/custom-orders", icon: FiStar },
  { label: "Messages", path: "/dashboard/artisan/messages", icon: FiMessageSquare },
];

const adminLinks = [
  { label: "Dashboard", path: "/dashboard/admin", icon: FiHome, end: true },
  { label: "User Management", path: "/dashboard/admin/users", icon: FiUsers },
  { label: "Product Management", path: "/dashboard/admin/products", icon: FiGrid },
  { label: "Order Management", path: "/dashboard/admin/orders", icon: FiPackage },
  { label: "Revenue", path: "/dashboard/admin/revenue", icon: FiDollarSign },
  { label: "Reports & Analytics", path: "/dashboard/admin/reports", icon: FiBarChart2 },
  { label: "Complaints", path: "/dashboard/admin/complaints", icon: FiAlertCircle },
  { label: "Settings", path: "/dashboard/admin/settings", icon: FiSettings },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const links =
    user?.role === "admin" ? adminLinks
    : user?.role === "artisan" ? artisanLinks
    : customerLinks;

  const roleLabel =
    user?.role === "admin" ? "Admin Panel"
    : user?.role === "artisan" ? "Artisan Studio"
    : "My Account";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavItem = ({ label, path, icon: Icon, end, onClickMobile }: {
    label: string; path: string; icon: React.ElementType; end?: boolean; onClickMobile?: () => void;
  }) => (
    <NavLink
      to={path}
      end={end}
      onClick={onClickMobile}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-2xl transition-all duration-200 relative group",
          collapsed ? "justify-center px-3 py-3" : "px-4 py-3",
          isActive
            ? "bg-gradient-to-r from-primary/25 to-secondary/20 text-primary-700 font-semibold shadow-soft"
            : "text-gray-500 hover:bg-pink-50 hover:text-primary-700"
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full"
            />
          )}
          <Icon className={cn("flex-shrink-0 transition-transform group-hover:scale-110", collapsed ? "w-5 h-5" : "w-4 h-4", isActive ? "text-primary-600" : "")} />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap overflow-hidden"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
          {/* Tooltip when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
              {label}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          )}
        </>
      )}
    </NavLink>
  );

  const SidebarInner = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand */}
      <div className={cn(
        "flex items-center border-b border-pink-100 flex-shrink-0 transition-all duration-300",
        collapsed && !mobile ? "justify-center px-3 py-4" : "gap-3 px-4 py-4"
      )}>
        <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
          <span className="text-white font-display font-bold text-lg">A</span>
        </div>
        <AnimatePresence initial={false}>
          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className="font-display text-base font-bold text-gradient block whitespace-nowrap">AngelCrafts</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{roleLabel}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Info */}
      <div className={cn(
        "border-b border-pink-100 flex-shrink-0 transition-all duration-300",
        collapsed && !mobile ? "flex justify-center py-4 px-3" : "px-4 py-4"
      )}>
        <div className={cn("flex items-center", collapsed && !mobile ? "justify-center" : "gap-3")}>
          {user?.avatar ? (
            <img src={user.avatar} alt={user?.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 ring-2 ring-pink-100" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {getInitials(user?.name || "U")}
            </div>
          )}
          <AnimatePresence initial={false}>
            {(!collapsed || mobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 overflow-hidden"
              >
                <p className="text-sm font-semibold text-gray-800 truncate whitespace-nowrap">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize whitespace-nowrap">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5 scrollbar-hide">
        {links.map(({ label, path, icon, end }) => (
          <NavItem key={path} label={label} path={path} icon={icon} end={end} onClickMobile={mobile ? () => setMobileOpen(false) : undefined} />
        ))}
      </nav>

      {/* Footer */}
      <div className={cn("border-t border-pink-100 flex-shrink-0 px-2 py-2 space-y-0.5")}>
        <NavLink
          to="/"
          title={collapsed ? "Back to Home" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-2xl text-gray-500 hover:bg-pink-50 hover:text-primary-700 transition-all group relative",
            collapsed && !mobile ? "justify-center px-3 py-3" : "px-4 py-3"
          )}
        >
          <FiHome className={cn("flex-shrink-0 group-hover:scale-110 transition-transform", collapsed && !mobile ? "w-5 h-5" : "w-4 h-4")} />
          <AnimatePresence initial={false}>
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap overflow-hidden"
              >
                Back to Home
              </motion.span>
            )}
          </AnimatePresence>
          {collapsed && !mobile && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
              Back to Home
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setLogoutModal(true)}
          title={collapsed && !mobile ? "Logout" : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all group relative",
            collapsed && !mobile ? "justify-center px-3 py-3" : "px-4 py-3"
          )}
        >
          <FiLogOut className={cn("flex-shrink-0 group-hover:scale-110 transition-transform", collapsed && !mobile ? "w-5 h-5" : "w-4 h-4")} />
          <AnimatePresence initial={false}>
            {(!collapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
          {collapsed && !mobile && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
              Logout
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-cream-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col bg-white border-r border-pink-100 shadow-soft flex-shrink-0 relative overflow-hidden"
      >
        <SidebarInner />
        {/* Collapse Toggle Button */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white border-2 border-pink-200 shadow-soft flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-colors z-20"
        >
          <FiChevronLeft className="w-3 h-3 text-gray-500" />
        </motion.button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white shadow-glass-lg lg:hidden"
            >
              <SidebarInner mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-pink-100 shadow-sm">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-display font-bold text-gradient">{roleLabel}</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      <ConfirmModal
        isOpen={logoutModal}
        title="Sign Out?"
        message="Are you sure you want to sign out of AngelCrafts?"
        confirmLabel="Sign Out"
        danger
        onConfirm={handleLogout}
        onCancel={() => setLogoutModal(false)}
      />
    </div>
  );
}
