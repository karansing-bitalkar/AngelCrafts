import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail } from "react-icons/fi";

const footerLinks = {
  Shop: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Categories", path: "/categories" },
    { label: "Featured Products", path: "/marketplace" },
    { label: "New Arrivals", path: "/marketplace" },
  ],
  Artisans: [
    { label: "Become an Artisan", path: "/register" },
    { label: "Community", path: "/community" },
    { label: "Success Stories", path: "/community" },
    { label: "Resources", path: "/help-center" },
  ],
  Support: [
    { label: "Help Center", path: "/help-center" },
    { label: "Contact Us", path: "/contact" },
    { label: "Order Tracking", path: "/login" },
    { label: "Returns Policy", path: "/help-center" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
    { label: "Press", path: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100">
      {/* Newsletter */}
      <div className="bg-gradient-primary py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Join the AngelCrafts Community
          </h3>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            Get exclusive deals, new artisan spotlights, and craft inspiration in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-2xl bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <button className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-2xl hover:shadow-lg transition-all hover:scale-105 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display text-xl font-bold text-gradient">AngelCrafts</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              A premium marketplace connecting talented artisans with craft lovers worldwide. Every purchase supports independent creators.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: FiInstagram, href: "#" },
                { Icon: FiTwitter, href: "#" },
                { Icon: FiFacebook, href: "#" },
                { Icon: FiYoutube, href: "#" },
                { Icon: FiMail, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-gray-500 hover:bg-primary/20 hover:text-primary-700 transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-primary-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-pink-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 AngelCrafts. All rights reserved. Made with ♥ for artisans worldwide.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms", path: "/terms" },
              { label: "Help Center", path: "/help-center" },
            ].map((link) => (
              <Link key={link.label} to={link.path} className="text-sm text-gray-400 hover:text-primary-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
