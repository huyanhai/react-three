"use client";
import { Canvas } from "@react-three/fiber";
import ShaderCom from "./Shader";
import { OrbitControls } from "@react-three/drei";
const Shader = () => {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas  camera={{ position: [0, 0, 10], fov: 40 }}>
        {/* <OrbitControls /> */}
        <mesh>
          <ShaderCom />
          <planeGeometry args={[20, 20]}  />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Shader;
