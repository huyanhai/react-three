"use client";
import { Html, useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const Mac = () => {
  const screen = useRef<GroupProps>();
  const { nodes, materials } = useGLTF("mac.glb");

  useFrame((state) => {
    screen.current.rotation.x = Math.sin(state.clock.getElapsedTime());
  });

  console.log(nodes, materials);

  return (
    <group>
      <group>
        <mesh geometry={nodes.Cube002.geometry} material={materials.aluminium} />
        <mesh position={[1.8, 0.1, 0.1]} geometry={nodes.keyboard.geometry} material={materials.keys} />
        <mesh position={[0, 0.1, -2.15]} geometry={nodes.touchbar.geometry} material={materials.keys} />
      </group>
      <group rotation-x={-0.425} position={[0, 0, -3]} ref={screen}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes["Cube008"].geometry} />
          <mesh material={materials["matte.001"]} geometry={nodes["Cube008_1"].geometry} />
          <mesh geometry={nodes["Cube008_2"].geometry}>
            {/* Drei's HTML component can "hide behind" canvas geometry */}
            <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
              <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                文本
              </div>
            </Html>
          </mesh>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("mac.glb");
export default Mac;
