import { lazy } from 'react';
import { Canvas } from '@react-three/offscreen';

const Render = lazy(() => import('./Render'));
const worker = new Worker(new URL('./worker.tsx', import.meta.url), {
  type: 'module'
});
const Human = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas
        worker={worker}
        fallback={<Render />}
        camera={{
          position: [18.47337626175879, 27.538580746027492, 69.28164971877845],
          fov: 5,
          rotation: [
            -0.378338441934772, 0.24289259065317328, 0.09531055245982788
          ],
          near: 0.1
        }}
        shadows
      />
    </div>
  );
};

export default Human;
