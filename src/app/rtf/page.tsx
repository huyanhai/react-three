"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Overlay } from "./Overlay";

const Rft = () => {
  return (
    <div id="canvas-container" className="h-screen">
      <Overlay />
      <Canvas>
        <color attach='background' args={['gary']}/>
        <Experience />
      </Canvas>
    </div>
  );
};

export default Rft;
