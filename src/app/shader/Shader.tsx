"use client";
import React, { useEffect, useRef, useState } from "react";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShader from "./glsl/fragmentShader.glsl";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector2 } from "three";
import { useTexture } from "@react-three/drei";
import { useMouse } from "ahooks";

const Shader = () => {
  // 导入贴图
  const texture = useTexture(["p3.jpg", "p4.jpg", "p5.jpg"]);

  const shaderRef = useRef<any>();

  const [time, setTime] = useState(0.5);
  const [index, setIndex] = useState(2);
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));
  const mouse = useMouse();

  const dpi = window.devicePixelRatio;

  useFrame((state, delta) => {
    setTime((time) => time + delta);
    setScreen(new Vector2(state.size.width, state.size.height));
  });

  useEffect(() => {
    const { clientX = 0, clientY = 0 } = mouse;
    setMousePosition(new Vector2(clientX || 0, clientY || 0));
  }, [mouse]);

  return (
    <shaderMaterial
      ref={shaderRef}
      args={[
        {
          uniforms: { uTime: { value: time }, uScreen: { value: screen }, u_texture: { value: texture[index] }, u_dpi: { value: window.devicePixelRatio }, u_mouse: { value: mousePosition } },
          fragmentShader,
          vertexShader,
        },
      ]}
    />
  );
};

useTexture.preload("p2.jpg");
export default Shader;
