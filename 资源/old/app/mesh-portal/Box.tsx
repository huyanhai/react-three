"use client";
import { AccumulativeShadows, Backdrop, Box, MeshPortalMaterial, OrbitControls, Plane, RandomizedLight, Shadow, SoftShadows } from "@react-three/drei";
import React, { ReactNode, useEffect } from "react";
import * as THREE from "three";
const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
const yPlane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
const Frame = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Plane args={[5, 4]}>
        <MeshPortalMaterial>
          <color attach="background" args={["#e4cdac"]} />
          {children}
        </MeshPortalMaterial>
      </Plane>
    </>
  );
};

const Modal = ({ clip }: { clip?: boolean }) => {
  return (
    <Box castShadow position={[0, 0.5, 2]}>
      <meshNormalMaterial color={"red"} clippingPlanes={clip ? [zPlane, yPlane] : null} side={THREE.DoubleSide} />
    </Box>
  );
};

const BoxContainer = () => {
  return (
    <>
      {/* <Frame>
        <Modal />
      </Frame> */}
      <group>
        <Modal clip={true} />
        <AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true} alphaTest={0.75} opacity={2} scale={12}>
          <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
        </AccumulativeShadows>
        <Backdrop floor={1} receiveShadow={true} segments={20} scale={[5, 5, 5]}>
          <meshPhysicalMaterial roughness={0.5} />
          {/* <Shadow fog={true} /> */}
        </Backdrop>
      </group>
      <OrbitControls />
    </>
  );
};

export default BoxContainer;
