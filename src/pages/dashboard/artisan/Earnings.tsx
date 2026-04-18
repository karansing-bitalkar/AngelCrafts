import { motion } from "framer-motion";
import { FiDollarSign, FiTrendingUp, FiDownload } from "react-icons/fi";
import { formatPrice } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Oct", earned: 820 }, { month: "Nov", earned: 1240 }, { month: "Dec", earned: 2100 },
  { month: "Jan", earned: 1680 }, { month: "Feb", earned: 1920 }, { month: "Mar", earned: 2450 },
  { month: "Apr", earned: 1890 },
];

const transactions = [
  { id: "PAY-001", order: "ORD-091", amount: 40.8, date: "Apr 14", status: "Paid" },
  { id: "PAY-002", order: "ORD-092", amount: 61.2, date: "Apr 15", status: "Paid" },
  { id: "PAY-003", order: "ORD-090", amount: 46.75, date: "Apr 10", status: "Paid" },
  { id: "PAY-004", order: "ORD-094", amount: 32.3, date: "Apr 16", status: "Pending" },
];

export default function Earnings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">Earnings</h1>
          <p className="text-sm text-gray-500">Your financial overview</p>
        </div>
        <button className="btn-secondary flex items-center gap-2 text-sm">
          <FiDownload className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Earned", value: "$4,280", color: "text-green-600", bg: "bg-green-50" },
          { label: "This Month", value: "$1,890", color: "text-primary-600", bg: "bg-pink-50" },
          { label: "Pending Payout", value: "$320", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Platform Fees", value: "$642", color: "text-red-500", bg: "bg-red-50" },
        ].map(({ label, value, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`glass-card p-5 ${bg}`}>
            <FiDollarSign className={`w-5 h-5 ${color} mb-2`} />
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F9A8D4" strokeOpacity={0.3} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v: any) => [`$${v}`, "Earned"]} contentStyle={{ background: "white", border: "1px solid #F9A8D4", borderRadius: "12px", fontSize: 12 }} />
            <Line type="monotone" dataKey="earned" stroke="#F9A8D4" strokeWidth={3} dot={{ fill: "#C4B5FD", strokeWidth: 2, r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="font-display text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 bg-pink-50/50 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <FiTrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{t.id}</p>
                <p className="text-xs text-gray-400">Order {t.order} · {t.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${t.status === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{t.status}</span>
              <span className="font-bold text-gray-800">{formatPrice(t.amount)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
