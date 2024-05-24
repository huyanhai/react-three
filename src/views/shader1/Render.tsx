import { CameraControls, PerspectiveCamera, useFBO } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Texture, WebGLRenderTarget } from 'three';
import { DEG2RAD } from 'three/src/math/MathUtils';

const Render = (props: { renderTarget: WebGLRenderTarget<Texture> }) => {
  const renderCamera = useRef();
  const controls = useRef();

  useFrame(({ gl, scene }) => {
    gl.setRenderTarget(props.renderTarget);
    gl.render(scene, renderCamera.current!);
    gl.setRenderTarget(null);
  });

  useEffect(() => {
    controls.current!.camera = renderCamera.current;
    controls.current!.setLookAt(
      2.0146122041349432,
      2.822796205893349,
      10.587088991637922,
      1.0858141754116573,
      1.9366397611967157,
      1.7546919697281576
    );
  }, []);

  return (
    <>
      <PerspectiveCamera near={0.5} ref={renderCamera} />
      <CameraControls
        enablePan={false}
        minPolarAngle={DEG2RAD * 70}
        maxPolarAngle={DEG2RAD * 85}
        minAzimuthAngle={DEG2RAD * -30}
        maxAzimuthAngle={DEG2RAD * 30}
        minDistance={5}
        maxDistance={9}
        ref={controls}
      />
    </>
  );
};

export default Render;
