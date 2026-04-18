import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiX, FiUser, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  action?: string; // e.g. "add items to cart", "save to wishlist"
}

export default function AuthGateModal({ isOpen, onClose, action = "continue" }: AuthGateModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-glass-lg overflow-hidden"
          >
            {/* Pink gradient top strip */}
            <div className="h-1.5 w-full bg-gradient-primary" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all"
            >
              <FiX className="w-4 h-4" />
            </button>

            <div className="px-7 py-8 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-5"
              >
                <FiLock className="w-8 h-8 text-primary-600" />
              </motion.div>

              <h3 className="font-display text-xl font-bold text-gray-800 mb-2">
                Login Required
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Please login or create an account to {action}. Join thousands of shoppers on AngelCrafts!
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-primary text-white font-semibold text-sm shadow-soft hover:shadow-glass transition-all hover:scale-[1.02]"
                >
                  <FiUser className="w-4 h-4" />
                  Login to Your Account
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-primary/30 text-primary-700 font-semibold text-sm hover:bg-primary/5 hover:border-primary/50 transition-all"
                >
                  <FiUserPlus className="w-4 h-4" />
                  Create Free Account
                </button>
                <button
                  onClick={onClose}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                >
                  Continue browsing
                </button>
              </div>
            </div>

            {/* Footer note */}
            <div className="px-7 pb-5 text-center">
              <p className="text-xs text-gray-400">
                🔒 Your data is secure · No spam · Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
