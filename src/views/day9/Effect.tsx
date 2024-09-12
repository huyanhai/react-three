import { Effects } from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';
import { ScreenEffect } from './ScreenEffect';

import {
  UnrealBloomPass,
  ShaderPass,
  RenderPass,
  BrightnessContrastShader,
  HueSaturationShader,
  BleachBypassShader,
  FXAAShader
} from 'three-stdlib';

import { Vector2 } from 'three';
import { useRef, useState } from 'react';

extend({
  UnrealBloomPass,
  ShaderPass,
  RenderPass
});

const Effect = () => {
  const shaderPassRef = useRef<ShaderPass>(null);
  const brightnessRef = useRef<ShaderPass>(null);
  const heRef = useRef<ShaderPass>(null);
  const bleachBypassRef = useRef<ShaderPass>(null);

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
      brightnessRef.current.uniforms.brightness = { value: 0.4 };
      brightnessRef.current.uniforms.contrast = { value: 0.83 };
    }

    if (bleachBypassRef.current?.uniforms) {
      bleachBypassRef.current.uniforms.opacity = { value: 0.9 };
    }
  });

  return (
    <Effects args={[gl]}>
      <renderPass args={[scene, camera]} />
      <shaderPass args={[BrightnessContrastShader]} ref={brightnessRef} />
      <shaderPass args={[HueSaturationShader]} ref={heRef} />

      <shaderPass args={[BleachBypassShader]} ref={bleachBypassRef} />
      <unrealBloomPass
        args={[new Vector2(window.innerWidth, window.innerHeight), 1.0, 1, 0.1]}
      />
      <shaderPass args={[FXAAShader]} />
      <shaderPass args={[ScreenEffect]} ref={shaderPassRef} />
    </Effects>
  );
};

export default Effect;
