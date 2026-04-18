import { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { formatPrice, truncate } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import AuthGateModal from "@/components/features/AuthGateModal";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

function toShopSlug(artisanId: string, artisanName: string): string {
  if (/^a\d+$/.test(artisanId)) {
    return artisanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  return artisanId;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);
  const [authModal, setAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState("");

  const shopSlug = toShopSlug(product.artisanId, product.artisanName);

  const requireAuth = (action: string, fn: () => void) => {
    if (!isAuthenticated) {
      setAuthAction(action);
      setAuthModal(true);
      return;
    }
    fn();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth("add items to your cart", () => {
      addToCart(product);
      onAddToCart?.();
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requireAuth("save items to your wishlist", () => {
      toggleWishlist(product);
    });
  };

  const handleArtisanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/shop/${shopSlug}`);
  };

  return (
    <>
      <AuthGateModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        action={authAction}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="product-card group"
      >
        <Link to={`/marketplace/${product.id}`} className="block">
          {/* Image */}
          <div className="relative overflow-hidden aspect-square">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isFeatured && (
                <span className="px-2 py-1 bg-accent-400 text-white text-xs font-semibold rounded-lg shadow-sm">
                  Featured
                </span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg shadow-sm">
                  Sale
                </span>
              )}
              {product.isCustomizable && (
                <span className="px-2 py-1 bg-secondary text-white text-xs font-semibold rounded-lg shadow-sm">
                  Custom
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                inWishlist
                  ? "bg-red-500 text-white scale-110"
                  : "bg-white/80 text-gray-500 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <FiHeart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
            </button>

            {/* Auth lock hint when not logged in */}
            {!isAuthenticated && (
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary text-sm py-2 flex items-center justify-center gap-2"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  Login to Buy
                </button>
              </div>
            )}

            {/* Add to Cart Overlay (logged in) */}
            {isAuthenticated && (
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary text-sm py-2 flex items-center justify-center gap-2"
                >
                  <FiShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Artisan — clickable */}
            <button
              onClick={handleArtisanClick}
              className="flex items-center gap-2 mb-2 group/artisan w-full text-left"
            >
              <img
                src={product.artisanAvatar}
                alt={product.artisanName}
                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-xs text-gray-400 font-medium truncate group-hover/artisan:text-primary-600 transition-colors">
                {product.artisanName}
              </span>
            </button>

            <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-snug">
              {truncate(product.title, 40)}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <FiStar className="w-3 h-3 text-accent-400 fill-current" />
              <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary-600 text-base">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
