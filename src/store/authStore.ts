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
  login: (email: string, name: string) => void;
  logout: () => void;
  openAuthModal: (signUp?: boolean) => void;
  closeAuthModal: () => void;
  saveBuild: (build: SavedBuild) => void;
  deleteBuild: (id: string) => void;
}

// Helper to load from localStorage
const loadState = () => {
  try {
    const user = localStorage.getItem("bf_user");
    const builds = localStorage.getItem("bf_builds");
    return {
      user: user ? JSON.parse(user) : null,
      savedBuilds: builds ? JSON.parse(builds) : [],
    };
  } catch (e) {
    return { user: null, savedBuilds: [] };
  }
};

const initialState = loadState();

export const useAuthStore = create<AuthStore>((set) => ({
  user: initialState.user,
  savedBuilds: initialState.savedBuilds,
  isAuthModalOpen: false,
  isSignUpMode: false,

  login: (email, name) => {
    const newUser = { id: Math.random().toString(36).substring(7), email, name };
    localStorage.setItem("bf_user", JSON.stringify(newUser));
    set({ user: newUser, isAuthModalOpen: false, isSignUpMode: false });
  },

  logout: () => {
    localStorage.removeItem("bf_user");
    set({ user: null });
  },

  openAuthModal: (signUp = false) => set({ isAuthModalOpen: true, isSignUpMode: signUp }),
  closeAuthModal: () => set({ isAuthModalOpen: false, isSignUpMode: false }),

  saveBuild: (build) => set((state) => {
    const updatedBuilds = [build, ...state.savedBuilds];
    localStorage.setItem("bf_builds", JSON.stringify(updatedBuilds));
    return { savedBuilds: updatedBuilds };
  }),

  deleteBuild: (id) => set((state) => {
    const updatedBuilds = state.savedBuilds.filter(b => b.id !== id);
    localStorage.setItem("bf_builds", JSON.stringify(updatedBuilds));
    return { savedBuilds: updatedBuilds };
  })
}));
