import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheck, FiHome, FiMapPin } from "react-icons/fi";

const steps = [
  { label: "Order Placed", desc: "Apr 14, 2025 – 10:32 AM", done: true, icon: FiPackage },
  { label: "Order Confirmed", desc: "Apr 14, 2025 – 11:05 AM", done: true, icon: FiCheck },
  { label: "Processing & Packing", desc: "Apr 15, 2025 – 2:18 PM", done: true, icon: FiPackage },
  { label: "Shipped", desc: "Apr 16, 2025 – 9:00 AM · Tracking: TRK-4572", done: true, icon: FiTruck },
  { label: "Out for Delivery", desc: "Expected: Apr 18, 2025", done: false, icon: FiTruck },
  { label: "Delivered", desc: "Estimated Apr 18–19, 2025", done: false, icon: FiHome },
];

export default function OrderTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Order Tracking</h1>
        <p className="text-sm text-gray-500">Order ORD-002 · Macrame Wall Hanging</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-display text-lg font-bold text-gray-800 mb-6">Tracking Timeline</h3>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${step.done ? "bg-gradient-primary" : "bg-gray-100"}`}>
                      <Icon className={`w-5 h-5 ${step.done ? "text-white" : "text-gray-400"}`} />
                    </div>
                    {i < steps.length - 1 && <div className={`w-0.5 h-10 my-1 ${step.done ? "bg-primary/50" : "bg-gray-200"}`} />}
                  </div>
                  <div className="pb-8 flex-1">
                    <p className={`font-semibold text-sm ${step.done ? "text-gray-800" : "text-gray-400"}`}>{step.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Order Info */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-4">Order Details</h3>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" alt="Product" className="w-full rounded-2xl object-cover aspect-video mb-3" />
            <p className="font-semibold text-gray-800 text-sm">Macrame Wall Hanging</p>
            <p className="text-xs text-gray-400">by Bohemian Threads</p>
            <p className="text-primary-600 font-bold mt-1">$72.00</p>
          </div>
          <div className="glass-card p-5">
            <h3 className="font-display font-bold text-gray-800 mb-3">Shipping Address</h3>
            <div className="flex gap-2 text-sm text-gray-600">
              <FiMapPin className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <p>Sophia Rose</p>
                <p>123 Craft Street</p>
                <p>New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
