import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SavedBuild {
  id: string;
  name: string;
  date: string;
  totalPrice: number;
  components: {
    cpu?: { id: string; name: string };
    gpu?: { id: string; name: string };
    motherboard?: { id: string; name: string };
    ram?: { id: string; name: string };
  };
}

interface AuthStore {
  user: User | null;
  savedBuilds: SavedBuild[];
  isAuthModalOpen: boolean;
  isSignUpMode: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  openAuthModal: (signUp?: boolean) => void;
  closeAuthModal: () => void;
  saveBuild: (build: SavedBuild) => Promise<void>;
  deleteBuild: (id: string) => Promise<void>;
}

const getBackendUrl = () => {
  return (import.meta as any).env?.VITE_BACKEND_URL || "http://localhost:3001";
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  savedBuilds: [],
  isAuthModalOpen: false,
  isSignUpMode: false,

  login: async (email, password) => {
    try {
      const res = await fetch(`${getBackendUrl()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || "Login failed." };
      }

      set({ user: data.user, isAuthModalOpen: false, isSignUpMode: false });
      
      // Load user's builds immediately after login
      await get().checkAuth();
      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Network error, please check connection." };
    }
  },

  signUp: async (name, email, password) => {
    try {
      const res = await fetch(`${getBackendUrl()}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || "Registration failed." };
      }

      set({ user: data.user, isAuthModalOpen: false, isSignUpMode: false });
      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Network error, please check connection." };
    }
  },

  logout: async () => {
    try {
      await fetch(`${getBackendUrl()}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (e) {
      console.warn("Logout request failed, clearing local state anyway.");
    }
    set({ user: null, savedBuilds: [] });
  },

  checkAuth: async () => {
    try {
      // 1. Verify user session
      const userRes = await fetch(`${getBackendUrl()}/api/auth/me`, {
        method: "GET",
        credentials: "include"
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        set({ user: userData.user });

        // 2. Fetch user builds if logged in
        const buildsRes = await fetch(`${getBackendUrl()}/api/builds`, {
          method: "GET",
          credentials: "include"
        });
        if (buildsRes.ok) {
          const buildsData = await buildsRes.json();
          set({ savedBuilds: buildsData.savedBuilds || [] });
        }
      } else {
        set({ user: null, savedBuilds: [] });
      }
    } catch (err) {
      console.warn("Auth check failed:", err);
      set({ user: null, savedBuilds: [] });
    }
  },

  openAuthModal: (signUp = false) => set({ isAuthModalOpen: true, isSignUpMode: signUp }),
  closeAuthModal: () => set({ isAuthModalOpen: false, isSignUpMode: false }),

  saveBuild: async (build) => {
    const { user } = get();
    if (!user) return;
    
    try {
      const res = await fetch(`${getBackendUrl()}/api/builds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(build),
        credentials: "include"
      });

      if (res.ok) {
        const savedBuild = await res.json();
        set((state) => ({
          savedBuilds: [savedBuild, ...state.savedBuilds]
        }));
      }
    } catch (err) {
      console.error("Failed to save build to backend:", err);
    }
  },

  deleteBuild: async (id) => {
    const { user } = get();
    if (!user) return;

    try {
      const res = await fetch(`${getBackendUrl()}/api/builds/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        set((state) => ({
          savedBuilds: state.savedBuilds.filter(b => b.id !== id)
        }));
      }
    } catch (err) {
      console.error("Failed to delete build on backend:", err);
    }
  }
}));
