import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingBag, FiHeart, FiUser } from "react-icons/fi";
import { NAV_LINKS } from "@/constants";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { authLib } from "@/lib/auth";
import { getInitials } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
              <span className="text-white font-display font-bold text-lg">A</span>
            </div>
            <span className="font-display text-xl font-bold text-gradient hidden sm:block">AngelCrafts</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-primary/20 text-primary-700"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard/customer" className="relative p-2 rounded-xl hover:bg-primary/10 transition-colors">
                  <FiShoppingBag className="w-5 h-5 text-gray-600" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1 rounded-2xl hover:bg-primary/10 transition-colors"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(user?.name || "U")}
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">{user?.name}</span>
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-glass-lg border border-pink-100 overflow-hidden"
                      >
                        <Link to={authLib.getDashboardPath(user!.role)} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-primary/10">
                          <FiUser className="w-4 h-4" /> Dashboard
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-700 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              {isOpen ? <FiX className="w-6 h-6 text-gray-700" /> : <FiMenu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-pink-100"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm ${
                    location.pathname === link.path
                      ? "bg-primary/20 text-primary-700"
                      : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-3 pt-2">
                  <Link to="/login" className="flex-1 text-center py-3 border-2 border-primary rounded-xl text-primary-700 font-medium text-sm">
                    Sign In
                  </Link>
                  <Link to="/register" className="flex-1 text-center py-3 btn-primary text-sm">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
