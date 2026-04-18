import { User, UserRole } from "@/types";
import { DEMO_ACCOUNTS } from "@/constants";

const USER_KEY = "angelcrafts_user";

export const authLib = {
  login(email: string, password: string): User | null {
    const accounts = Object.values(DEMO_ACCOUNTS);
    const match = accounts.find((a) => a.email === email && a.password === password);
    if (!match) return null;
    const user: User = {
      id: `user_${match.role}`,
      name: match.name,
      email: match.email,
      role: match.role,
      avatar: match.avatar,
      location: "New York, USA",
      bio: match.role === "artisan" ? "Passionate artisan creating handmade treasures with love." : "Craft lover and collector of unique handmade items.",
      phone: "+1 (555) 123-4567",
      joinedAt: "January 2023",
      shopName: (match as any).shopName,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    try { return JSON.parse(stored); } catch { return null; }
  },

  updateUser(updates: Partial<User>): User | null {
    const current = authLib.getCurrentUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    return updated;
  },

  getDashboardPath(role: UserRole): string {
    switch (role) {
      case "customer": return "/dashboard/customer";
      case "artisan": return "/dashboard/artisan";
      case "admin": return "/dashboard/admin";
    }
  },
};
