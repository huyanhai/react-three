"use client";

import { Box, OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh } from "three";

const BoxContainer = () => {
  const light = useRef<Mesh>();
  useFrame((state) => {
    light.current?.position.set(state.pointer.x * 5, state.pointer.y * 5, 0);
  });
  const { ...config } = useControls({
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });
  return (
    <>
      {/* <SoftShadows {...config} /> */}
      {/* <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}></directionalLight> */}
      <Box castShadow position={[0, 2, 0]} args={[2, 2, 2]}>
        <meshBasicMaterial />
      </Box>
      <Box castShadow position={[4, 2, 0]} args={[2, 2, 2]}>
        <meshBasicMaterial />
      </Box>
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <shadowMaterial opacity={0.4} transparent />
      </Plane>
      <Box ref={light}>
        <meshBasicMaterial color={"red"} />
      </Box>
      <OrbitControls />
    </>
  );
};

useGLTF.preload("/models/g1.glb");

export default BoxContainer;
