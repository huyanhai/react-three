"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const Plan = (props: any) => {
  const oar = useRef<any>();
  const { nodes, materials } = useGLTF("models/Airplane.glb");
  useFrame((state, delta) => {
    // oar.current.rotation.x += delta * 10;
  });
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.PUSHILIN_Plane_Circle000.geometry} material={materials.plane} />
      <mesh castShadow receiveShadow geometry={nodes.PUSHILIN_Plane_Circle001.geometry} material={materials.plane} ref={oar} />
    </group>
  );
};
useGLTF.preload("/Airplane.glb");
export default Plan;
