import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiCamera, FiGlobe, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";

export default function ShopSettings() {
  const { user, updateUser } = useAuthStore();
  const { toasts, addToast, removeToast } = useToast();
  const [form, setForm] = useState({
    shopName: user?.shopName || "Luna's Handmade Haven",
    bio: user?.bio || "Passionate artisan creating handmade treasures with love.",
    location: user?.location || "New York, USA",
    phone: user?.phone || "+1 (555) 123-4567",
    website: "www.lunascrafts.com",
    email: user?.email || "",
  });

  const handleSave = () => {
    updateUser({ shopName: form.shopName, bio: form.bio, location: form.location });
    addToast("Shop settings saved! ✨");
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-800">Shop Settings</h1>
        <p className="text-sm text-gray-500">Manage your shop profile and information</p>
      </div>

      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
        <div className="relative h-36 bg-gradient-primary">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=300&fit=crop')] bg-cover bg-center opacity-40" />
          <button className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/80 backdrop-blur rounded-xl text-xs font-medium flex items-center gap-1.5 hover:bg-white transition-colors">
            <FiCamera className="w-3.5 h-3.5" /> Change Banner
          </button>
        </div>
        <div className="p-5 flex items-end gap-4 -mt-8">
          <div className="relative">
            {user?.avatar && <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow" />}
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-white shadow flex items-center justify-center">
              <FiCamera className="w-3 h-3 text-gray-600" />
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-gray-800">{form.shopName}</h2>
            <p className="text-xs text-gray-400">{form.location}</p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="font-display text-lg font-bold text-gray-800 mb-5">Shop Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Name</label>
            <input type="text" value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Description</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="input-field resize-none" />
          </div>
          {[
            { label: "Email", key: "email", icon: FiMail, type: "email" },
            { label: "Phone", key: "phone", icon: FiPhone, type: "tel" },
            { label: "Location", key: "location", icon: FiMapPin, type: "text" },
            { label: "Website", key: "website", icon: FiGlobe, type: "text" },
          ].map(({ label, key, icon: Icon, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={type} value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="input-field pl-10" />
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="btn-primary mt-5 flex items-center gap-2">
          <FiSave className="w-4 h-4" /> Save Settings
        </button>
      </motion.div>
    </div>
  );
}
