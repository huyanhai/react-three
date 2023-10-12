import { CameraControls, Gltf, MeshPortalMaterial, OrbitControls, Text } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { geometry, easing } from "maath";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
extend(geometry);

import { useCard } from "@/store/useCard";

const Rig = ({ position = new THREE.Vector3(0, 0, 10), focus = new THREE.Vector3(0, 0, 0) }) => {
  const { controls, scene } = useThree();
  const name = useCard((state) => state.name);

  useEffect(() => {
    if (name) {
      const active = scene.getObjectByName(name);
      if (active) {
        // 相机位置
        active.parent!.localToWorld(position.set(0, 0, 0.8));
        // 目标目标
        active.parent!.localToWorld(focus.set(0, -4, -10));
      }
    }

    // true表示是否需要过度
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, [name]);

  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
};

export const Card = ({ children, ...props }: { children: React.ReactNode }) => {
  const setName = useCard((state) => state.setName);
  const name = useCard((state) => state.name);

  const portal = useRef();

  const doubleClick = (e) => {
    e.stopPropagation();
    setName(props.name);
  };

  useFrame((state, dt) => easing.damp(portal.current, "blend", name === props.name ? 1 : 0, 0.2, dt));

  return (
    <group {...props}>
      <Text fontSize={1} anchorY="top" anchorX="left" lineHeight={0.8} position={[-1.5, 2.5, 0.2]} material-toneMapped={false}> 
        title
      </Text>
      <mesh onDoubleClick={doubleClick}>
        <roundedPlaneGeometry args={[4, 6.4, 0.1]} />
        {/* 门户，可以将3维场景放到这个里面 */}
        <MeshPortalMaterial ref={portal} events={name === props.name}>
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
};

const BoxContainer = () => {
  return (
    <>
      <Card position={[0, 0, 0]} rotation={[0, 0, 0]} name="p1">
        <Gltf src="/models/p2.glb" scale={1.5} position={[0, -5, -5]} />
      </Card>
      <Rig />
      {/* <OrbitControls /> */}
    </>
  );
};

export default BoxContainer;
