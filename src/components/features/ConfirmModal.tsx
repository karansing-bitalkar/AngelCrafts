import { AnimatePresence, motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmModal({
  isOpen, title, message, confirmLabel = "Confirm", onConfirm, onCancel, danger = false,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-glass-lg"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto ${danger ? "bg-red-100" : "bg-amber-100"}`}>
              <FiAlertTriangle className={`w-7 h-7 ${danger ? "text-red-500" : "text-amber-500"}`} />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
            <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">{message}</p>
            <div className="flex gap-3">
              <button onClick={onCancel} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-3 rounded-2xl font-semibold text-white text-sm transition-all hover:scale-105 ${
                  danger ? "bg-red-500 hover:bg-red-600" : "bg-gradient-primary"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
