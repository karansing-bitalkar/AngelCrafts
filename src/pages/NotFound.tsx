import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-8xl mb-6">🧶</div>
        <h1 className="font-display text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! This page seems to have unraveled. The handmade magic you're looking for might have moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <FiHome className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/marketplace" className="btn-secondary flex items-center justify-center gap-2">
            <FiArrowLeft className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
