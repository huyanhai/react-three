"use client";
import { AccumulativeShadows, Backdrop, ContactShadows, MeshTransmissionMaterial, Shadow, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import React, { useState, useEffect } from "react";
import { Color, Mesh } from "three";

const plan = () => {
  const { nodes } = useGLTF("box.glb");
  const [materials, setMaterials] = useState<any>([]);

  console.log("nodes", nodes, nodes.box);

  useEffect(() => {
    const keys = Object.keys(nodes).filter((key: any) => key !== "Scene");
    const child: any = keys.map((key: any) => {
      return nodes[key].geometry;
    });
    setMaterials(child);
  }, [nodes]);

  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.06, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#c9ffa1",
    bg: "#839681",
  });
  return (
    <group>
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      {materials.map((child: any) => {
        return <mesh castShadow receiveShadow geometry={child} key={child.id} />;
      })}
      <mesh position={[0, 2, 2]}>
        <sphereGeometry args={[1, 32, 32]} />
        {/* <meshStandardMaterial color={"hotpink"} /> */}
        {/* <MeshTransmissionMaterial {...config} /> */}
        <meshPhysicalMaterial color={"#fff"} />
      </mesh>
      <mesh position={[-2, 2, 2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial {...config} />
      </mesh>
      <mesh position={[0, 2, 2]} scale={0.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </group>
  );
};
useGLTF.preload("kira.glb");
export default plan;
