import { create } from "zustand";
import { User } from "@/types";
import { authLib } from "@/lib/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authLib.getCurrentUser(),
  isAuthenticated: !!authLib.getCurrentUser(),

  login: (email, password) => {
    const user = authLib.login(email, password);
    if (user) set({ user, isAuthenticated: true });
    return user;
  },

  logout: () => {
    authLib.logout();
    set({ user: null, isAuthenticated: false });
  },

  updateUser: (updates) => {
    const updated = authLib.updateUser(updates);
    if (updated) set({ user: updated });
  },
}));
