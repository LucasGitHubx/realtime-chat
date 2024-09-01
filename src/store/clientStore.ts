import { create } from "zustand";

interface State {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
}

export const useClientStore = create<State>((set) => ({
  username: "",
  email: "",
  setUsername: (newusername) =>
    set(() => ({
      username: newusername,
    })),
  setEmail: (newEmail) =>
    set(() => ({
      email: newEmail,
    })),
}));
