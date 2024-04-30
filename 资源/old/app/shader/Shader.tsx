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
  const texture = useTexture(["p6.jpg", "p4.jpg", "p5.jpg"]);

  const shaderRef = useRef<any>();

  const [time, setTime] = useState(0.5);
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));

  const [strength, setStrength] = useState(0.1);
  const mouse = useMouse();

  const dpi = window.devicePixelRatio;

  useFrame((state, delta) => {
    setTime((time) => time + delta);
    setScreen(new Vector2(state.size.width, state.size.height));
    setMousePosition(new Vector2(state.mouse.x / 2 + 0.5, state.mouse.y / 2 + 0.5));
    if (strength > 0) {
      setStrength(strength - 0.001);
    } else {
      setStrength(0);
    }
  });

  return (
    <shaderMaterial
      ref={shaderRef}
      args={[
        {
          uniforms: {
            uTime: { value: time },
            uScreen: { value: screen },
            u_texture: { value: texture[index] },
            u_dpi: { value: window.devicePixelRatio },
            u_mouse: { value: mousePosition },
            u_strength: { value: strength },
          },
          fragmentShader,
          vertexShader,
        },
      ]}
    />
  );
};

useTexture.preload("p2.jpg");
export default Shader;
