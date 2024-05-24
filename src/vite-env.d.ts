/// <reference types="vite/client" />

declare module 'resolve-lygia';
declare module '*.vert';
declare module '*.frag';

declare namespace JSX {
  interface IntrinsicElements {
    screenShader: any;
  }
}
