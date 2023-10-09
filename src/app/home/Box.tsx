"use client";
import { MeshProps, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

import { IBox } from "./type";
import Common from "./Common";

const Box = (props: IBox) => {
  const { color } = props;

  const mesh = useRef<MeshProps>(null);
  useFrame((state, delta) => (mesh.current!.rotation.y += delta));
  return (
    <>
      <mesh ref={mesh}>
        <coneGeometry args={[1, 2, 4]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Common />
    </>
  );
};

export default Box;
