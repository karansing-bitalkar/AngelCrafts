import { motion } from "framer-motion";
import { FiDollarSign, FiTrendingUp, FiDownload } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { formatPrice } from "@/lib/utils";

const revenueData = [
  { month: "Jan", revenue: 12400, commission: 1860 },
  { month: "Feb", revenue: 15200, commission: 2280 },
  { month: "Mar", revenue: 18700, commission: 2805 },
  { month: "Apr", revenue: 21500, commission: 3225 },
];

const COLORS = ["#F9A8D4", "#C4B5FD", "#FBBF24", "#86EFAC"];
const sourceData = [{ name: "Jewelry", value: 38 }, { name: "Home Decor", value: 28 }, { name: "Art", value: 20 }, { name: "Others", value: 14 }];

export default function Revenue() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">Revenue</h1>
          <p className="text-sm text-gray-500">Platform earnings overview</p>
        </div>
        <button className="btn-secondary flex items-center gap-2 text-sm">
          <FiDownload className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$67,800", change: "+22%", positive: true },
          { label: "Platform Commission", value: "$10,170", change: "+18%", positive: true },
          { label: "Artisan Payouts", value: "$57,630", change: "+23%", positive: true },
          { label: "Avg. Order Value", value: "$54", change: "+$6", positive: true },
        ].map(({ label, value, change, positive }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <FiDollarSign className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xs font-medium mt-1 ${positive ? "text-green-600" : "text-red-500"}`}>{change} vs last period</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-display text-base font-bold text-gray-800 mb-4">Monthly Revenue vs Commission</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any, n: string) => [`$${v.toLocaleString()}`, n === "revenue" ? "Gross Revenue" : "Commission"]} contentStyle={{ borderRadius: "12px", fontSize: 11 }} />
              <Bar dataKey="revenue" fill="#C4B5FD" radius={[4, 4, 0, 0]} />
              <Bar dataKey="commission" fill="#F9A8D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-display text-base font-bold text-gray-800 mb-4">Revenue by Category</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ borderRadius: "10px", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {sourceData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-gray-600">{item.name} <span className="font-semibold">{item.value}%</span></span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
