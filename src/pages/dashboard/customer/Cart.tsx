import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore();
  const { toasts, addToast, removeToast } = useToast();

  const handleRemove = (productId: string, title: string) => {
    removeFromCart(productId);
    addToast(`${title} removed from cart`, "info");
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">My Cart</h1>
        <p className="text-sm text-gray-500">{items.length} {items.length === 1 ? "item" : "items"} in your cart</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="font-display text-xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 text-sm mb-6">Discover unique handmade products from talented artisans.</p>
          <Link to="/dashboard/customer/browse" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                  className="glass-card p-5 flex items-center gap-4"
                >
                  <img src={item.product.images[0]} alt={item.product.title} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.product.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.product.artisanName}</p>
                    <p className="text-primary-600 font-bold mt-1">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <FiMinus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <FiPlus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-bold text-gray-800">{formatPrice(item.product.price * item.quantity)}</p>
                    <button onClick={() => handleRemove(item.product.id, item.product.title)} className="mt-1 text-red-400 hover:text-red-600 transition-colors">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="glass-card p-6 h-fit sticky top-6">
            <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Order Summary</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span><span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span><span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (8%)</span><span>{formatPrice(getTotal() * 0.08)}</span>
              </div>
              <div className="h-px bg-pink-100" />
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span><span className="text-primary-600 text-lg">{formatPrice(getTotal() * 1.08)}</span>
              </div>
            </div>
            <Link to="/dashboard/customer/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
              Proceed to Checkout <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard/customer/browse" className="mt-3 w-full flex items-center justify-center gap-2 py-3 text-sm text-primary-600 font-medium hover:underline">
              <FiShoppingBag className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
