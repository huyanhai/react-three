import { Canvas, extend } from '@react-three/fiber';
import React from 'react';
import ShipCom from './ShipCom';
import { OrbitControls, Sky } from '@react-three/drei';
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  SSAO
} from '@react-three/postprocessing';

const Ship = () => {
  return (
    <Canvas>
      <color attach="background" args={['#15151a']} />
      <Sky />
      <ShipCom />
      <pointLight position={[1, 1, 1]} intensity={10} />
      <OrbitControls />
      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceSmoothing={0.025}
          luminanceThreshold={0.9}
          intensity={0.42}
          radius={0.92}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Ship;
