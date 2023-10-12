"use client";
import { Canvas } from "@react-three/fiber";
import Base from "./Base";
import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";

// 自定义进度加载器
const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center className="w-screen h-screen bg-black text-white flex justify-center items-center">{parseInt(`${progress}`)} % loaded</Html>;
};

const Common = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} shadows={true}>
        <Suspense fallback={<Loader />}>
          <Base />
          {children}
        </Suspense>
      </Canvas>
    </>
  );
};

export default Common;
