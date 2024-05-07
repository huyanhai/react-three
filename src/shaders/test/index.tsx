import vertexShader from './glsl/vertexShader.vert?raw';
import fragmentShader from './glsl/fragmentShader.frag?raw';
import { resolveLygia } from 'resolve-lygia';
import { shaderMaterial } from '@react-three/drei';
import { Color } from 'three';

const Test = shaderMaterial(
  { uTime: 0, uAlpha: 0, uColor: new Color(0x000000) },
  resolveLygia(vertexShader),
  resolveLygia(fragmentShader)
);

export default Test;
