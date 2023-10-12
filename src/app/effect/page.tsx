"use client";
import Common from "@/components/commpn/Common";
import { Box, OrbitControls, MeshTransmissionMaterial, useGLTF, Clone, useAnimations, Decal } from "@react-three/drei";
import Box1 from "./Box1";
import Box2 from "./Box2";

const EffectPage = () => {
  return (
    <div className="w-screen h-screen">
      <Common>
        <Box1 />
        <Box2 />
        <OrbitControls />
      </Common>
    </div>
  );
};

export default EffectPage;
