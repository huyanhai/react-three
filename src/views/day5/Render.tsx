import { shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useThree } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';

const Shader = shaderMaterial(
  {
    u_texture: null,
    u_aspect: 0,
    transparent: true,
    wireframe: true
  },
  vertex,
  fragment
);

extend({ Shader });

const Plane = () => {
  const { viewport } = useThree();
  const texture = useTexture('/cooking.jpg');

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1.0]} />
      <shader u_texture={texture} u_aspect={viewport.aspect} />
    </mesh>
  );
};

const Render = () => {
  return <Plane />;
};

useTexture.preload('/cooking.jpg');

export default Render;
