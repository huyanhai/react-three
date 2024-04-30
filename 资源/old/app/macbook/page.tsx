"use client";
import { Image, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import M1 from "./M1";

const MacBook = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, -3.2, 40], fov: 12 }}>
        <ScrollControls pages={5}>
          <Scroll>
            <M1 />
          </Scroll>
          <Scroll html>
            {/* <h1 className="absolute top-5">1</h1>
            <h1 className="absolute top-10">1</h1> */}
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default MacBook;
