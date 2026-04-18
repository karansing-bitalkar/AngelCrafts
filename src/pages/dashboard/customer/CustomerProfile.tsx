import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiUser, FiMail, FiPhone, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import { getInitials } from "@/lib/utils";

export default function CustomerProfile() {
  const { user, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", location: user?.location || "", bio: user?.bio || "" });
  const { toasts, addToast, removeToast } = useToast();

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    addToast("Profile updated successfully! ✨");
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-pink-100">
          <div className="relative">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-3xl object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(user?.name || "U")}
              </div>
            )}
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white shadow-card border border-pink-100 flex items-center justify-center hover:bg-primary/10 transition-colors">
              <FiEdit2 className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500 text-sm capitalize">{user?.role} Account</p>
            <p className="text-xs text-gray-400 mt-1">Member since {user?.joinedAt}</p>
          </div>
          <button onClick={() => setEditing(true)} className="sm:ml-auto btn-primary flex items-center gap-2 text-sm">
            <FiEdit2 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* Info Fields */}
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: FiUser, label: "Full Name", value: user?.name },
            { icon: FiMail, label: "Email Address", value: user?.email },
            { icon: FiPhone, label: "Phone Number", value: user?.phone },
            { icon: FiMapPin, label: "Location", value: user?.location },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 p-4 bg-pink-50/50 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value || "Not set"}</p>
              </div>
            </div>
          ))}
          {user?.bio && (
            <div className="sm:col-span-2 p-4 bg-pink-50/50 rounded-2xl">
              <p className="text-xs text-gray-400 font-medium mb-1">Bio</p>
              <p className="text-sm text-gray-700">{user.bio}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-glass-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-gray-800">Edit Profile</h3>
                <button onClick={() => setEditing(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Phone", key: "phone", type: "tel" },
                  { label: "Location", key: "location", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                    <input type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="input-field" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                  <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="input-field resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditing(false)} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm">
                  <FiCheck className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
