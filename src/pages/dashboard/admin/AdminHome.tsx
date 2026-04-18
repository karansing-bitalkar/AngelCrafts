import { motion } from "framer-motion";
import { FiUsers, FiPackage, FiDollarSign, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12400 }, { month: "Feb", revenue: 15200 }, { month: "Mar", revenue: 18700 },
  { month: "Apr", revenue: 16300 }, { month: "May", revenue: 21500 }, { month: "Jun", revenue: 19800 },
];

export default function AdminHome() {
  const stats = [
    { label: "Total Users", value: "62,418", icon: FiUsers, change: "+1,240 this month", color: "text-blue-600", bg: "bg-blue-50", link: "/dashboard/admin/users" },
    { label: "Active Products", value: "184,296", icon: FiPackage, change: "+3,847 this month", color: "text-purple-600", bg: "bg-purple-50", link: "/dashboard/admin/products" },
    { label: "Monthly Revenue", value: "$21,500", icon: FiDollarSign, change: "+8.4% vs last month", color: "text-green-600", bg: "bg-green-50", link: "/dashboard/admin/revenue" },
    { label: "Open Complaints", value: "24", icon: FiAlertCircle, change: "12 resolved today", color: "text-red-500", bg: "bg-red-50", link: "/dashboard/admin/complaints" },
  ];

  const recentActivity = [
    { text: "New artisan 'Bloom Studio' registered", time: "5m ago", color: "bg-purple-100 text-purple-600" },
    { text: "Product 'Macrame Set' flagged for review", time: "12m ago", color: "bg-amber-100 text-amber-600" },
    { text: "Order ORD-2891 marked as delivered", time: "25m ago", color: "bg-green-100 text-green-600" },
    { text: "Complaint #C-045 resolved by support", time: "1h ago", color: "bg-blue-100 text-blue-600" },
    { text: "New customer signed up from India", time: "1.5h ago", color: "bg-pink-100 text-pink-600" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <h1 className="font-display text-2xl font-bold text-gray-800 mb-1">Admin Dashboard ⚡</h1>
        <p className="text-sm text-gray-500">Platform overview — April 2025</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, change, color, bg, link }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link to={link} className={`block glass-card p-5 ${bg} hover:shadow-glass-lg transition-all hover:-translate-y-1`}>
              <Icon className={`w-5 h-5 ${color} mb-3`} />
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-600 font-medium">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{change}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "12px", fontSize: 11 }} />
              <Bar dataKey="revenue" fill="#C4B5FD" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color.split(" ")[0]}`} />
                <p className="text-sm text-gray-700 flex-1">{item.text}</p>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
