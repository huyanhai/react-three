"use client";
import { Canvas } from "@react-three/fiber";
import Base from "./Base";

const Common = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      <Base />
      {children}
    </Canvas>
  );
};

export default Common;
