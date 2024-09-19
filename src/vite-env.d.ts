/// <reference types="vite/client" />

declare module '*.vert';
declare module '*.frag';
declare module '@14islands/r3f-scroll-rig/powerups';

declare namespace JSX {
  interface IntrinsicElements {
    screenShader: any;
    humanShader: any;
    waterPass: any;
    unrealBloomPass: any;
    filmPass: any;
    shader: ShaderMaterial;
  }
}
