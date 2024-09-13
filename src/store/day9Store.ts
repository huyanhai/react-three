import { Vector3 } from 'three';
import { create } from 'zustand';

interface BaseState {
  isScrolling: boolean;
  isTouch: boolean;
  scrollProgress: number;
  changeState: (value: boolean) => void;
  changeScrollProgress: (value: number) => void;
  changeScrolling: (value: boolean) => void;
}

export const useDay9 = create<BaseState>((set) => ({
  isScrolling: false,
  isTouch: false,
  scrollProgress: 0,
  changeState: (value) => set(() => ({ isTouch: value })),
  changeScrollProgress: (value) => set(() => ({ scrollProgress: value })),
  changeScrolling: (value) => set(() => ({ isScrolling: value }))
}));
