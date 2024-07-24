import CanvasLayout from '@/layouts/CanvasLayout';
import { Environment } from '@react-three/drei';
import Render from './Render';
import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';
import WebGPUCapabilities from 'three/examples/jsm/capabilities/WebGPU.js';
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three';
const Day4 = () => {
  const webGPUAvailable = WebGPUCapabilities.isAvailable();
  return (
    <CanvasLayout
      gl={(canvas) => {
        const renderer = new WebGPURenderer({
          canvas: canvas as HTMLCanvasElement,
          antialias: true,
          alpha: true,
          forceWebGL: !webGPUAvailable
        });
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.outputColorSpace = SRGBColorSpace;
        // renderer.init().then(() => {
        //   setInitialising(false);
        // });

        return renderer;
      }}
    >
      <Render />
      <Environment
        files={'/hdr/studio_small_09_4k.exr'}
        environmentRotation={[Math.PI / 2, 0, 0]}
        environmentIntensity={0.12}
      ></Environment>
    </CanvasLayout>
  );
};

export default Day4;
