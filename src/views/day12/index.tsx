// @ts-nocheck
import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const index = () => {
  const { width, height } = window.screen;

  const aspect = width / height;
  return (
    <CanvasLayout
      gl={(canvas) => new WebGPURenderer({ canvas })}
      camera={{ position: [0, 0, 50] }}
    >
      <Render />
      {/* <OrbitControls /> */}
      <PerspectiveCamera aspect={aspect} makeDefault position={[0, 0, 50]} />
    </CanvasLayout>
  );
};

export default index;
