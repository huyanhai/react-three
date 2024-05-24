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

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

extend({
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  SSAOPass,
  AfterimagePass
});

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
