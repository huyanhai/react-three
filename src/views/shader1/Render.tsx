import { CameraControls, PerspectiveCamera, useFBO } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Texture, WebGLRenderTarget } from 'three';

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
  }, []);

  return (
    <>
      <PerspectiveCamera near={0.5} ref={renderCamera} />
      <CameraControls enablePan={false} ref={controls} />
    </>
  );
};

export default Render;
