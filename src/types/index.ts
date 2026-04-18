export type UserRole = "customer" | "artisan" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  joinedAt?: string;
  shopName?: string;
  shopBanner?: string;
  shopDescription?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  artisanId: string;
  artisanName: string;
  artisanAvatar?: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  isCustomizable?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  customerId: string;
  artisanId: string;
  products: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  estimatedDelivery: string;
  shippingAddress: Address;
  trackingNumber?: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participantName: string;
  participantAvatar?: string;
}
