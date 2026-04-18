import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiHeart, FiStar, FiTruck, FiArrowRight } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { SAMPLE_PRODUCTS } from "@/constants";
import { formatPrice } from "@/lib/utils";

export default function CustomerHome() {
  const { user } = useAuthStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useCartStore((s) => s.wishlist.length);

  const stats = [
    { label: "Items in Cart", value: itemCount, icon: FiShoppingBag, color: "from-pink-100 to-rose-100", textColor: "text-rose-600" },
    { label: "Wishlist Items", value: wishlistCount, icon: FiHeart, color: "from-purple-100 to-violet-100", textColor: "text-violet-600" },
    { label: "Orders Placed", value: 3, icon: FiTruck, color: "from-amber-100 to-yellow-100", textColor: "text-amber-600" },
    { label: "Reviews Given", value: 7, icon: FiStar, color: "from-emerald-100 to-teal-100", textColor: "text-emerald-600" },
  ];

  const recentOrders = [
    { id: "ORD-001", item: "Rose Quartz Crystal Necklace", status: "Delivered", date: "Apr 10", price: 48, img: SAMPLE_PRODUCTS[0].images[0] },
    { id: "ORD-002", item: "Macrame Wall Hanging", status: "Shipped", date: "Apr 14", price: 72, img: SAMPLE_PRODUCTS[1].images[0] },
    { id: "ORD-003", item: "Lavender Soy Candle Set", status: "Processing", date: "Apr 16", price: 34, img: SAMPLE_PRODUCTS[2].images[0] },
  ];

  const statusColors: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center gap-4">
          {user?.avatar && <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover" />}
          <div>
            <p className="text-sm text-gray-500">Welcome back,</p>
            <h1 className="font-display text-2xl font-bold text-gray-800">{user?.name} 👋</h1>
            <p className="text-sm text-gray-500">Discover new handmade treasures today</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, textColor }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`glass-card p-5 bg-gradient-to-br ${color}`}>
            <Icon className={`w-6 h-6 ${textColor} mb-3`} />
            <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
            <p className="text-xs text-gray-600 font-medium">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-gray-800">Recent Orders</h2>
          <Link to="/dashboard/customer/orders" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-3 bg-pink-50/50 rounded-2xl">
              <img src={order.img} alt={order.item} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{order.item}</p>
                <p className="text-xs text-gray-400">{order.id} · {order.date}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${statusColors[order.status]}`}>{order.status}</span>
              <span className="text-sm font-bold text-primary-600 flex-shrink-0">{formatPrice(order.price)}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommended */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-gray-800">Recommended for You</h2>
          <Link to="/dashboard/customer/browse" className="text-sm text-primary-600 font-medium flex items-center gap-1">Browse all <FiArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SAMPLE_PRODUCTS.slice(0, 4).map((p) => (
            <Link key={p.id} to="/dashboard/customer/browse" className="group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-xs font-semibold text-gray-800 truncate">{p.title}</p>
              <p className="text-xs text-primary-600 font-bold">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
