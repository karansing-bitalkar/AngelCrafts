import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

const orders = [
  { id: "ORD-091", customer: "Emma J.", product: "Rose Quartz Necklace", amount: 48, status: "shipped", date: "Apr 14", qty: 1 },
  { id: "ORD-092", customer: "Lily P.", product: "Macrame Wall Art", amount: 72, status: "processing", date: "Apr 15", qty: 1 },
  { id: "ORD-093", customer: "Aria M.", product: "Crystal Earrings Set", amount: 38, status: "delivered", date: "Apr 10", qty: 2 },
  { id: "ORD-094", customer: "Zoe W.", product: "Watercolor Print", amount: 55, status: "pending", date: "Apr 17", qty: 1 },
  { id: "ORD-095", customer: "Maya R.", product: "Soy Candle Bundle", amount: 68, status: "confirmed", date: "Apr 16", qty: 2 },
];

const statusColor: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export default function ArtisanOrders() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-500">{orders.length} total orders</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "pending", "processing", "shipped", "delivered"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === s ? "bg-primary/20 text-primary-700" : "bg-white border border-pink-100 text-gray-600 hover:bg-pink-50"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-gray-800">{order.id}</span>
                  <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold capitalize ${statusColor[order.status]}`}>{order.status}</span>
                </div>
                <p className="text-sm text-gray-600">{order.product} × {order.qty}</p>
                <p className="text-xs text-gray-400">Customer: {order.customer} · {order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-primary-600">{formatPrice(order.amount)}</span>
                <Link to="/dashboard/artisan/order-details" className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary-700 text-xs font-semibold hover:bg-primary/20 transition-colors">
                  View
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
