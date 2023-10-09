"use client";
import { Environment, OrbitControls, PerspectiveCamera, PivotControls, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import "./style.css";

const page = () => {
  const containerRef = useRef();
  const meshRef = useRef();
  const meshRef1 = useRef();
  return (
    <div ref={containerRef} className="container">
      文本信息
      <div ref={meshRef} className="w-96 h-96" />
      文本信息
      <div ref={meshRef1} className="w-96 h-96" />
      <Canvas eventSource={containerRef} className="canvas">
        <View track={meshRef}>
          <PivotControls>
            <mesh>
              <boxGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          </PivotControls>
          <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
          <OrbitControls makeDefault />
        </View>
        <View track={meshRef1}>
          <mesh>
            <coneGeometry args={[1, 2, 4]} />
            <meshBasicMaterial color="blue" />
          </mesh>
          <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
          <OrbitControls makeDefault />
        </View>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default page;
