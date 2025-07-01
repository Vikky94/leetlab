import { create } from 'zustand';
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance"
interface AuthState {
  isAuthenticated: boolean;
  isLoggingIn: boolean,
  authUser: { name: string } | null;
  login: (user: { name: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });

      toast.success(res.data.message);
      set({ isAuthenticated: true});
    } catch (error) {
      console.log("Error logging in", error);
      toast.error("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      set({ authUser: null });

      toast.success(res.data.message);
      set({ isAuthenticated: false});
    } catch (error) {
      console.log("Error logging off", error);
      toast.error("Error logging off");
    } 
  },
}));