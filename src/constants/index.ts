export const DEMO_ACCOUNTS = {
  customer: {
    email: "customer@angelcrafts.com",
    password: "customer123",
    role: "customer" as const,
    name: "Sophia Rose",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  },
  artisan: {
    email: "artisan@angelcrafts.com",
    password: "artisan123",
    role: "artisan" as const,
    name: "Luna Craft",
    shopName: "Luna's Handmade Haven",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
  },
  admin: {
    email: "admin@angelcrafts.com",
    password: "admin123",
    role: "admin" as const,
    name: "Admin Angel",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
  },
};

export const CATEGORIES = [
  { id: "jewelry", name: "Jewelry", icon: "💍", count: 1240, color: "from-pink-200 to-rose-200", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop" },
  { id: "home-decor", name: "Home Decor", icon: "🏡", count: 987, color: "from-purple-200 to-violet-200", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
  { id: "art", name: "Art & Prints", icon: "🎨", count: 756, color: "from-amber-200 to-yellow-200", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop" },
  { id: "clothing", name: "Clothing", icon: "👗", count: 645, color: "from-sky-200 to-blue-200", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop" },
  { id: "candles", name: "Candles & Scents", icon: "🕯️", count: 532, color: "from-orange-200 to-amber-200", image: "https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=400&h=300&fit=crop" },
  { id: "ceramics", name: "Ceramics", icon: "🏺", count: 421, color: "from-emerald-200 to-teal-200", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop" },
  { id: "gifts", name: "Gift Sets", icon: "🎁", count: 389, color: "from-red-200 to-pink-200", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&h=300&fit=crop" },
  { id: "textiles", name: "Textiles", icon: "🧶", count: 310, color: "from-indigo-200 to-purple-200", image: "https://images.unsplash.com/photo-1576037728058-fe432b654d37?w=400&h=300&fit=crop" },
];

export const SAMPLE_PRODUCTS = [
  {
    id: "p1", title: "Rose Quartz Crystal Necklace", description: "Handcrafted sterling silver necklace with genuine rose quartz pendant.", price: 48, originalPrice: 65, category: "jewelry",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"],
    artisanId: "a1", artisanName: "Luna's Jewelry", artisanAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    rating: 4.9, reviewCount: 127, tags: ["jewelry", "crystal", "necklace"], inStock: true, stockCount: 12, isFeatured: true, createdAt: "2024-01-15",
  },
  {
    id: "p2", title: "Macrame Wall Hanging", description: "Boho-style macrame wall art, handwoven with natural cotton rope.", price: 72, originalPrice: 90, category: "home-decor",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"],
    artisanId: "a2", artisanName: "Bohemian Threads", artisanAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    rating: 4.8, reviewCount: 89, tags: ["macrame", "boho", "wall-art"], inStock: true, stockCount: 5, isFeatured: true, createdAt: "2024-02-10",
  },
  {
    id: "p3", title: "Lavender Soy Candle Set", description: "Set of 3 hand-poured soy candles with calming lavender fragrance.", price: 34, category: "candles",
    images: ["https://images.unsplash.com/photo-1602874801006-33b54d880c13?w=600&h=600&fit=crop"],
    artisanId: "a3", artisanName: "Glow & Scent Co", artisanAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
    rating: 4.7, reviewCount: 203, tags: ["candles", "lavender", "soy"], inStock: true, stockCount: 20, createdAt: "2024-01-28",
  },
  {
    id: "p4", title: "Handpainted Ceramic Mug", description: "Unique hand-painted ceramic mug, dishwasher safe, food-grade glazed.", price: 28, category: "ceramics",
    images: ["https://images.unsplash.com/photo-1510706019793-fd0ea8ba6090?w=600&h=600&fit=crop"],
    artisanId: "a4", artisanName: "Clay & Canvas", artisanAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
    rating: 4.6, reviewCount: 156, tags: ["ceramics", "mug", "painted"], inStock: true, stockCount: 8, createdAt: "2024-02-05",
  },
  {
    id: "p5", title: "Watercolor Floral Print", description: "Original watercolor painting print, signed and matted, ready to frame.", price: 55, originalPrice: 70, category: "art",
    images: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop"],
    artisanId: "a5", artisanName: "Bloom & Brush", artisanAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
    rating: 4.9, reviewCount: 74, tags: ["art", "watercolor", "floral"], inStock: true, stockCount: 15, isFeatured: true, createdAt: "2024-01-20",
  },
  {
    id: "p6", title: "Gold Leaf Earrings", description: "Delicate handcrafted gold-filled leaf earrings, lightweight and elegant.", price: 38, category: "jewelry",
    images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop"],
    artisanId: "a1", artisanName: "Luna's Jewelry", artisanAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    rating: 4.8, reviewCount: 98, tags: ["jewelry", "earrings", "gold"], inStock: true, stockCount: 18, createdAt: "2024-02-12",
  },
  {
    id: "p7", title: "Personalized Gift Basket", description: "Custom curated gift basket with handmade soaps, candles, and treats.", price: 89, originalPrice: 110, category: "gifts",
    images: ["https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=600&fit=crop"],
    artisanId: "a6", artisanName: "Gifted Hands", artisanAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces",
    rating: 5.0, reviewCount: 42, tags: ["gifts", "personalized", "basket"], inStock: true, stockCount: 6, isCustomizable: true, isFeatured: true, createdAt: "2024-02-18",
  },
  {
    id: "p8", title: "Woven Throw Blanket", description: "Handloomed cotton throw blanket in pastel palette, ultra-soft texture.", price: 95, category: "textiles",
    images: ["https://images.unsplash.com/photo-1576037728058-fe432b654d37?w=600&h=600&fit=crop"],
    artisanId: "a7", artisanName: "Woven Wonders", artisanAvatar: "https://images.unsplash.com/photo-1546961342-ea5f72b193b3?w=80&h=80&fit=crop&crop=faces",
    rating: 4.7, reviewCount: 63, tags: ["textiles", "blanket", "handwoven"], inStock: true, stockCount: 9, createdAt: "2024-01-30",
  },
];

export const ORDER_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered"] as const;

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Categories", path: "/categories" },
  { label: "Community", path: "/community" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];
