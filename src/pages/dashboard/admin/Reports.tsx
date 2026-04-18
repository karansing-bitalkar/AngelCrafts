import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiDownload, FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign,
} from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";

/* ─── Mock Data ─────────────────────────────────────────── */
const revenueData = [
  { month: "Oct", revenue: 18400, target: 16000 },
  { month: "Nov", revenue: 22700, target: 20000 },
  { month: "Dec", revenue: 38900, target: 30000 },
  { month: "Jan", revenue: 29300, target: 28000 },
  { month: "Feb", revenue: 41200, target: 36000 },
  { month: "Mar", revenue: 55800, target: 48000 },
  { month: "Apr", revenue: 63400, target: 58000 },
];

const categoryData = [
  { name: "Jewelry", value: 32, color: "#F9A8D4" },
  { name: "Home Decor", value: 22, color: "#C4B5FD" },
  { name: "Art & Prints", value: 16, color: "#FBBF24" },
  { name: "Candles", value: 12, color: "#6EE7B7" },
  { name: "Ceramics", value: 9, color: "#93C5FD" },
  { name: "Textiles", value: 9, color: "#FCA5A5" },
];

const userGrowthData = [
  { month: "Oct", customers: 5200, artisans: 420 },
  { month: "Nov", customers: 7800, artisans: 580 },
  { month: "Dec", customers: 12400, artisans: 840 },
  { month: "Jan", customers: 18600, artisans: 1140 },
  { month: "Feb", customers: 28300, artisans: 1560 },
  { month: "Mar", customers: 41200, artisans: 2180 },
  { month: "Apr", customers: 52418, artisans: 3940 },
];

const topProductsData = [
  { name: "Crystal Necklaces", sales: 842 },
  { name: "Macrame Art", sales: 634 },
  { name: "Soy Candle Sets", sales: 598 },
  { name: "Watercolor Prints", sales: 471 },
  { name: "Ceramic Mugs", sales: 382 },
  { name: "Woven Blankets", sales: 298 },
];

/* ─── Custom Tooltip ─────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-pink-100 rounded-2xl shadow-glass px-4 py-3 text-xs">
      <p className="font-semibold text-gray-700 mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-bold text-gray-800">
            {p.name?.toLowerCase().includes("revenue") || p.name?.toLowerCase().includes("target")
              ? `$${p.value.toLocaleString()}`
              : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-pink-100 rounded-xl shadow-glass px-3 py-2 text-xs">
      <p className="font-semibold text-gray-800">{payload[0].name}</p>
      <p className="text-gray-500">{payload[0].value}% of sales</p>
    </div>
  );
};

/* ─── Animated Number ────────────────────────────────────── */
const TABS = ["Revenue", "Users", "Categories", "Products"] as const;
type Tab = (typeof TABS)[number];

export default function Reports() {
  const [activeTab, setActiveTab] = useState<Tab>("Revenue");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Platform performance · April 2025</p>
        </div>
        <button className="btn-secondary flex items-center gap-2 text-sm">
          <FiDownload className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$269,700", sub: "+22% vs last month", icon: FiDollarSign, color: "text-green-600", bg: "from-green-50 to-emerald-50" },
          { label: "New Users", value: "11,218", sub: "+31% vs last month", icon: FiUsers, color: "text-blue-600", bg: "from-blue-50 to-sky-50" },
          { label: "Orders Placed", value: "5,920", sub: "+27% vs last month", icon: FiShoppingBag, color: "text-amber-600", bg: "from-amber-50 to-yellow-50" },
          { label: "Artisan Growth", value: "+760", sub: "+38% vs last month", icon: FiTrendingUp, color: "text-purple-600", bg: "from-purple-50 to-violet-50" },
        ].map(({ label, value, sub, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`glass-card p-5 bg-gradient-to-br ${bg}`}
          >
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-pink-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium transition-all relative ${
              activeTab === tab ? "text-primary-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="reportTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Revenue Chart ───────────────────────────────────────── */}
      {activeTab === "Revenue" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display text-lg font-bold text-gray-800">Monthly Revenue vs Target</h3>
                <p className="text-xs text-gray-400 mt-0.5">Oct 2024 – Apr 2025</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                {[{ c: "#F9A8D4", l: "Revenue" }, { c: "#C4B5FD", l: "Target" }].map(({ c, l }) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ background: c }} />
                    <span className="text-gray-500">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F9A8D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F9A8D4" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4B5FD" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C4B5FD" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.25} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#F9A8D4" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ r: 4, fill: "#F9A8D4", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Area type="monotone" dataKey="target" name="Target" stroke="#C4B5FD" strokeWidth={2} strokeDasharray="5 4" fill="url(#targetGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by month mini-table */}
          <div className="glass-card overflow-hidden">
            <div className="px-5 py-4 border-b border-pink-100">
              <h3 className="font-display font-bold text-gray-800">Monthly Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-50/50">
                    {["Month", "Revenue", "Target", "Vs Target"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50">
                  {revenueData.map((row) => {
                    const diff = ((row.revenue - row.target) / row.target) * 100;
                    return (
                      <tr key={row.month} className="hover:bg-pink-50/30 transition-colors">
                        <td className="px-5 py-3 font-semibold text-gray-700">{row.month}</td>
                        <td className="px-5 py-3 font-bold text-primary-600">${row.revenue.toLocaleString()}</td>
                        <td className="px-5 py-3 text-gray-500">${row.target.toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${diff >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {diff >= 0 ? "+" : ""}{diff.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── User Growth Chart ───────────────────────────────────── */}
      {activeTab === "Users" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display text-lg font-bold text-gray-800">User Growth by Month</h3>
                <p className="text-xs text-gray-400 mt-0.5">Customers vs Artisans</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                {[{ c: "#F9A8D4", l: "Customers" }, { c: "#C4B5FD", l: "Artisans" }].map(({ c, l }) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ background: c }} />
                    <span className="text-gray-500">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={userGrowthData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.2} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(249,168,212,0.07)" }} />
                <Bar dataKey="customers" name="Customers" fill="#F9A8D4" radius={[6, 6, 0, 0]} maxBarSize={40} />
                <Bar dataKey="artisans" name="Artisans" fill="#C4B5FD" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Users", value: "52,418", color: "text-pink-600 bg-pink-50" },
              { label: "Active Artisans", value: "3,940", color: "text-purple-600 bg-purple-50" },
              { label: "New This Month", value: "11,218", color: "text-blue-600 bg-blue-50" },
              { label: "Churn Rate", value: "2.4%", color: "text-red-500 bg-red-50" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`rounded-2xl p-4 ${color}`}>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Category Pie Chart ──────────────────────────────────── */}
      {activeTab === "Categories" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-6">
            <div className="mb-5">
              <h3 className="font-display text-lg font-bold text-gray-800">Sales by Product Category</h3>
              <p className="text-xs text-gray-400 mt-0.5">Share of total revenue, April 2025</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ResponsiveContainer width="100%" height={280} className="md:max-w-xs">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend Table */}
              <div className="flex-1 w-full space-y-2.5">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    <span className="text-sm text-gray-700 flex-1">{cat.name}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.value}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 w-10 text-right">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Top Products Bar Chart ──────────────────────────────── */}
      {activeTab === "Products" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-6">
            <div className="mb-5">
              <h3 className="font-display text-lg font-bold text-gray-800">Top Selling Product Categories</h3>
              <p className="text-xs text-gray-400 mt-0.5">Total units sold, April 2025</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topProductsData} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.2} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} width={120} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(249,168,212,0.07)" }} />
                <Bar dataKey="sales" name="Units Sold" radius={[0, 8, 8, 0]} maxBarSize={28}>
                  {topProductsData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#F9A8D4", "#C4B5FD", "#FBBF24", "#6EE7B7", "#93C5FD", "#FCA5A5"][i % 6]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Products", value: "4,280" },
              { label: "Avg Rating", value: "4.73 ⭐" },
              { label: "Out of Stock", value: "127" },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-4 text-center">
                <p className="font-display text-xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
