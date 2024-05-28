/// <reference types="vite/client" />

declare module '*.vert';
declare module '*.frag';

declare namespace JSX {
  interface IntrinsicElements {
    screenShader: any;
  }
}
