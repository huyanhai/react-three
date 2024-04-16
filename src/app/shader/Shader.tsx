"use client";
import React, { useEffect, useState } from "react";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShader from "./glsl/fragmentShader.glsl";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector2 } from "three";
import { useTexture } from "@react-three/drei";
import { useMouse } from "ahooks";

const Shader = () => {
  // 导入贴图
  const texture = useTexture("p3.jpg");
  const [time, setTime] = useState(0.5);
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));
  const mouse = useMouse();

  const dpi = window.devicePixelRatio;

  useFrame((state, delta) => {
    // console.log(state);
    setTime((time) => time + delta);
    const size = Math.min(state.size.width, state.size.height);
    setScreen(new Vector2(size * dpi, size * dpi));
  });

  useEffect(() => {
    const { clientX, clientY } = mouse;
    setMousePosition(new Vector2(clientX, clientY));
  }, [mouse]);
  return (
    <shaderMaterial
      args={[
        {
          uniforms: { uTime: { value: time }, uScreen: { value: screen }, u_texture: { value: texture }, u_dpi: { value: window.devicePixelRatio }, u_mouse: { value: mousePosition } },

          fragmentShader,
          vertexShader,
        },
      ]}
    />
  );
};

useTexture.preload("p2.jpg");
export default Shader;
