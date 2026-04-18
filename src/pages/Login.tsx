import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { useAuthStore } from "@/stores/authStore";
import { DEMO_ACCOUNTS } from "@/constants";
import { authLib } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const fillDemo = (role: "customer" | "artisan" | "admin") => {
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const user = login(email, password);
      setLoading(false);
      if (user) {
        navigate(authLib.getDashboardPath(user.role));
      } else {
        setError("Invalid email or password. Try the demo accounts below.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6 text-sm font-medium">
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="glass-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
              <span className="text-white font-display font-bold text-2xl">A</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your AngelCrafts account</p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-6">
            <p className="text-xs text-gray-400 font-medium text-center mb-3 uppercase tracking-wide">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {(["customer", "artisan", "admin"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => fillDemo(role)}
                  className="py-2 px-3 rounded-xl text-xs font-semibold border-2 border-pink-100 hover:border-primary hover:bg-primary/5 transition-all capitalize text-gray-600 hover:text-primary-700"
                >
                  {role === "customer" ? "👤" : role === "artisan" ? "🎨" : "⚡"} {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-pink-100" />
            <span className="text-xs text-gray-400">or sign in manually</span>
            <div className="h-px flex-1 bg-pink-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Your password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs bg-red-50 px-4 py-3 rounded-xl">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            New to AngelCrafts?{" "}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
