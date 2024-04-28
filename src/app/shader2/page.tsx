"use client";
import { Canvas } from "@react-three/fiber";
import ShaderCom from "./Shader";
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { useState } from "react";
import { useControls } from "leva";

const Shader = () => {
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [strength, setStrength] = useState(20.0);

  const { roughness, thickness } = useControls({
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.1, min: 0, max: 0.3, step: 0.01 },
  });

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
      <Canvas camera={{ position: [0, 0, 30], fov: 20 }}>
        <OrbitControls />
        <mesh>
          <ShaderCom index={index} start={start} end={end} strength={strength} updateStrength={updateStrength} roughness={roughness} thickness={thickness} />
          <sphereGeometry args={[3, 100, 100]} />
        </mesh>
        {/* <mesh>
          <meshPhysicalMaterial />
          <boxGeometry args={[10, 10, 10]} />
        </mesh> */}
        <directionalLight color={"blue"} castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}></directionalLight>
        {/* <Html fullscreen className="text-slate-400 font-sans uppercase text-6xl"></Html> */}
      </Canvas>
    </div>
  );
};

export default Shader;
