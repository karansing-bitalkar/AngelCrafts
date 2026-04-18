import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiPackage, FiMessageSquare, FiStar, FiCheck, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "order" | "message" | "review";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "order",
    title: "New Order Received!",
    body: "You received a new order for Rose Quartz Necklace.",
    time: "2m ago",
    read: false,
  },
  {
    id: "n2",
    type: "message",
    title: "New Message",
    body: "Luna's Jewelry: 'Of course! I can make it in blue 💙'",
    time: "15m ago",
    read: false,
  },
  {
    id: "n3",
    type: "review",
    title: "Review Reply",
    body: "Bohemian Threads replied to your review — 'Thank you so much!'",
    time: "1h ago",
    read: false,
  },
  {
    id: "n4",
    type: "order",
    title: "Order Shipped",
    body: "Your Macrame Wall Hanging has been shipped! Track: TRK-4572",
    time: "3h ago",
    read: true,
  },
  {
    id: "n5",
    type: "message",
    title: "Message from Glow & Scent Co",
    body: "Your custom candle set is ready for dispatch!",
    time: "5h ago",
    read: true,
  },
];

const typeConfig = {
  order: { icon: FiPackage, bg: "bg-blue-100", color: "text-blue-600" },
  message: { icon: FiMessageSquare, bg: "bg-purple-100", color: "text-purple-600" },
  review: { icon: FiStar, bg: "bg-amber-100", color: "text-amber-600" },
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "relative p-2.5 rounded-xl transition-all",
          open
            ? "bg-primary/15 text-primary-700"
            : "hover:bg-pink-50 text-gray-500 hover:text-primary-700"
        )}
      >
        <FiBell className="w-5 h-5" />
        {/* Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shadow"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-glass-lg border border-pink-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-pink-100 bg-pink-50/50">
              <div className="flex items-center gap-2">
                <FiBell className="w-4 h-4 text-primary-600" />
                <span className="font-display font-bold text-gray-800 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1"
                >
                  <FiCheck className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            {/* Notification list */}
            <div className="max-h-80 overflow-y-auto divide-y divide-pink-50">
              {notifications.length === 0 ? (
                <div className="py-10 text-center">
                  <FiBell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No notifications</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const cfg = typeConfig[n.type];
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-pink-50/40 transition-colors relative group",
                        !n.read && "bg-primary/5"
                      )}
                      onClick={() => markRead(n.id)}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                          cfg.bg
                        )}
                      >
                        <Icon className={cn("w-4 h-4", cfg.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("text-xs font-semibold", n.read ? "text-gray-600" : "text-gray-800")}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-gray-400 flex-shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                      </div>
                      {!n.read && (
                        <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1" />
                      )}
                      {/* Dismiss */}
                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-500 items-center justify-center opacity-0 group-hover:opacity-100 transition-all hidden group-hover:flex"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-pink-100 bg-gray-50/50 text-center">
              <button className="text-xs text-primary-600 font-medium hover:underline">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
