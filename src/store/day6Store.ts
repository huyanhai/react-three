import { create } from 'zustand';

interface BaseState {
  stop: boolean;
  setStop: (value: boolean) => void;
}

export const useDay6 = create<BaseState>((set) => ({
  stop: false,
  setStop: (value) => set(() => ({ stop: value }))
}));
