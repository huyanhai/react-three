import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';

const Shader = shaderMaterial(
  {
    u_texture: null,
    u_aspect: 0,
    u_delta: 0,
    transparent: true,
    wireframe: false,
    u_mouse: null,
    u_uv: null,
    u_move: null,
    u_time: 0,
    u_duration: null
  },
  vertex,
  fragment
);

extend({ Shader });

const Plane = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color={'red'} />
    </mesh>
  );
};

const Render = () => {
  return (
    <>
      <Plane />
    </>
  );
};

export default Render;
