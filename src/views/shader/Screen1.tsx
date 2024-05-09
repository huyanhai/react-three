import { useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  Stars,
  useFBX,
  useGLTF,
  useTexture
} from '@react-three/drei';
import { LayerMaterial, Depth } from 'lamina';
import {
  BackSide,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  TorusGeometry,
  Color,
  Vector3,
  MeshPhysicalMaterial
} from 'three';
import Light from './Light';

const Screen1 = () => {
  const torusKnotRef = useRef();
  const lightRef = useRef();

//   const { scene } = useGLTF('room.glb');
  const {scene} = useGLTF('test.glb');
  const texture = useTexture('baked.jpg');
  const texture1 = useTexture('ground.jpg');
  texture.flipY = false;

  const { roughness, metalness, color, strength, light1, light2, light3 } =
    useControls({
      roughness: {
        min: 0,
        max: 1,
        value: 0.5
      },
      metalness: { min: 0, max: 1, value: 0.0 },
      color: 'white',
      light1: 'red',
      light2: 'blue',
      light3: 'green',
      strength: {
        min: 100,
        max: 10000,
        step: 1000,
        value: 1000
      }
    });

  useFrame(() => {
    // torusKnotRef.current.rotation.y += 0.01;
  });

  useEffect(() => {
    // scene.traverse((child) => {
    //   if (child.name == 'ground') {
    //     child.material = new MeshPhysicalMaterial({
    //       emissive: 0xffffff,
    //       emissiveMap: texture1
    //     });
    //     child.position.set(0, 0, -0.4);
    //   } else {
    //     child.material = new MeshPhysicalMaterial({
    //       emissive: 0xffffff,
    //       emissiveMap: texture,
    //       opacity: 0.5
    //     });
    //   }
    // });
    scene.scale.set(0.1, 0.1, 0.1);

  }, [scene]);

  return (
    <>
      <primitive object={scene} ref={torusKnotRef} />

      {/* <mesh>
        <meshPhysicalMaterial
          metalness={metalness}
          roughness={roughness}
          clearcoatRoughness={0}
          clearcoat={0}
          reflectivity={0.5}
          transparent
          opacity={0.5}
          color={'white'}
        />
        <torusKnotGeometry args={[1, 0.4, 100, 100]} />
      </mesh> */}

      <Light position={[-10.0, 5.0, 0.0]} color={light1} intensity={strength} />
      <Light position={[0.0, 5.0, -10.0]} color={light2} intensity={strength} />
      <Light position={[10.0, 5.0, 0.0]} color={light3} intensity={strength} />
      <Light position={[0.0, 10.0, 10.0]} color={color} intensity={strength} />
    </>
  );
};

export default Screen1;
