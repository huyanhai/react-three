"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import ShaderCom from "./Shader";
import { OrbitControls } from "@react-three/drei";
const Shader = () => {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas>
        <OrbitControls />
        <mesh>
          <ShaderCom />
          <planeGeometry args={[2, 2]} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Shader;
