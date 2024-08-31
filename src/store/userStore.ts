import { User } from "firebase/auth";
import { create } from "zustand";

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
}));
