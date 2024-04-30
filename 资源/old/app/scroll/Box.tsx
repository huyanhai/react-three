"use client";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect } from "react";
import THREE from "three";

const Box = (props: any) => {
  const scroll = useScroll();
  const { scene, animations, nodes } = useGLTF("/models/g2.glb");
  const { actions } = useAnimations(animations, scene);
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)));
  useEffect(() => {
    actions["Take 001"].play().paused;
  }, [actions]);
  useFrame((state, delta) => {
    const action = actions["Take 001"];
    // The offset is between 0 and 1, you can apply it to your models any way you like
    // const offset = 1 - scroll.offset;
    // action.time = THREE.MathUtils.damp(action.time, (action.getClip().duration / 2) * offset, 100, delta);
    // state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10);
    action.time = scroll.offset * 10;
    state.camera.position.set(-10, 10, -10);
    state.camera.lookAt(0, 0, 0);
  });
  return <primitive object={scene} {...props} />;
};
useGLTF.preload("/models/g2.glb");
export default Box;
