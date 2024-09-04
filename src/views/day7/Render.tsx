import { forwardRef, useRef, useState } from 'react';
import { BackSide, Color, Group, Mesh, Vector2 } from 'three';
import {
  RoundedBox,
  shaderMaterial,
  MeshTransmissionMaterial,
  useFBO,
  useTexture,
  Text3D
} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import vertex from './glsl/vertex.vert';
import fragment from './glsl/fragment.frag';
import { easing } from 'maath';

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

const Background = forwardRef((props: any, ref: any) => {
  const meshRef = useRef<Mesh>(new Mesh());
  const shaderRef = useRef<typeof Shader>();
  const [time, setTime] = useState(0);
  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });

  return (
    <group scale={0.9} ref={ref}>
      <mesh {...props} ref={meshRef}>
        <boxGeometry args={[1, 1, 2]} />
        <shader side={BackSide} u_time={time} ref={shaderRef} />
      </mesh>
    </group>
  );
});

const TextCom = () => {
  return (
    <group>
      <Text3D
        font={'/font/Montserrat Alternates_Bold.json'}
        size={0.2}
        position={[-0.4, 0.1, -1]}
        rotation={[0, Math.PI / 10, 0]}
        height={0.05}
      >
        hello
        <meshBasicMaterial color={'#b900ff'} />
      </Text3D>
      <Text3D
        font={'/font/Montserrat Alternates_Bold.json'}
        size={0.2}
        position={[-0.43, -0.2, -0.9]}
        rotation={[0, -Math.PI / 10, 0]}
        height={0.05}
      >
        world
        <meshBasicMaterial color={'red'} />
      </Text3D>
    </group>
  );
};

const Glass = () => {
  const buffer = useFBO();
  const normal = useTexture('/normals/dirt1.png');
  const boxRef = useRef<Mesh>(new Mesh());

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
  const bgRef = useRef<typeof Background>();
  useFrame(({ camera, pointer }, delta) => {
    if (camera.position.z > 50) {
      camera.position.z -= 0.02;
    }
    easing.damp3(
      camera.position,
      [-pointer.x / 2, -pointer.y / 2, camera.position.z],
      0.2,
      delta
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Background position={[0, 0, -1]} />
      <Glass />
      <TextCom />
    </group>
  );
};

export default Render;
