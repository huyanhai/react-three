"use client";
import React, { useState } from "react";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShader from "./glsl/fragmentShader.glsl";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";

const Shader = () => {
  const [time, setTime] = useState(0.5);
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  useFrame((state, delta) => {
    // console.log(state);
    setTime((time) => time + delta);
    const dpr = 1.5;
    setScreen(new Vector2(state.size.width * dpr, state.size.height * dpr));
  });
  return <shaderMaterial args={[{ uniforms: { uTime: { value: time }, uScreen: { value: screen } }, fragmentShader }]} />;
};

export default Shader;
