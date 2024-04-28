"use client";
import React, { useEffect, useRef, useState } from "react";
import vertexShader from "./glsl/vertexShader.glsl";
import fragmentShader from "./glsl/fragmentShader.glsl";
import { useFrame, useLoader } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { useTexture, Html } from "@react-three/drei";
import { useMouse } from "ahooks";

const Shader = (props: any) => {
  const texture = useTexture(["p6.jpg", "p4.jpg", "p5.jpg"]);

  const { strength, updateStrength, start, end, roughness, thickness } = props;
  // 导入贴图

  const shaderRef = useRef<any>();
  const [camera, setCamera] = useState<Vector3>(new Vector3());
  const [time, setTime] = useState(0.5);
  const [speed] = useState(Math.random());
  const [screen, setScreen] = useState<Vector2>(new Vector2(0, 0));
  const [mousePosition, setMousePosition] = useState<Vector2>(new Vector2(0, 0));

  useFrame((state, delta) => {
    setTime(state.clock.getElapsedTime());
    setScreen(new Vector2(state.size.width, state.size.height));
    setMousePosition(new Vector2(state.mouse.x / 2 + 0.5, state.mouse.y / 2 + 0.5));
    setCamera(state.camera.position);
    updateStrength(strength - 0.4);
  });

  return (
    <>
      <shaderMaterial
        wireframe={false}
        ref={shaderRef}
        args={[
          {
            uniforms: {
              u_time: { value: time },
              u_screen: { value: screen },
              u_dpi: { value: window.devicePixelRatio },
              u_mouse: { value: mousePosition },
              u_strength: { value: strength },
              u_textures: { value: texture },
              u_start: { value: start },
              u_end: { value: end },
              u_light: { value: new Vector3(2.5, 8, 5) },
              u_camera: { value: camera },
              u_speed: { value: speed },
              u_roughness: { value: roughness },
              u_thickness: { value: thickness },
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
