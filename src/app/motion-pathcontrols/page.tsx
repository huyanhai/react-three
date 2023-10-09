"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Box from "./Box";

const MotionPathControlsPage = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [50, 50, 50] }}>
        <Box />
      </Canvas>
    </div>
  );
};

export default MotionPathControlsPage;
