"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Render from "./Render";
import Overlay from "./Overlay";

const Demo = () => {
  return (
    <div className="h-screen">
      <Overlay />
      <Canvas shadows camera={{ position: [-15, 15, 18], fov: 50 }}>
        <Render />
      </Canvas>
    </div>
  );
};

export default Demo;
