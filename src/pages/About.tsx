import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiGlobe, FiUsers, FiAward } from "react-icons/fi";

const team = [
  { name: "Angelica Rose", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces", bio: "Former artisan turned tech entrepreneur passionate about supporting independent creators." },
  { name: "Marcus Chen", role: "CTO", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces", bio: "10+ years in e-commerce technology with a love for craft and design." },
  { name: "Sofia Martinez", role: "Head of Community", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces", bio: "Community builder who has spent 7 years connecting artisans globally." },
  { name: "James Wilson", role: "Head of Design", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces", bio: "Award-winning designer with a passion for artisan aesthetics and UX." },
];

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-hero py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4">
          <span className="tag-badge mb-4">💫 Our Story</span>
          <h1 className="section-title mb-5">We Believe in the Power of Handmade</h1>
          <p className="section-subtitle">
            AngelCrafts was born from a simple belief: handmade items carry stories, love, and soul. We built this platform to give every artisan a global stage and every buyer a meaningful shopping experience.
          </p>
        </motion.div>
      </div>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=500&fit=crop" alt="Craft" className="rounded-3xl object-cover w-full h-64" />
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=500&fit=crop" alt="Craft" className="rounded-3xl object-cover w-full h-64 mt-8" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="tag-badge mb-4">🎯 Our Mission</span>
            <h2 className="section-title mb-5">Empowering Artisans, Enriching Lives</h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              We started AngelCrafts in 2020 with a simple mission: to create the world's most beloved marketplace for handmade goods. Today, we connect over 12,000 artisans with 50,000+ passionate buyers across 60 countries.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every transaction on our platform is a vote for craftsmanship over mass production, for human creativity over algorithm-driven conformity, and for meaningful connections over anonymous commerce.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FiHeart, label: "Maker First", desc: "Artisans keep 85% of sales" },
                { icon: FiGlobe, label: "Global Reach", desc: "60+ countries served" },
                { icon: FiUsers, label: "Community", desc: "50K+ active members" },
                { icon: FiAward, label: "Quality", desc: "Every item reviewed" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass-card p-4">
                  <Icon className="w-5 h-5 text-primary-500 mb-2" />
                  <p className="font-semibold text-sm text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-soft py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title mb-4">Our Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Authenticity", desc: "We celebrate real craftsmanship. No mass-produced items, no shortcuts — just genuine handmade love.", icon: "✨" },
              { title: "Community", desc: "We build bridges between creators and collectors, fostering relationships that go beyond transactions.", icon: "🤝" },
              { title: "Sustainability", desc: "We prioritize eco-friendly practices and support artisans who care about our planet's future.", icon: "🌿" },
              { title: "Inclusivity", desc: "Every artisan deserves a platform regardless of their background, location, or craft style.", icon: "🌏" },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="tag-badge mb-4">👥 The Team</span>
          <h2 className="section-title mb-4">Meet the People Behind AngelCrafts</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center group">
              <div className="relative mb-4">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-3xl object-cover mx-auto group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              <h3 className="font-display font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-sm text-primary-600 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-white/80 mb-8">Whether you're a buyer, seller, or just a craft enthusiast — there's a place for you at AngelCrafts.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all">Get Started Free</Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-primary-700 transition-all">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
