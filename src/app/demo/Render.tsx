"use client";

import { useView } from "@/store/useView";
import { CameraControls, Grid, useScroll, ScrollControls, MeshReflectorMaterial, Environment, useGLTF, Merged, Text } from "@react-three/drei";
import { useThree, useFrame, MeshProps } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";

const Quarter = ({ models, color, ...props }) => (
  <group {...props}>
    <models.Seat color={color} position={[-0.35, 0, 0.7]} />
    <models.Seat color={color} position={[0.35, 0, 0.7]} />
    <models.Seat color={color} position={[-0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
    <models.Seat color={color} position={[0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
  </group>
);

const Row = ({ models, color, ...props }) => (
  <group {...props}>
    <Quarter models={models} color={color} position={[-1.2, -0.45, 9.75]} />
    <Quarter models={models} color={color} position={[1.2, -0.45, 9.75]} />
  </group>
);

const Cabin = ({ models, color = "white", seatColor = "white", name, ...props }) => (
  <group {...props}>
    <Text fontSize={4} color="#101020" position={[0, 6, 4]} rotation={[-Math.PI / 2, 0, 0]}>
      {name}
    </Text>
    <models.Cabin color={color} />
    <Row models={models} color={seatColor} />
    <Row models={models} color={seatColor} position={[0, 0, -1.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -6.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -8.5]} />
    <Row models={models} color={seatColor} position={[0, 0, -11]} />
    <Row models={models} color={seatColor} position={[0, 0, -12.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -17.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -19.5]} />
  </group>
);

const Train = () => {
  const scroll = useScroll();
  const meshRef = useRef<MeshProps>();
  const [cabin, seat] = useGLTF(["/models/lfjJ-cabin-transformed.glb", "/models/uLY5-seat-transformed.glb"]);
  const meshes = useMemo(() => ({ Cabin: cabin.nodes.cabin_1, Seat: seat.nodes.seat }), [cabin, seat]);

  useFrame(() => {
    meshRef.current!.position.z = scroll.offset * 20;
  });
  return (
    <Merged meshes={meshes}>
      {(models) => (
        <group ref={meshRef}>
          <Cabin models={models} color="#252525" seatColor="sandybrown" name="1A" position={[0, 0, -6]} />
          <Cabin models={models} color="#454545" seatColor="gray" name="2B" position={[0, 0, -32]} />
          <Cabin models={models} color="#252525" seatColor="lightskyblue" name="3A" position={[0, 0, -58]} />
          <Cabin models={models} color="#454545" seatColor="gray" name="4B" position={[0, 0, -84]} />
          <Cabin models={models} color="#252525" seatColor="sandybrown" name="5B" position={[0, 0, -110]} />
          {/* <mesh>
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
        </mesh> */}
        </group>
      )}
    </Merged>
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
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        {/* 反射材质 */}
        <MeshReflectorMaterial blur={[400, 100]} resolution={1024} mixBlur={1} mixStrength={15} depthScale={1} minDepthThreshold={0.85} color="#151515" metalness={0.6} roughness={1} />
      </mesh>
    </>
  );
};

useGLTF.preload("/models/lfjJ-cabin-transformed.glb");
useGLTF.preload("/models/uLY5-seat-transformed.glb");

export default Render;
