import { Vector2 } from 'three';
import vertexShader from './glsl/effectVertex.vert';

import fragmentShader from './glsl/effectFragment.frag';

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const ScreenEffect = {
  name: 'ScreenEffect',
  uniforms: {
    tDiffuse: { value: null },
    tSize: { value: new Vector2(256, 256) },
    center: { value: new Vector2(0.5, 0.5) },
    angle: { value: 1.57 },
    scale: { value: 1.0 },
    uTime: { value: 0.0 }
  },
  vertexShader,
  fragmentShader
};

export { ScreenEffect };
