"use client";
import React, { useState } from "react";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShader from "./glsl/fragmentShader.glsl";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector2 } from "three";
import { useTexture } from "@react-three/drei";

const Shader = () => {
  // 导入贴图
  const texture = useTexture("p3.jpg");
  const [time, setTime] = useState(0.5);
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  useFrame((state, delta) => {
    // console.log(state);
    setTime((time) => time + delta);
    const dpr = 1.5;
    setScreen(new Vector2(state.size.width * dpr, state.size.height * dpr));
  });
  return (
    <shaderMaterial
      args={[{ uniforms: { uTime: { value: time }, uScreen: { value: screen }, u_texture: { value: texture }, u_dpi: { value: window.devicePixelRatio } }, fragmentShader, vertexShader }]}
    />
  );
};

useTexture.preload("p2.jpg");
export default Shader;
