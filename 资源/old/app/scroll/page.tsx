"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Box from "./Box";
import { PerspectiveCamera, ScrollControls, Sky } from "@react-three/drei";

const ScrollPage = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.03} />
        <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
        <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[25, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
        <fog attach="fog" args={["#ffd0d0", 5, 18]} />
        <ScrollControls pages={3}>
          <Box scale={0.02} position={[0, 2.5, 0]} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default ScrollPage;
