import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { forwardRef, useState } from 'react';
import { Texture, WebGLRenderTarget } from 'three';
import { MathUtils } from 'three';

const Plane = (
  props: {
    renderTarget: WebGLRenderTarget<Texture>;
    renderTarget1: WebGLRenderTarget<Texture>;
  },
  ref
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

  useFrame(({ clock, gl }) => {
    setTime(clock.getElapsedTime());
    if (mode) {
      progression < 0.65 && setProgression(progression + 0.005);
    } else {
      progression > 0.35 && setProgression(progression - 0.005);
    }
    // console.log(mode, progression);
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
