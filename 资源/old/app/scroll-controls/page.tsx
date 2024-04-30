"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Box from "./Box";
import { Environment, MeshReflectorMaterial, PresentationControls, ScrollControls } from "@react-three/drei";

const PageScroll = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [10, 0, 10] }}>
        <Environment preset="dawn" />
        <pointLight position={[1, 1, 1]} intensity={1000} color={"green"} distance={5}></pointLight>
        {/* 滚动控制，会生成浏览器滚动条 */}
        <ScrollControls pages={3}>
          <Box />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[10, 10, 10]} />
            {/* mixStrength 反射强度 */}
            <MeshReflectorMaterial mirror={1} color="#151515" metalness={0} roughness={1}  mixStrength={10}/>
          </mesh>
        </ScrollControls>
        {/* <PresentationControls></PresentationControls> */}
      </Canvas>
    </div>
  );
};

export default PageScroll;
