import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiShield, FiHeart, FiTruck, FiSearch } from "react-icons/fi";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/constants";
import ProductCard from "@/components/features/ProductCard";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/features/ToastContainer";
import heroBanner from "@/assets/hero-banner.jpg";
import artisanFeature from "@/assets/artisan-feature.jpg";
import communityBanner from "@/assets/community-banner.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Home() {
  const { toasts, addToast, removeToast } = useToast();

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "12K+", label: "Artisans" },
    { value: "180K+", label: "Unique Products" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  const features = [
    { icon: FiShield, title: "Secure Payments", desc: "Every transaction is protected with bank-level encryption.", color: "bg-pink-50 text-pink-500" },
    { icon: FiHeart, title: "Handmade Quality", desc: "Every product is crafted with love and attention to detail.", color: "bg-purple-50 text-purple-500" },
    { icon: FiTruck, title: "Fast Delivery", desc: "Reliable shipping with real-time tracking on every order.", color: "bg-amber-50 text-amber-500" },
    { icon: FiStar, title: "Verified Artisans", desc: "Every seller is vetted and rated by our community.", color: "bg-emerald-50 text-emerald-500" },
  ];

  const testimonials = [
    { name: "Emma J.", role: "Satisfied Customer", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces", review: "Absolutely love AngelCrafts! Found a beautiful custom necklace for my mom's birthday. The artisan was incredibly responsive.", rating: 5 },
    { name: "Maya R.", role: "Artisan Seller", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces", review: "AngelCrafts has transformed my hobby into a thriving business. The platform is intuitive and my sales have tripled!", rating: 5 },
    { name: "Sophie L.", role: "Craft Enthusiast", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=faces", review: "The curation here is simply stunning. Every product tells a story. I've gifted dozens of pieces from this platform.", rating: 5 },
  ];

  const trendingCategories = CATEGORIES.slice(0, 6);
  const featuredProducts = SAMPLE_PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="pt-16 lg:pt-20">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* ======= HERO ======= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="AngelCrafts Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="px-3 py-1.5 bg-primary/20 text-primary-700 text-xs font-bold rounded-full uppercase tracking-widest">
                ✨ Handmade with Love
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6"
            >
              Discover
              <span className="block text-gradient"> Unique </span>
              Handmade Crafts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl"
            >
              Shop from thousands of talented artisans worldwide. Every purchase directly supports independent creators making beautiful, one-of-a-kind pieces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link to="/marketplace" className="btn-primary flex items-center gap-2 px-8 py-4 text-base">
                Explore Marketplace <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="btn-secondary flex items-center gap-2 px-8 py-4 text-base">
                Start Selling
              </Link>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex items-center gap-3 bg-white rounded-2xl shadow-glass p-2 max-w-lg"
            >
              <FiSearch className="w-5 h-5 text-gray-400 ml-3" />
              <input type="text" placeholder="Search handmade jewelry, decor, art..." className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-2" />
              <button className="btn-primary px-5 py-2 text-sm">Search</button>
            </motion.div>
          </div>
        </div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="glass-card p-4 text-center min-w-[120px]">
              <p className="font-display text-2xl font-bold text-gradient">{value}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ======= STATS BAR ======= */}
      <section className="bg-white border-y border-pink-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold text-gradient">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CATEGORIES ======= */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="tag-badge mb-4">Shop by Category</p>
          <h2 className="section-title mb-4">Find What You Love</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            From handcrafted jewelry to artisan home decor — discover something special in every category.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/categories`}
                className="group flex flex-col items-center gap-3 p-4 rounded-3xl hover:shadow-glass transition-all duration-300 hover:-translate-y-1 bg-white border border-pink-50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center leading-tight">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count.toLocaleString()} items</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/categories" className="btn-secondary inline-flex items-center gap-2">
            View All Categories <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ======= FEATURED PRODUCTS ======= */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="tag-badge mb-4">✨ Curated Selection</p>
            <h2 className="section-title mb-4">Featured Products</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Handpicked by our team — exceptional quality, unique design, and artisan excellence.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} onAddToCart={() => addToast(`${product.title} added to cart! 🛍️`)} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/marketplace" className="btn-gold inline-flex items-center gap-2">
              Shop All Products <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======= ARTISAN SPOTLIGHT ======= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="tag-badge mb-4">🎨 For Creators</p>
              <h2 className="section-title mb-5">Turn Your Craft into a Thriving Business</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Join thousands of talented artisans who've built successful businesses on AngelCrafts. Our platform gives you everything you need — from product listing to analytics and direct customer messaging.
              </p>
              <ul className="space-y-3 mb-8">
                {["Zero listing fees for your first 10 products", "Keep 85% of every sale", "Built-in analytics and customer insights", "Custom orders and direct messaging system"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                Start Your Shop <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-glass-lg aspect-[4/3]">
                <img src={artisanFeature} alt="Artisan crafting jewelry" className="w-full h-full object-cover" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 flex items-center gap-3">
                <div className="text-3xl">🎉</div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">$12,450 earned</p>
                  <p className="text-xs text-gray-500">Luna Craft this month</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======= HOW IT WORKS ======= */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="tag-badge mb-4">Simple & Easy</p>
            <h2 className="section-title mb-4">How AngelCrafts Works</h2>
            <p className="section-subtitle max-w-xl mx-auto">Start shopping or selling in just a few simple steps.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse & Discover", desc: "Explore thousands of unique handmade products across dozens of categories. Use filters to find exactly what you love.", icon: "🔍" },
              { step: "02", title: "Connect with Artisans", desc: "Message artisans directly, request custom pieces, and learn the stories behind each handcrafted creation.", icon: "💬" },
              { step: "03", title: "Shop with Confidence", desc: "Secure payments, buyer protection, and reliable delivery tracking make every purchase completely worry-free.", icon: "✅" },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-8 text-center relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-xl bg-gradient-primary text-white text-xs font-bold flex items-center justify-center shadow-soft">
                  {step.step}
                </div>
                <div className="text-4xl mb-5 mt-3">{step.icon}</div>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FEATURES ======= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="section-title mb-4">Why AngelCrafts?</h2>
            <p className="section-subtitle max-w-xl mx-auto">Everything you need for a safe, joyful handmade shopping experience.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:shadow-glass-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= ALL PRODUCTS ======= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title mb-2">New Arrivals</h2>
              <p className="text-gray-500">Fresh handmade treasures, just listed</p>
            </div>
            <Link to="/marketplace" className="btn-secondary hidden sm:inline-flex items-center gap-2 text-sm">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_PRODUCTS.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p as any} onAddToCart={() => addToast(`Added to cart! 🛍️`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ======= TESTIMONIALS ======= */}
      <section className="py-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="tag-badge mb-4">💬 Reviews</p>
            <h2 className="section-title mb-4">Loved by Our Community</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= COMMUNITY ======= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={communityBanner} alt="Community" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center">
              <div className="text-center text-white max-w-xl px-4">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Join Our Crafting Community</h2>
                <p className="mb-6 text-white/90 text-sm leading-relaxed">
                  Connect with fellow craft enthusiasts, share your projects, and get inspired by thousands of unique creations every day.
                </p>
                <Link to="/community" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-primary-700 font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all">
                  Explore Community <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CTA ======= */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
              Ready to Find Your Perfect Handmade Treasure?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Thousands of artisans are waiting to create something special just for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/marketplace" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all">
                Start Shopping
              </Link>
              <Link to="/register" className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-primary-700 transition-all">
                Become an Artisan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
