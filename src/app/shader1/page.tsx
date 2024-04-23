"use client";
import { Canvas } from "@react-three/fiber";
import ShaderCom from "./Shader";
import { Html, OrbitControls } from "@react-three/drei";
import { useState } from "react";
const Shader = () => {
  const [index, setIndex] = useState(0);
  const [strength, setStrength] = useState(10.0);

  const updateStrength = (e: number) => {
    if (strength < 20) {
      setStrength(e);
    }
  };

  const next = () => {
    setIndex(index > 0 ? 0 : index + 1);
    setStrength(10)
  };
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas camera={{ position: [0, 0, 10], fov: 100 }}>
        {/* <OrbitControls /> */}
        <mesh>
          <ShaderCom index={index} strength={strength} updateStrength={updateStrength} />
          <planeGeometry args={[20, 20]} />
        </mesh>
        <Html fullscreen className="text-slate-400 font-sans uppercase text-6xl">
          <button className="absolute top-0 left-0" onClick={() => next()}>
            next
          </button>
        </Html>
      </Canvas>
    </div>
  );
};

export default Shader;
