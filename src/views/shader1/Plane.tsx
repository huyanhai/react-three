import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { forwardRef, useState } from 'react';
import { Texture, WebGLRenderTarget } from 'three';
import { easing } from 'maath';

const Plane = (
  props: {
    renderTarget: WebGLRenderTarget<Texture>;
  },
  ref: any
) => {
  const [mode, setMode] = useState(false);
  const [time, setTime] = useState(0);
  const [progression, setProgression] = useState(0.35);

  const texture = useTexture('ground.jpg');

  const { step } = useControls({
    step: {
      value: 0,
      min: -10,
      max: 10
    },
    changeMode: {
      value: mode,
      onChange: (value) => {
        setMode(value);
      }
    }
  });

  useFrame(({ clock, gl }, delate) => {
    setTime(clock.getElapsedTime());
    if (mode) {
      progression < 0.65 &&
        easing.damp(ref.current.uniforms.uProgression, 'value', 1, 1.5, delate);
    } else {
      easing.damp(
        ref.current.uniforms.uProgression,
        'value',
        0.35,
        .5,
        delate
      );
    }
  });

  return (
    <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 2]}>
      <screenShader
        uTime={time}
        uTexture={props.renderTarget?.texture}
        uTexture1={texture}
        uProgression={progression}
        uStep={step}
        ref={ref}
      />
      <planeGeometry args={[5, 5]} />
    </mesh>
  );
};

export default forwardRef(Plane);
