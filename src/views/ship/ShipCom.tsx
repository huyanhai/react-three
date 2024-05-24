import { useGLTF } from '@react-three/drei';
import React from 'react';

const ShipCom = () => {
  const { nodes, materials } = useGLTF('spaceship.gltf');
  return (
    <>
      <group>
        <mesh geometry={nodes.Ship_Body.geometry}>
          <meshStandardMaterial
            attach="material"
            color="lightblue"
            metalness={0.8}
            reflectivity={1}
            clearcoat={1}
            roughness={0}
          />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Ship_Body_1.geometry}
          material={materials.Chassis}
        />
        <mesh geometry={nodes.Ship_Body_2.geometry}>
          <meshBasicMaterial attach="material" color="yellow" />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.Ship_Body_3.geometry}
          material={materials['Gray Metal']}
        />
        <mesh geometry={nodes.Ship_Body_4.geometry}>
          <meshBasicMaterial attach="material" color="blue" />
        </mesh>
      </group>
    </>
  );
};

export default ShipCom;
