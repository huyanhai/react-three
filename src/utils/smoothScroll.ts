import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap/gsap-core';

export const initSmoothScrolling = () => {
  // Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
  const lenis = new Lenis({ lerp: 0.1 });

  // Sync ScrollTrigger with Lenis' scroll updates.
  lenis.on('scroll', ScrollTrigger.update);

  // Ensure GSAP animations are in sync with Lenis' scroll frame updates.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
  });

  // Turn off GSAP's default lag smoothing to avoid conflicts with Lenis.
  gsap.ticker.lagSmoothing(0);
};
