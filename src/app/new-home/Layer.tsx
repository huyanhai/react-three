"use client";
import { Environment, Sphere } from "@react-three/drei";
import { LayerMaterial, Gradient } from "lamina";
import React from "react";
import * as THREE from "three";

const Layer = () => {
  return (
    <>
      <Environment preset="sunset" />
      {/* 背景层 */}
      {/* 渐变背景 */}
      <Sphere args={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial lighting="physical" transmission={1} side={THREE.DoubleSide}>
          <Gradient colorA={"black"} colorB={"white"} axes="y" start={0} end={-0.1} />
        </LayerMaterial>
      </Sphere>
    </>
  );
};

export default Layer;
