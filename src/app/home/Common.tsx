import { Environment, PerspectiveCamera } from "@react-three/drei";
import React from "react";

const Common = () => {
  return (
    <>
      {/* <Environment preset="dawn" /> */}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  );
};

export default Common;
