import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCartStore();
  const { toasts, addToast, removeToast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    addToast(`${product.title} added to cart! 🛍️`);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">My Wishlist</h1>
        <p className="text-sm text-gray-500">{wishlist.length} saved items</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="font-display text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 text-sm mb-6">Save products you love by clicking the heart icon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <button
                  onClick={() => { toggleWishlist(product); addToast("Removed from wishlist", "info"); }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
                >
                  <FiHeart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm text-gray-800 truncate mb-1">{product.title}</p>
                <p className="text-xs text-gray-400 mb-2">{product.artisanName}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary-600">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary-700 text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    <FiShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
