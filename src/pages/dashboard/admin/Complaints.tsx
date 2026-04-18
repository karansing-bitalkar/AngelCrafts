import { useState } from "react";
import { motion } from "framer-motion";
import { FiAlertCircle, FiCheck, FiX, FiMessageSquare } from "react-icons/fi";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";

const complaints = [
  { id: "C-045", user: "Emma Johnson", against: "Clay Canvas", type: "Product Quality", desc: "Received a cracked ceramic mug, different from photos.", status: "open", date: "Apr 15", priority: "high" },
  { id: "C-044", user: "Lily Parker", against: "Glow & Scent Co", type: "Late Delivery", desc: "Order 3 weeks late, no communication from artisan.", status: "open", date: "Apr 14", priority: "medium" },
  { id: "C-043", user: "Aria Martinez", against: "Woven Wonders", type: "Wrong Item", desc: "Received wrong color blanket, requested refund.", status: "resolved", date: "Apr 10", priority: "low" },
  { id: "C-042", user: "Sophie Wilson", against: "Luna Craft", type: "Refund Issue", desc: "Return processed but refund not received after 2 weeks.", status: "resolved", date: "Apr 8", priority: "high" },
];

export default function Complaints() {
  const [list, setList] = useState(complaints);
  const { toasts, addToast, removeToast } = useToast();

  const resolve = (id: string) => {
    setList((prev) => prev.map((c) => c.id === id ? { ...c, status: "resolved" } : c));
    addToast(`Complaint ${id} marked as resolved.`);
  };

  const priorityColor: Record<string, string> = {
    high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Complaints</h1>
        <p className="text-sm text-gray-500">{list.filter((c) => c.status === "open").length} open complaints</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-2">
        {[
          { label: "Open", value: list.filter((c) => c.status === "open").length, color: "text-red-500 bg-red-50" },
          { label: "Resolved", value: list.filter((c) => c.status === "resolved").length, color: "text-green-600 bg-green-50" },
          { label: "Total", value: list.length, color: "text-gray-700 bg-gray-50" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`glass-card p-4 text-center ${color.split(" ")[1]}`}>
            <p className={`text-2xl font-bold ${color.split(" ")[0]}`}>{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {list.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div className="flex items-center gap-2">
                <FiAlertCircle className={`w-5 h-5 ${c.status === "open" ? "text-red-500" : "text-green-500"}`} />
                <span className="font-bold text-sm text-gray-800">{c.id}</span>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold capitalize ${priorityColor[c.priority]}`}>{c.priority}</span>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold capitalize ${c.status === "open" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{c.status}</span>
              </div>
              <span className="text-xs text-gray-400">{c.date}</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">{c.type}</p>
            <p className="text-sm text-gray-500 mb-1">{c.desc}</p>
            <p className="text-xs text-gray-400 mb-3">From: {c.user} · Against: {c.against}</p>
            {c.status === "open" && (
              <div className="flex gap-2">
                <button onClick={() => resolve(c.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                  <FiCheck className="w-3.5 h-3.5" /> Mark Resolved
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors">
                  <FiMessageSquare className="w-3.5 h-3.5" /> Contact User
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
