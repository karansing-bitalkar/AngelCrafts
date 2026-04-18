import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend, FiCircle, FiImage, FiPaperclip, FiShoppingBag,
} from "react-icons/fi";
import { supabase, Message } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

/** Artisan conversations the customer can chat with */
const ARTISAN_CONVERSATIONS = [
  {
    id: "conv_1",
    artisanId: "artisan_lunas",
    artisanName: "Luna's Jewelry",
    artisanAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    shopSlug: "lunas-jewelry",
    lastMessage: "Of course! I can make it in blue.",
    unread: 1,
    time: "2m ago",
    online: true,
  },
  {
    id: "conv_3",
    artisanId: "artisan_woven",
    artisanName: "Woven Wonders",
    artisanAvatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=80&h=80&fit=crop&crop=faces",
    shopSlug: "woven-wonders",
    lastMessage: "Your order has shipped! 🎉",
    unread: 0,
    time: "1h ago",
    online: false,
  },
  {
    id: "conv_2",
    artisanId: "artisan_glow",
    artisanName: "Glow & Scent Co",
    artisanAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
    shopSlug: "glow-scent",
    lastMessage: "Thank you for your purchase!",
    unread: 0,
    time: "3h ago",
    online: true,
  },
  {
    id: "conv_4",
    artisanId: "artisan_bloom",
    artisanName: "Bloom & Brush",
    artisanAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
    shopSlug: "bloom-brush",
    lastMessage: "I'll start your custom portrait next week.",
    unread: 0,
    time: "1d ago",
    online: false,
  },
];

export default function CustomerMessages() {
  const { user } = useAuthStore();
  const [activeConv, setActiveConv] = useState(ARTISAN_CONVERSATIONS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async (conversationId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    setMessages(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages(activeConv.id);

    if (channelRef.current) supabase.removeChannel(channelRef.current);

    const channel = supabase
      .channel(`messages:${activeConv.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConv.id}`,
        },
        (payload) => {
          setMessages((prev) => {
            if (prev.find((m) => m.id === (payload.new as Message).id)) return prev;
            return [...prev, payload.new as Message];
          });
        }
      )
      .subscribe();

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [activeConv.id, fetchMessages]);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    const text = input.trim();
    setInput("");
    setSending(true);

    const newMsg: Omit<Message, "id" | "created_at"> = {
      sender_id: user.id,
      sender_name: user.name,
      sender_avatar: user.avatar,
      sender_role: user.role,
      receiver_id: activeConv.artisanId,
      conversation_id: activeConv.id,
      content: text,
    };

    const { error } = await supabase.from("messages").insert([newMsg]);
    if (error) {
      // Optimistic fallback
      setMessages((prev) => [
        ...prev,
        { id: `local_${Date.now()}`, created_at: new Date().toISOString(), ...newMsg },
      ]);
    }
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* ── Conversation List ──────────────────────────────────── */}
      <div className="w-72 flex-shrink-0 glass-card flex flex-col overflow-hidden">
        <div className="px-4 py-4 border-b border-pink-100">
          <h2 className="font-display text-lg font-bold text-gray-800">Messages</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {ARTISAN_CONVERSATIONS.filter((c) => c.unread > 0).length} unread
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-pink-50">
          {ARTISAN_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-pink-50/50 transition-colors",
                activeConv.id === conv.id && "bg-primary/10"
              )}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conv.artisanAvatar}
                  alt={conv.artisanName}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-semibold text-gray-800 truncate">{conv.artisanName}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick links */}
        <div className="px-4 py-3 border-t border-pink-100">
          <p className="text-xs text-gray-400 mb-2">Browse shops</p>
          <div className="flex flex-wrap gap-1.5">
            {ARTISAN_CONVERSATIONS.slice(0, 3).map((c) => (
              <a
                key={c.shopSlug}
                href={`/shop/${c.shopSlug}`}
                className="text-xs px-2.5 py-1 bg-pink-50 text-primary-700 rounded-lg hover:bg-primary/15 transition-colors font-medium flex items-center gap-1"
              >
                <FiShoppingBag className="w-3 h-3" />
                {c.artisanName.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chat Area ─────────────────────────────────────────── */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-pink-100 flex-shrink-0">
          <div className="relative">
            <img
              src={activeConv.artisanAvatar}
              alt={activeConv.artisanName}
              className="w-10 h-10 rounded-xl object-cover"
            />
            {activeConv.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{activeConv.artisanName}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <FiCircle
                className={cn(
                  "w-2.5 h-2.5 fill-current",
                  activeConv.online ? "text-green-400" : "text-gray-300"
                )}
              />
              {activeConv.online ? "Online now" : "Offline"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={`/shop/${activeConv.shopSlug}`}
              className="text-xs bg-primary/10 text-primary-700 px-3 py-1.5 rounded-xl font-semibold hover:bg-primary/20 transition-colors flex items-center gap-1.5"
            >
              <FiShoppingBag className="w-3.5 h-3.5" /> Visit Shop
            </a>
            <span className="text-xs text-gray-400 bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-medium">
              🟢 Live
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-gray-400">Loading messages…</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="font-display text-lg font-bold text-gray-700 mb-1">No messages yet</h3>
              <p className="text-sm text-gray-400">
                Say hello to {activeConv.artisanName}!
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isMine =
                  msg.sender_id === user?.id || msg.sender_role === "customer";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={cn(
                      "flex items-end gap-2",
                      isMine ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {!isMine && (
                      <img
                        src={activeConv.artisanAvatar}
                        alt={msg.sender_name}
                        className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    {isMine && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user?.name?.[0] || "C"}
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md flex flex-col gap-1",
                        isMine ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                          isMine
                            ? "bg-gradient-primary text-white rounded-br-sm"
                            : "bg-pink-50 text-gray-800 rounded-bl-sm border border-pink-100"
                        )}
                      >
                        {msg.content}
                      </div>
                      <span className="text-xs text-gray-400 px-1">
                        {formatTime(msg.created_at)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-pink-100 flex-shrink-0">
          <div className="flex items-end gap-3 bg-pink-50/50 rounded-2xl p-2 border border-pink-100">
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-2 rounded-xl hover:bg-pink-100 text-gray-400 hover:text-primary-600 transition-colors">
                <FiImage className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-pink-100 text-gray-400 hover:text-primary-600 transition-colors">
                <FiPaperclip className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${activeConv.artisanName}…`}
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm text-gray-700 placeholder-gray-400 py-2 max-h-24"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || sending}
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                input.trim() && !sending
                  ? "bg-gradient-primary text-white shadow-soft hover:shadow-glass hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {sending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSend className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Press Enter to send · Shift+Enter for new line · Powered by OnSpace Realtime
          </p>
        </div>
      </div>
    </div>
  );
}
