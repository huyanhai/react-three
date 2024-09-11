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
      heRef.current.uniforms.hue = { value: 0. };
      heRef.current.uniforms.saturation = { value: 0.1 };
    }
    if (brightnessRef.current?.uniforms) {
      brightnessRef.current.uniforms.brightness = { value: 0.39 };
      brightnessRef.current.uniforms.contrast = { value: 0.82 };
    }    
  });

  return (
    <Effects args={[gl]}>
      <renderPass args={[scene, camera]} />
      <shaderPass args={[BrightnessContrastShader]} ref={brightnessRef} />
      <shaderPass args={[HueSaturationShader]} ref={heRef} />
      <unrealBloomPass
        args={[
          new Vector2(window.innerWidth, window.innerHeight),
          1.0,
          1.,
          0.5
        ]}
      />

      <shaderPass args={[ScreenEffect]} ref={shaderPassRef} />
            {/* <filmPass args={[1, 0., 0, false]} /> */}
    </Effects>
  );
};

export default Effect;
