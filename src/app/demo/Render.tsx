"use client";

import { useView } from "@/store/useView";
import { CameraControls, Grid, useScroll, ScrollControls, MeshReflectorMaterial, Environment } from "@react-three/drei";
import { useThree, useFrame, MeshProps } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const Train = () => {
  const scroll = useScroll();
  const meshRef = useRef<MeshProps>();

  useFrame(() => {
    meshRef.current!.position.x = scroll.offset * 20;
  });
  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"red"} />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxGeometry />
        <meshBasicMaterial color={"green"} />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry />
        <meshBasicMaterial color={"blue"} />
      </mesh>
    </group>
  );
};

const Render = () => {
  const view = useView((state) => state.view);
  const viewport = useThree((state) => state.viewport);
  const cameraRef = useRef<CameraControls>();

  const changeCamera = () => {
    cameraRef.current?.setLookAt(0, 0, 10, view, 0, 0, true);
  };

  useEffect(() => {
    changeCamera();
  }, [view]);

  return (
    <>
      {/* <Grid
        position-y={-viewport.height / 20}
        sectionSize={1}
        sectionColor={"gary"}
        sectionThickness={1}
        cellSize={0.5}
        cellColor={"red"}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      /> */}
      {/* 雾 */}
      <fog attach="fog" args={["#17171b", 30, 20]} />
      <color attach="background" args={["#17171b"]} />
      {/* <CameraControls
        ref={cameraRef}
        maxZoom={1}
        minZoom={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
        // mouseButtons={{
        //   left: 0,
        //   middle: 0,
        //   right: 0,
        //   wheel: 0,
        // }}
      /> */}
      <ScrollControls pages={10}>
        <Train />
      </ScrollControls>
      <Environment preset="dawn" />
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        {/* 反射材质 */}
        <MeshReflectorMaterial blur={[400, 100]} resolution={1024} mixBlur={1} mixStrength={15} depthScale={1} minDepthThreshold={0.85} color="#151515" metalness={0.6} roughness={1} />
      </mesh>
    </>
  );
};

export default Render;
