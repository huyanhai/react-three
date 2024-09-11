import { Effects } from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { ScreenEffect } from './ScreenEffect';

import {
  FilmPass,
  UnrealBloomPass,
  GlitchPass,
  ShaderPass,
  RenderPass,
  BrightnessContrastShader,
  HueSaturationShader
} from 'three-stdlib';
import { Vector2 } from 'three';
import { useRef, useState } from 'react';

extend({
  UnrealBloomPass,
  FilmPass,
  GlitchPass,
  ShaderPass,
  RenderPass
});

const Effect = () => {
  const shaderPassRef = useRef<ShaderPass>(null);
  const brightnessRef = useRef<ShaderPass>(null);
  const heRef = useRef<ShaderPass>(null);

  const [time, setTime] = useState(0);
  const { camera, scene, gl } = useThree();

  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
    if (shaderPassRef.current?.uniforms) {
      shaderPassRef.current.uniforms.uTime = { value: time };
    }
    if (heRef.current?.uniforms) {
      heRef.current.uniforms.hue = { value: 0 };
      heRef.current.uniforms.saturation = { value: 0.2 };
    }
    if (brightnessRef.current?.uniforms) {
      brightnessRef.current.uniforms.brightness = { value: 0.38 };
      brightnessRef.current.uniforms.contrast = { value: 0.8 };
    }
  });

  return (
    <Effects args={[gl]}>
      {/* <filmPass args={[0.2, 1.5, 2000, false]} /> */}
      <renderPass args={[scene, camera]} />
      <unrealBloomPass
        args={[
          new Vector2(window.innerWidth, window.innerHeight),
          0.4,
          0.54,
          0.1
        ]}
      />
      <shaderPass args={[HueSaturationShader]} ref={heRef} />
      <shaderPass args={[BrightnessContrastShader]} ref={brightnessRef} />
      {/* <shaderPass args={[ScreenEffect]} ref={shaderPassRef} /> */}
    </Effects>
  );
};

export default Effect;
