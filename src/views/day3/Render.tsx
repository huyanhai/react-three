import {
  useGLTF,
  MeshTransmissionMaterial,
  Float,
  useTexture
} from '@react-three/drei';
import { BackSide, DoubleSide, Mesh } from 'three';
import { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import {
  BrightnessContrast,
  EffectComposer,
  GodRays
} from '@react-three/postprocessing';

const Ware = () => {
  const wareRef = useRef<Mesh>(new Mesh());
  const { nodes } = useGLTF('/modules/ware.gltf');

  useFrame(({ camera, pointer }, delta) => {
    // wareRef.current.rotation.z += 0.001;
    if (camera.position.z > 50) {
      camera.position.z -= 0.02;
    }
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
      <meshPhysicalMaterial color={'white'} side={BackSide} roughness={0.4} />
    </mesh>
  );
};

const TextCom = () => {
  const { nodes } = useGLTF('/modules/sp1.glb');
  const envMap = useTexture('/hdr/studio_small_09_4k.exr');

  const spRef = useRef<Mesh>(new Mesh());

  useFrame(() => {
    spRef.current.rotation.z += 0.001;
  });

  return (
    <group>
      <mesh
        geometry={(nodes.sp as Mesh).geometry}
        position={[0, 0, 16]}
        scale={0.8}
        ref={spRef}
      >
        <MeshTransmissionMaterial
          backsideThickness={5}
          thickness={2}
          side={BackSide}
          reflectivity={1.52}
          envMap={envMap}
          envMapIntensity={1}
          ior={1.72}
          roughness={0}
        />
      </mesh>
      <Float speed={10} rotationIntensity={1} floatIntensity={4} scale={0.8}>
        <mesh
          geometry={(nodes.text as Mesh).geometry}
          scale={1}
          position={[0, 0, 16]}
        >
          <MeshTransmissionMaterial
            backsideThickness={5}
            thickness={2}
            side={BackSide}
            reflectivity={1.52}
            roughness={0.8}
          />
        </mesh>
        <mesh
          geometry={(nodes.text as Mesh).geometry}
          scale={0.96}
          position={[0, 0, 16]}
        >
          <meshBasicMaterial color={'red'} />
        </mesh>
      </Float>
    </group>
  );
};

const Light = () => {
  return (
    <>
      <pointLight
        distance={4000}
        intensity={50000}
        color={'white'}
        position={[0, 0, -250]}
      />
      <pointLight
        distance={4000}
        intensity={50000}
        color={'white'}
        position={[0, 0, -150]}
      />
      <pointLight
        distance={1000}
        intensity={50000}
        color={'orange'}
        position={[0, 0, -100]}
      />
      <pointLight
        distance={1000}
        intensity={40000}
        color={'red'}
        position={[0, 0, 0]}
      />
      <pointLight
        distance={1000}
        intensity={50000}
        color={'red'}
        position={[0, 0, 100]}
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
