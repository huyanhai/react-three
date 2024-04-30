/* eslint-disable jsx-a11y/alt-text */
"use client";

import {
  MotionPathControls,
  Box,
  OrbitControls,
  useMotion,
  Gltf,
  Environment,
  Float,
  GizmoHelper,
  GizmoViewport,
  PivotControls,
  Grid,
  Center,
  RoundedBox,
  ScreenQuad,
  QuadraticBezierLine,
  CubicBezierLine,
  CatmullRomLine,
  Text,
  Image,
  Text3D,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Loop = () => {
  const motion = useMotion();

  useFrame((state, delta) => {
    // Set the current position along the curve, you can increment indiscriminately for a loop
    motion.current += delta;
    // Look ahead on the curve
    // motion.object.current.lookAt(motion.next);
  });
};

const Box1 = () => {
  const poi = useRef();
  const motionRef = useRef();
  return (
    <>
      <Environment preset="dawn" />
      <OrbitControls />
      {/* <Gltf scale={0.03} ref={motionRef} src="./models/g1.glb" /> */}
      <Box args={[1, 1, 1]} ref={motionRef} />
      {/* 路径控制器 */}
      <MotionPathControls object={motionRef} debug={true} focus={poi}>
        <cubicBezierCurve3 v0={[-5, -5, 0]} v1={[-10, 0, 0]} v2={[0, 3, 0]} v3={[6, 3, 0]} />
        <cubicBezierCurve3 v0={[-5, -5, 0]} v1={[10, 0, 0]} v2={[0, -3, 0]} v3={[6, 3, 0]} />
        <Loop />
      </MotionPathControls>
      {/* 悬浮 */}
      {/* 坐标系 */}
      <GizmoHelper margin={[80, 80]}>
        <GizmoViewport></GizmoViewport>
      </GizmoHelper>
      <Center>
        <Float floatIntensity={20} rotationIntensity={25} speed={4}>
          <PivotControls>
            <Box args={[1, 1, 1]} ref={poi} />
          </PivotControls>
        </Float>
      </Center>

      {/* 圆角矩形 */}
      <RoundedBox radius={0.1} args={[1, 1, 1]} bevelSegments={1}>
        <meshPhongMaterial color={"red"} wireframe />
      </RoundedBox>

      {/* 三角形 */}
      <ScreenQuad>
        <meshPhongMaterial color={"red"} wireframe />
      </ScreenQuad>

      {/* 二次贝塞尔曲线 */}
      <QuadraticBezierLine start={[0, 0, 0]} mid={[1, 5, 2]} end={[3, 3, 3]} lineWidth={2} />
      {/* 三次贝塞尔曲线 */}
      <CubicBezierLine start={[0, 0, 0]} midA={[3, 2, 2]} midB={[1, 3, 6]} end={[2, 4, 3]} />

      {/* 根据点绘制曲线 */}
      <CatmullRomLine
        closed={true}
        curveType="catmullrom"
        points={[
          [0, 0, 0],
          [0, 3, 2],
          [1, 7, 6],
        ]}
      />
      <Text>hellow</Text>
      <Image url="/p1.jpg" position={[3, 3, 3]} />
      {/* <Text3D font={''}>3d文字</Text3D> */}
      <Grid followCamera={true} args={[10.5, 10.5]} infiniteGrid={true} cellColor={"black"} sectionColor={"red"} sectionSize={2} />
    </>
  );
};

export default Box1;
