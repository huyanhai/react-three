"use client";
import { Canvas } from "@react-three/fiber";
import { A11y, A11yAnnouncer } from "@react-three/a11y";
import { Environment, GradientTexture, Grid, OrbitControls, Sky } from "@react-three/drei";
import Plan from "./plan";
import { useControls } from "leva";

const page = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows={true} camera={{ position: [0, 5, 10] }}>
        <Environment files={"hdr/tief_etz_4k.exr"} />
        {/* 雾 */}
        {/* <fog attach="fog" args={["#17171b", 30, 20]} /> */}
        <color attach="background" args={["#fefefe"]} />
        {/* <GradientTexture colors={["red", "blue"]} stops={[0, 1]} /> */}
        <OrbitControls />
        {/* <pointLight castShadow position={[1, 1, 1]} color={"white"} intensity={100} /> */}
        <Grid position={[0, -0.5, 0]} args={[10.5, 10.5]} infiniteGrid={true} cellColor={"#fefefe"} cellThickness={1} sectionThickness={0} fadeDistance={100} fadeStrength={10} cellSize={1} />
        <Plan />
        {/* <ambientLight intensity={10} color={"white"} /> */}
      </Canvas>
      <A11yAnnouncer />
    </div>
  );
};

export default page;
