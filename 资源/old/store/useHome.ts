import { create } from "zustand";

type State = {
  view: number;
};

type Action = {
  setView: (view: number) => void;
};

export const createHome = create<State & Action>((set) => ({
  view: 0,
  setView: (view) => set(() => ({ view })),
}));

export const useHome = () => {
  const view = createHome((state) => state.view);
  const setView = createHome((state) => state.setView);
  return { view, setView };
};
