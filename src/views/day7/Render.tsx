import { useRef } from 'react';
import { BackSide, Color, Group, Mesh, Vector2, Vector3 } from 'three';
import {
  RoundedBox,
  shaderMaterial,
  MeshTransmissionMaterial,
  useFBO,
  useTexture
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import vertex from './glsl/vertex.vert';
import fragment from './glsl/fragment.frag';
import { useControls } from 'leva';
import { useState } from 'react';

const Shader = shaderMaterial(
  {
    u_color: new Color(),
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

const Background = (props: any) => {
  const meshRef = useRef<Mesh>(new Mesh());
  const [time, setTime] = useState(0);
  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });
  const { color } = useControls({
    color: {
      value: 'blue'
    }
  });

  return (
    <group scale={0.9}>
      <mesh {...props} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <shader side={BackSide} u_color={color} u_time={time} />
      </mesh>
      <mesh position={[0,0,-0.9]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={'black'} />
      </mesh>
    </group>
  );
};

const Glass = () => {
  const buffer = useFBO();
  const normal = useTexture('/normals/dirt1.png');
  const boxRef = useRef<Mesh>(new Mesh());
  // normal.wrapS = normal.wrapT = 100;

  useFrame((state) => {
    boxRef.current.visible = false;
    state.gl.setRenderTarget(buffer);
    state.gl.render(state.scene, state.camera);
    state.gl.setRenderTarget(null);
    boxRef.current.visible = true;
  });

  return (
    <RoundedBox args={[1, 1, 0.1]} ref={boxRef}>
      <MeshTransmissionMaterial
        roughness={0.1}
        buffer={buffer.texture}
        normalMap={normal}
        thickness={0.1}
        normalScale={new Vector2(0.2, 0.2)}
      />
    </RoundedBox>
  );
};

const Render = () => {
  const groupRef = useRef<Group>(new Group());
  return (
    <group ref={groupRef}>
      <Background position={[0, 0, -0.5]} />
      <Glass />
    </group>
  );
};

export default Render;
