"use client";

import Common from "@/components/commpn/Common";
import BoxContainer from "./Box";
import { OrbitControls } from "@react-three/drei";

const SpotLightPage = () => {
  return (
    <div className="w-screen h-screen">
      <Common>
        <color attach="background" args={["#171720"]} />
        <BoxContainer />
        <OrbitControls />
      </Common>
    </div>
  );
};

export default SpotLightPage;
