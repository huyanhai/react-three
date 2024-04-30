"use client";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import { PresentationControls } from "@react-three/drei";

const PresentationControlsPage = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [3, 3, 3] }}>
        {/* snap - 对齐回中心 */}
        <PresentationControls snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <Box />
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default PresentationControlsPage;
