import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheck, FiUser, FiMapPin, FiMessageSquare } from "react-icons/fi";
import { formatPrice } from "@/lib/utils";
import { SAMPLE_PRODUCTS } from "@/constants";

export default function ArtisanOrderDetails() {
  const order = {
    id: "ORD-091", customer: "Emma Johnson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    product: SAMPLE_PRODUCTS[0], qty: 1, amount: 48, status: "shipped",
    address: "456 Rose Lane, Brooklyn, NY 11201", tracking: "TRK-4572", date: "Apr 14, 2025",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Order Details</h1>
        <p className="text-sm text-gray-500">{order.id}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">
          {/* Product */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-4">Ordered Item</h3>
            <div className="flex gap-4">
              <img src={order.product.images[0]} alt={order.product.title} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{order.product.title}</p>
                <p className="text-sm text-gray-400">Qty: {order.qty}</p>
                <p className="font-bold text-primary-600 mt-1">{formatPrice(order.amount)}</p>
              </div>
            </div>
          </motion.div>

          {/* Status Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {["Confirm", "Mark Processing", "Mark Shipped", "Mark Delivered"].map((action) => (
                <button key={action} className="px-4 py-2 rounded-xl bg-primary/10 text-primary-700 text-sm font-semibold hover:bg-primary/20 transition-colors">
                  {action}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {/* Customer */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-4 flex items-center gap-2"><FiUser className="w-4 h-4 text-primary-500" /> Customer</h3>
            <div className="flex items-center gap-3 mb-3">
              <img src={order.avatar} alt={order.customer} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-sm text-gray-800">{order.customer}</p>
                <p className="text-xs text-gray-400">{order.email}</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-50 text-purple-700 text-sm font-semibold hover:bg-purple-100 transition-colors">
              <FiMessageSquare className="w-4 h-4" /> Send Message
            </button>
          </motion.div>

          {/* Address */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-3 flex items-center gap-2"><FiMapPin className="w-4 h-4 text-primary-500" /> Shipping Address</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{order.address}</p>
            {order.tracking && <p className="text-xs text-gray-400 mt-2">Tracking: <span className="font-medium">{order.tracking}</span></p>}
          </motion.div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-3">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Item total</span><span>{formatPrice(order.amount)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Platform fee (15%)</span><span className="text-red-500">-{formatPrice(order.amount * 0.15)}</span></div>
              <div className="h-px bg-pink-100" />
              <div className="flex justify-between font-bold text-gray-800"><span>Your earnings</span><span className="text-green-600">{formatPrice(order.amount * 0.85)}</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
