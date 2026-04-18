import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiDollarSign, FiPackage, FiStar, FiUsers, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { SAMPLE_PRODUCTS } from "@/constants";
import { formatPrice } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const weekData = [
  { day: "Mon", sales: 4 }, { day: "Tue", sales: 7 }, { day: "Wed", sales: 3 },
  { day: "Thu", sales: 9 }, { day: "Fri", sales: 12 }, { day: "Sat", sales: 15 }, { day: "Sun", sales: 8 },
];

export default function ArtisanHome() {
  const { user } = useAuthStore();
  const stats = [
    { label: "Total Revenue", value: "$4,280", icon: FiDollarSign, change: "+18%", color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Orders", value: "12", icon: FiPackage, change: "+3", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Avg. Rating", value: "4.8 ★", icon: FiStar, change: "+0.2", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Customers", value: "184", icon: FiUsers, change: "+22", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentOrders = [
    { id: "ORD-091", customer: "Emma J.", product: "Rose Quartz Necklace", amount: 48, status: "Shipped" },
    { id: "ORD-092", customer: "Lily P.", product: "Macrame Wall Art", amount: 72, status: "Processing" },
    { id: "ORD-093", customer: "Aria M.", product: "Crystal Earrings", amount: 38, status: "Delivered" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center gap-4">
          {user?.avatar && <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover" />}
          <div>
            <p className="text-sm text-gray-500">Welcome to your studio,</p>
            <h1 className="font-display text-2xl font-bold text-gray-800">{user?.shopName || user?.name} 🎨</h1>
            <p className="text-sm text-gray-500">You have 12 pending orders today</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, change, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{change} this week</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-gray-800">Weekly Sales</h2>
          <span className="tag-badge text-xs">This Week</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.3} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "white", border: "1px solid #F9A8D4", borderRadius: "12px", fontSize: 12 }} />
            <Bar dataKey="sales" fill="#F9A8D4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-gray-800">Recent Orders</h2>
          <Link to="/dashboard/artisan/orders" className="text-sm text-primary-600 font-medium flex items-center gap-1">View all <FiArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center gap-3 p-3 bg-pink-50/40 rounded-2xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{o.product}</p>
                <p className="text-xs text-gray-400">{o.id} · {o.customer}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${o.status === "Delivered" ? "bg-green-100 text-green-700" : o.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{o.status}</span>
              <span className="font-bold text-primary-600 text-sm">{formatPrice(o.amount)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
