"use client";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";

const Box = () => {
  const scroll = useScroll();
  useFrame((state) => {
    const offset = 1 - scroll.offset;
    state.camera.position.set(Math.sin(offset) * 10, Math.sin(offset) * 10, Math.cos(offset) * 10);
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

export default Box;
