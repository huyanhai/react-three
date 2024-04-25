"use client";

import { useGLTF } from "@react-three/drei";

const Desktop = () => {
  const { scene, nodes, materials } = useGLTF("work.glb");
  console.log(nodes, materials);

  return (
    <group>
      <primitive object={scene}>
        <meshPhysicalMaterial color={"red"} />
      </primitive>
      {/* <mesh geometry={nodes.face.geometry} material={materials.face} />
      <mesh geometry={nodes.foot.geometry} material={materials.foot} /> */}
    </group>
  );
};

useGLTF.preload("work.glb");

export default Desktop;
