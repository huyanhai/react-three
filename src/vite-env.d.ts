/// <reference types="vite/client" />

declare module '*.vert';
declare module '*.frag';

declare namespace JSX {
  interface IntrinsicElements {
    screenShader: any;
    humanShader: any;
    waterPass: any;
    unrealBloomPass: any;
    filmPass: any;
  }
}
