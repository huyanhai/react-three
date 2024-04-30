import { create } from "zustand";

type State = {
  name: string | undefined;
};

type Action = {
  setName: (name: string | undefined) => void;
};

export const useCard = create<State & Action>((set) => ({
  name: undefined,
  setName: (name) => set(() => ({ name })),
}));
