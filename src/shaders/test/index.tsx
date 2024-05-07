import vertexShader from './glsl/vertexShader.vert?raw';
import fragmentShader from './glsl/fragmentShader.frag?raw';
import { resolveLygia } from 'resolve-lygia';
import { shaderMaterial } from '@react-three/drei';

const Test = shaderMaterial(
  {},
  resolveLygia(vertexShader),
  resolveLygia(fragmentShader)
);

export default Test;
