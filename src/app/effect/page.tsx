"use client";
import Common from "@/components/commpn/Common";
import { Billboard, Box, Text, OrbitControls, ScreenSpace, GradientTexture, GradientType, MeshTransmissionMaterial } from "@react-three/drei";
import React from "react";

const EffectPage = () => {
  return (
    <div className="w-screen h-screen">
      <Common>
        <Box>
          {/* roughness 透明度 */}
          {/* thickness 粗糙度 */}
          <MeshTransmissionMaterial distortionScale={1} temporalDistortion={0.5} color={"blue"} roughness={0.5} thickness={1} />
          {/* 渐变纹理 */}
          {/* <meshBasicMaterial>
            <GradientTexture stops={[0, 1]} colors={["red", "blue"]} type={GradientType.Linear} innerCircleRadius={1} outerCircleRadius={"auto"}></GradientTexture>
          </meshBasicMaterial> */}
        </Box>
        <Box position={[0, 0, 2]}>
          <MeshTransmissionMaterial distortionScale={1} temporalDistortion={0.5} color={"red"} roughness={0} thickness={0.5} />
        </Box>
        <OrbitControls />
      </Common>
    </div>
  );
};

export default EffectPage;
