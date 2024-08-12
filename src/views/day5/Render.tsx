import { Html, shaderMaterial, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import { useState } from 'react';
import { useMouse } from '@/hooks/useMouse';
import { tips } from '@/constants';

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
  const pic = useTexture('/text.jpeg');
  const { viewport } = useThree();
  const [time, setTime] = useState(0);
  const mouse = useMouse();

  useFrame((_, delta) => {
    setTime(time + delta);
  });
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1]} />
      <shader
        u_texture={pic}
        u_aspect={viewport.aspect}
        u_time={time}
        u_mouse={mouse}
      />
    </mesh>
  );
};

const Render = () => {
  return (
    <>
      <Plane />
      <Html center className="touch-none">
        <div className=" text-white whitespace-nowrap text-center text-9xl montserrat-alternates-bold touch-none">
          {tips}
        </div>
      </Html>
    </>
  );
};

export default Render;
