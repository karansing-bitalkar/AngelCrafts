import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiX, FiAlertCircle, FiInfo } from "react-icons/fi";
import { Toast } from "@/hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const icons = {
  success: FiCheck,
  error: FiX,
  warning: FiAlertCircle,
  info: FiInfo,
};

const colors = {
  success: "bg-green-50 border-green-200 text-green-700",
  error: "bg-red-50 border-red-200 text-red-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const iconColors = {
  success: "bg-green-100 text-green-600",
  error: "bg-red-100 text-red-600",
  warning: "bg-amber-100 text-amber-600",
  info: "bg-blue-100 text-blue-600",
};

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-glass-lg min-w-[280px] max-w-[360px] ${colors[toast.type]}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[toast.type]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => onRemove(toast.id)}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
