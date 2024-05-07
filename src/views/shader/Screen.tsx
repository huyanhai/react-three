import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

import { useControls } from 'leva';
import { useGLTF } from '@react-three/drei';

useGLTF.preload(['cybertruck.gltf', 'test.glb']);

const Screen = () => {
  const { nodes, materials } = useGLTF('cybertruck.gltf');

  const info = useGLTF('test.glb');

  const testRef = useRef();
  const [time, setTime] = useState(0);

  const { alpha, color } = useControls({
    alpha: {
      min: 0,
      max: 1,
      value: 1
    },
    color: 'red'
  });

  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });
  return (
    <>
      <group>
        {/* 车灯部分 */}
        <mesh
          geometry={nodes.interior001.geometry}
          material={materials.lights}
        />
        {/* 车身 */}
        <mesh geometry={nodes.interior001_1.geometry} castShadow>
          <meshStandardMaterial {...materials.body} />
        </mesh>

        {/* 车窗 */}
        <mesh geometry={nodes.interior001_2.geometry}>
          <meshStandardMaterial
            opacity={0.92}
            envMapIntensity={1}
            transparent
            roughness={0.2}
            color={'black'}
          />
        </mesh>

        {/* 车顶 */}
        <mesh
          geometry={nodes.interior001_3.geometry}
          material={materials.glassframes}
          castShadow
        />

        {/* 车尾 */}
        <mesh
          geometry={nodes.interior001_4.geometry}
          material={materials.warninglights}
        />

        {/* 车底 */}
        <mesh
          geometry={nodes.interior001_5.geometry}
          material={materials.black}
          castShadow
        />

        {/* 内部 */}
        <mesh geometry={nodes.steer.geometry} material={materials.gray} />

        {/* 轮胎 */}
        <mesh
          geometry={nodes.tires001.geometry}
          material={materials.tires}
          castShadow
        />

        {/* 轮毂 */}
        <mesh
          geometry={nodes.tires001_1.geometry}
          material={materials.rims}
          castShadow
        />

        {/* 贴膜层 */}
        <mesh geometry={nodes.interior001_6.geometry}>
          <test
            ref={testRef}
            uTime={time}
            uAlpha={alpha}
            uColor={color}
            transparent
          />
        </mesh>
      </group>
    </>
  );
};

export default Screen;
