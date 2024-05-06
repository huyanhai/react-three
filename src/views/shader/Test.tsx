import React from 'react';
import vertexShader from '@/glsl/vertexShader.vert?raw';
import fragmentShader from '@/glsl/fragmentShader.frag?raw';
import { resolveLygia } from '@/utils/readlygia';

const Test = () => {
  resolveLygia(/*glsl*/ `
  #include "lygia/generative/fbm.glsl"
  #include "lygia/generative/curl.glsl"
  #include "lygia/generative/gnoise.glsl"
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`).then((r) => {
    console.log('r', r);
  });

  return <boxGeometry />;
};

export default Test;
