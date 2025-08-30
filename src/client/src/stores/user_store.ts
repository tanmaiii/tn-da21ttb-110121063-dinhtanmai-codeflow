// lib/sidebar-store.ts
import { IUser } from "@/interfaces/user";
import { create } from "zustand";

interface userState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  removeUser: () => void;
}

export const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (user?: IUser) =>
    set(() => {
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    }),
  removeUser: () => {
    set(() => {
      localStorage.removeItem("user");
      return { user: null };
    });
  },
}));
