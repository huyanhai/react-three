import { create } from "zustand";

type State = {
  count: number;
};

type Action = {
  prev: () => void;
  next: () => void;
  setCount: (count: number) => void;
};

export const useCount = create<State & Action>((set) => ({
  count: 0,
  prev: () => set((state) => ({ count: state.count - 1 })),
  next: () => set((state) => ({ count: state.count + 1 })),
  setCount: (count) => set(() => ({ count })),
}));
