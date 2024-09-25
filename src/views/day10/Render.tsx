import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import { Environment, Image } from '@react-three/drei';
import Lens from './Lens';
import { Suspense, forwardRef, useRef } from 'react';

import '@14islands/r3f-scroll-rig/css';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';

const WebGLBackground = () => {
  const bg = useRef<Mesh>(null);
  const viewport = useThree((s) => s.viewport);
  useFrame((_, delta) => {
    if (bg.current) bg.current.rotation.z -= delta * 0.5;
  });
  return (
    <Suspense fallback="">
      <Image
        ref={bg}
        scale={Math.max(viewport.width, viewport.height) * 1.4}
        url="codrops-bg-tiny.png"
        transparent
        renderOrder={-1}
      />
    </Suspense>
  );
};

const Render = forwardRef<HTMLElement>((_, ref) => {
  return (
    <>
      <GlobalCanvas
        debug={false}
        scaleMultiplier={0.01}
        eventSource={ref as any}
        eventPrefix="client"
        flat
        camera={{ fov: 14 }}
        style={{ pointerEvents: 'none' }}
      >
        {(globalChildren) => (
          <Lens>
            <WebGLBackground />
            <Environment files="/hdr/studio_small_08_2k.exr" />
            {globalChildren}
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar enabled config={{ syncTouch: true }}></SmoothScrollbar>
    </>
  );
});

export default Render;
