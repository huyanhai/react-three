import { Clone, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";

const Box = () => {
  const { scene, animations } = useGLTF("/models/g2.glb");

  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions["Take 001"]?.play();
  }, [actions]);

  return (
    <>
      {/* 复制对象 */}
      <primitive object={scene} position={[0, 2, 10]} scale={0.01} />
      {/* 克隆后不会执行动画 */}
      {/* <Clone object={scene} scale={0.01} position={[0, 2, 10]} deep="geometriesOnly" />
      <Clone object={scene} scale={0.01} position={[0, 2, -10]} deep="materialsOnly" /> */}
    </>
  );
};

useGLTF.preload("/models/g2.glb");

export default Box;
