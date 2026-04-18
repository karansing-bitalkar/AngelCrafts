import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiMessageSquare } from "react-icons/fi";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import { formatPrice } from "@/lib/utils";

const customOrders = [
  { id: "CO-001", customer: "Olivia K.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces", request: "Custom rose gold name necklace with birthstone — emerald, 16 inch chain, script font", budget: 75, status: "pending", date: "Apr 17, 2025" },
  { id: "CO-002", customer: "Sophie L.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces", request: "Personalized macrame wall piece with our wedding date, 24×36 inches, natural cotton", budget: 120, status: "negotiating", date: "Apr 16, 2025" },
  { id: "CO-003", customer: "Rachel M.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=faces", request: "Set of 4 hand-painted ceramic mugs, matching floral design, dishwasher safe", budget: 90, status: "accepted", date: "Apr 14, 2025" },
];

export default function CustomOrders() {
  const [orders, setOrders] = useState(customOrders);
  const { toasts, addToast, removeToast } = useToast();

  const handleAction = (id: string, action: "accepted" | "declined") => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: action } : o));
    addToast(action === "accepted" ? "Custom order accepted! ✅" : "Order declined.", action === "accepted" ? "success" : "info");
  };

  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    negotiating: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Custom Orders</h1>
        <p className="text-sm text-gray-500">{orders.filter((o) => o.status === "pending").length} pending requests</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="flex items-start gap-4">
              <img src={order.avatar} alt={order.customer} className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{order.customer}</p>
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold capitalize ${statusColor[order.status]}`}>{order.status}</span>
                  </div>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{order.request}</p>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className="text-sm font-bold text-primary-600">Budget: {formatPrice(order.budget)}</span>
                  {order.status === "pending" && (
                    <div className="flex gap-2">
                      <button onClick={() => handleAction(order.id, "declined")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors">
                        <FiX className="w-3.5 h-3.5" /> Decline
                      </button>
                      <button onClick={() => handleAction(order.id, "accepted")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                        <FiCheck className="w-3.5 h-3.5" /> Accept
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary-700 text-xs font-semibold hover:bg-primary/20 transition-colors">
                        <FiMessageSquare className="w-3.5 h-3.5" /> Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
