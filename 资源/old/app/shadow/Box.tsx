"use client";
import {
  AccumulativeShadows,
  Backdrop,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  Plane,
  RandomizedLight,
  SoftShadows,
  Sparkles,
  SpotLight,
  SpotLightShadow,
  useGLTF,
} from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";

import * as THREE from "three";

import { Color, Depth, LayerMaterial } from "lamina";
import { applyProps, useFrame } from "@react-three/fiber";

function Suzi(props) {
  const { scene, materials } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf");
  useLayoutEffect(() => {
    scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true));
    materials.default.color.set("orange");
    materials.default.roughness = 0.5;
    materials.default.normalScale.set(0.1, 0.1);
  });
  return <primitive object={scene} {...props} />;
}

function Car(props: any) {
  const { scene, materials, nodes } = useGLTF("/models/911.glb");
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true));
    applyProps(materials.rubber, { color: "#222", roughness: 0.6, roughnessMap: null, normalScale: [4, 4] });
    applyProps(materials.window, { color: "black", roughness: 0, clearcoat: 0.1 });
    applyProps(materials.coat, { envMapIntensity: 4, roughness: 0.5, metalness: 1 });
    applyProps(materials.paint, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: "#555" });
  }, [nodes, materials]);
  return <primitive object={scene} {...props} />;
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<any>();
  useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60));
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* 红色灯 */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* 背景 */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  );
}

const BoxContainer = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Car scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />

      {/* <AccumulativeShadows position={[0, -1.25, 0]} frames={10} alphaTest={0.9} scale={10}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
      </AccumulativeShadows> */}

      <Backdrop receiveShadow={true} scale={[20, 10, 20]} position={[-1, -1.3, -4]}>
        {/* <meshPhysicalMaterial roughness={0.5} /> */}
        <shadowMaterial transparent opacity={0.4} />
      </Backdrop>

      {/* <Sparkles color={"blue"} position={[10, 10, 10]} /> */}

      <Environment frames={Infinity} resolution={256} background blur={1}>
        <Lightformers />
      </Environment>

      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    </>
  );
};

useGLTF.preload("/models/911.glb");

export default BoxContainer;
