import { create } from "zustand";

type State = {
  view: number;
};

type Action = {
  setView: (view: number) => void;
};

export const useView = create<State & Action>((set) => ({
  view: 0,
  setView: (view) => set(() => ({ view })),
}));
