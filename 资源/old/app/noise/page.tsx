"use client";
import { Canvas } from "@react-three/fiber";
import ShaderCom from "./Shader";
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { useState } from "react";

const Shader = () => {
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [strength, setStrength] = useState(20.0);

  const updateStrength = (e: number) => {
    if (strength > 10) {
      setStrength(e);
    }
  };

  const next = () => {
    setStart(index);

    setStrength(20);

    if (end < 2) {
      setEnd(end + 1);
    } else {
      setEnd(0);
    }

    setTimeout(() => {
      setStart(end);
    });
  };
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas camera={{ position: [0, 0, 10], fov: 100 }}>
        <OrbitControls />
        <mesh>
          <ShaderCom index={index} start={start} end={end} strength={strength} updateStrength={updateStrength} />
          <boxGeometry args={[20, 20, 20]} />
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
