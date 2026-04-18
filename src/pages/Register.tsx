import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { DEMO_ACCOUNTS } from "@/constants";
import { authLib } from "@/lib/auth";

export default function Register() {
  const [role, setRole] = useState<"customer" | "artisan">("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Use demo account for the selected role
      const demoAcc = DEMO_ACCOUNTS[role];
      const user = login(demoAcc.email, demoAcc.password);
      setLoading(false);
      if (user) navigate(authLib.getDashboardPath(user.role));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6 text-sm font-medium">
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
              <span className="text-white font-display font-bold text-2xl">A</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-800">Join AngelCrafts</h1>
            <p className="text-gray-500 text-sm mt-1">Create your account to get started</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(["customer", "artisan"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`relative flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border-2 transition-all ${
                  role === r ? "border-primary bg-primary/5" : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <span className="text-2xl">{r === "customer" ? "🛍️" : "🎨"}</span>
                <span className="text-sm font-semibold capitalize text-gray-700">{r}</span>
                <span className="text-xs text-gray-400 text-center leading-tight">
                  {r === "customer" ? "Shop & discover" : "Sell your crafts"}
                </span>
                {role === r && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : `Create ${role === "customer" ? "Customer" : "Artisan"} Account`}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
