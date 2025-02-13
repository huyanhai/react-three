// @ts-nocheck
import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const index = () => {
  const { width, height } = window.screen;

  const aspect = width / height;
  return (
    <CanvasLayout camera={{ position: [2, 2, 3] }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.5} />
      <Render />
      {/* autoRotate 自动旋转 */}
      <OrbitControls />
    </CanvasLayout>
  );
};

export default index;
