"use client";
import { Box, Environment, Float, Line, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";
import Plan from "./Plan";
import Layer from "./Layer";

import * as THREE from "three";

const Page = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([new THREE.Vector3(-5, -5, 0), new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 5, 0), new THREE.Vector3(5, 3, 0)]);
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(50);
  }, [curve]);
  return (
    <div className="w-full h-screen">
      <Canvas>
        {/* 设置背景 */}
        <color args={["#dedede"]} attach="background" />
        <OrbitControls enabled={false} />
        <ambientLight intensity={0.5} />
        <Float floatIntensity={2} speed={10}>
          <Plan />
        </Float>
        <Line points={linePoints} color={"white"} transparent lineWidth={4} />
        <Layer />
      </Canvas>
    </div>
  );
};

export default Page;
