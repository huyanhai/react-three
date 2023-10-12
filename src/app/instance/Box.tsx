"use client";
import { Box, Html, Instance, Instances, OrbitControls, RenderTexture, Text, useGLTF, PerspectiveCamera, Mask, useMask, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useRef } from "react";
import { MathUtils } from "three";

function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));
    ref.current.position.set(
      Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 4
    );
  });
  return <Instance ref={ref} />;
}

const BoxContainer = () => {
  // true,剪切内部，false:剪切外部
  const stencil = useMask(1, true);
  const { range } = useControls({
    range: {
      value: 100,
      min: 1,
      max: 1000,
      step: 10,
    },
  });
  const particles = Array.from({ length: 10 }, () => ({
    factor: MathUtils.randInt(20, 100),
    speed: MathUtils.randFloat(0.01, 0.75),
    xFactor: MathUtils.randFloatSpread(40),
    yFactor: MathUtils.randFloatSpread(10),
    zFactor: MathUtils.randFloatSpread(10),
  }));

  return (
    <>
      <Box position={[1, 0, -2]}>
        {/* 自定义纹理 */}
        {/* <meshStandardMaterial>
          <RenderTexture>
            <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
            <color attach="background" args={["orange"]} />
            <Text fontSize={4} color="#555">
              123
            </Text>
          </RenderTexture>
        </meshStandardMaterial> */}
        <meshStandardMaterial>
          <RenderTexture attach="map">
            {/* 添加一个相机，否则字体会随着外面的相机旋转 */}
            <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
            <color attach="background" args={["orange"]} />
            <Text fontSize={2} color="#555">
              123123
            </Text>
          </RenderTexture>
        </meshStandardMaterial>
      </Box>

      <Float floatIntensity={4} rotationIntensity={0} speed={4}>
        <Box position={[1, 0, 0]}>
          <meshStandardMaterial color={"blue"} {...stencil} />
        </Box>
      </Float>
      <Mask id={1} position={[1, 0, 1]}>
        <circleGeometry args={[0.4, 64]} />
      </Mask>
      {/* range的数量和Instance的数量需要一致 */}
      <Instances range={particles.length} castShadow receiveShadow position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.45, 64, 64]} />
        <meshStandardMaterial roughness={1} color="#f0f0f0" />
        {particles.map((item, index) => (
          <Bubble key={index} {...item} />
        ))}
      </Instances>
      <OrbitControls />
    </>
  );
};

useGLTF.preload("/models/g1.glb");

export default BoxContainer;
