import { Canvas, extend } from '@react-three/fiber';
import React from 'react';
import Render from './Render';
import {
  Effects,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  BrightnessContrast
} from '@react-three/postprocessing';

import {
  FilmPass,
  WaterPass,
  UnrealBloomPass,
  LUTPass,
  LUTCubeLoader
} from 'three-stdlib';

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

const Icosahedron = () => {
  return (
    <Canvas camera={{ far: 100, position: [0, 0, 14] }}>
      <color args={['#111']} attach="background" />
      {/* <Environment
        files={[
          'cube/px.jpg',
          'cube/nx.jpg',
          'cube/py.jpg',
          'cube/ny.jpg',
          'cube/pz.jpg',
          'cube/nz.jpg'
        ]}
        // background // 将环境作为背景显示
      /> */}
      <Render />
      {/* 正交相机 */}
      <OrbitControls
        autoRotateSpeed={0.85}
        zoomSpeed={0.75}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.55}
      />

      {/* 透视相机-近大远小 */}
      {/* <PerspectiveCamera /> */}

      {/* <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceSmoothing={0.025}
          luminanceThreshold={0.9}
          intensity={0.42}
          radius={0.92}
        />
        <BrightnessContrast brightness={0.1} contrast={0.3} />
      </EffectComposer> */}

      <Environment>
        <Lightformer
          color={'white'}
          intensity={2}
          position={[0, 0, -10]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          form={'circle'}
        />
      </Environment>

      <Effects disableGamma>
        <waterPass factor={0.1} />
        <unrealBloomPass args={[undefined, 0.5, 1, 0]} />
        <filmPass args={[10, 0.1, 1500, false]} />
      </Effects>
      {/* <lUTPass lut={data.texture} intensity={0.75} /> */}
    </Canvas>
  );
};

export default Icosahedron;
