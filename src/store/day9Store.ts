import { create } from 'zustand';

interface BaseState {
  isTouch: boolean;
  scrollProgress: number;
  changeState: (value: boolean) => void;
  changeScrollProgress: (value: number) => void;
}

export const useDay9 = create<BaseState>((set) => ({
  isTouch: false,
  scrollProgress: 0,
  changeState: (value) => set(() => ({ isTouch: value })),
  changeScrollProgress: (value) => set(() => ({ scrollProgress: value }))
}));
