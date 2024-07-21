import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { BackSide, Mesh } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const Ware = () => {
  const wareRef = useRef<Mesh>(new Mesh());
  const { nodes } = useGLTF('/modules/ware.gltf');

  useFrame(({ camera, pointer }, delta) => {
    wareRef.current.rotation.z += 0.001;
    camera.position.z += 0.02;
    easing.damp3(
      camera.position,
      [-pointer.x, -pointer.y, camera.position.z],
      0.2,
      delta
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh geometry={(nodes.yz as Mesh).geometry} ref={wareRef}>
      <meshPhysicalMaterial color={'white'} side={BackSide} roughness={0.1} />
    </mesh>
  );
};

const TextCom = () => {
  const { nodes } = useGLTF('/modules/sp.gltf');
  console.log('nodes', nodes);

  return (
    <group>
      <mesh geometry={(nodes.sp as Mesh).geometry}>
        <MeshTransmissionMaterial
          backsideThickness={5}
          thickness={2}
        />
      </mesh>
      <mesh geometry={(nodes.text as Mesh).geometry} scale={0.8}>
        <meshPhysicalMaterial color={'red'} side={BackSide} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Light = () => {
  return (
    <>
      <pointLight
        distance={1000}
        intensity={1000}
        color={'red'}
        position={[-10, -10, 5]}
      />
      <pointLight
        distance={1000}
        intensity={1000}
        color={'blue'}
        position={[10, 10, 0]}
      />
      <pointLight
        distance={1000}
        intensity={500}
        color={'yellow'}
        position={[2, 2, 0]}
      />
    </>
  );
};

const Render = () => {
  return (
    <>
      <Ware />
      <Light />
      <TextCom />
    </>
  );
};

export default Render;
