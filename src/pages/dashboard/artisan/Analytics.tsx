import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const salesData = [
  { month: "Jan", sales: 24 }, { month: "Feb", sales: 31 }, { month: "Mar", sales: 45 },
  { month: "Apr", sales: 38 }, { month: "May", sales: 52 }, { month: "Jun", sales: 47 },
];

const categoryData = [
  { name: "Jewelry", value: 45 }, { name: "Home Decor", value: 25 },
  { name: "Art Prints", value: 20 }, { name: "Others", value: 10 },
];

const COLORS = ["#F9A8D4", "#C4B5FD", "#FBBF24", "#86EFAC"];

const topProducts = [
  { name: "Rose Quartz Necklace", sales: 47, revenue: 2256 },
  { name: "Crystal Earrings", sales: 38, revenue: 1444 },
  { name: "Gold Leaf Ring", sales: 29, revenue: 986 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-sm text-gray-500">Track your shop performance</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: "8,420", change: "+12%" },
          { label: "Conversion Rate", value: "3.8%", change: "+0.4%" },
          { label: "Avg. Order Value", value: "$54", change: "+$6" },
          { label: "Repeat Buyers", value: "34%", change: "+5%" },
        ].map(({ label, value, change }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{change} vs last month</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="font-display text-base font-bold text-gray-800 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid #F9A8D4", borderRadius: "12px", fontSize: 11 }} />
              <Bar dataKey="sales" fill="#C4B5FD" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-display text-base font-bold text-gray-800 mb-4">Sales by Category</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {categoryData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ borderRadius: "10px", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-gray-600">{item.name} <span className="font-semibold">{item.value}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="font-display text-base font-bold text-gray-800 mb-4">Top Products</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4 p-3 bg-pink-50/50 rounded-2xl">
              <span className="w-7 h-7 rounded-xl bg-gradient-primary text-white text-xs font-bold flex items-center justify-center">{i+1}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                <div className="w-full bg-pink-100 rounded-full h-1.5 mt-1">
                  <div className="h-1.5 rounded-full bg-gradient-primary" style={{ width: `${(p.sales / 50) * 100}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary-600">${p.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{p.sales} sales</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
