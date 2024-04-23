"use client";
import React, { useEffect, useRef, useState } from "react";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShader from "./glsl/fragmentShader.glsl";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector2 } from "three";
import { useTexture, Html } from "@react-three/drei";
import { useMouse } from "ahooks";

const Shader = (props: any) => {
  const { index, strength, updateStrength } = props;
  // 导入贴图
  const texture = useTexture(["p6.jpg", "p4.jpg", "p5.jpg"]);

  const shaderRef = useRef<any>();

  const [time, setTime] = useState(0.5);
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));

  useFrame((state, delta) => {
    setTime((time) => time + delta);
    setScreen(new Vector2(state.size.width, state.size.height));
    setMousePosition(new Vector2(state.mouse.x / 2 + 0.5, state.mouse.y / 2 + 0.5));
    updateStrength(strength + 0.1);
  });

  return (
    <>
      <shaderMaterial
        ref={shaderRef}
        args={[
          {
            uniforms: {
              uTime: { value: time },
              uScreen: { value: screen },
              u_texture: { value: texture[index] },
              u_nextTexture: { value: texture[index + 1] },
              u_dpi: { value: window.devicePixelRatio },
              u_mouse: { value: mousePosition },
              u_strength: { value: strength },
            },
            fragmentShader,
            vertexShader,
          },
        ]}
      />
    </>
  );
};

useTexture.preload("p2.jpg");
export default Shader;
