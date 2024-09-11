import { lazy, useEffect } from 'react';
import { Canvas } from '@react-three/offscreen';
import { useDay9 } from '@/store/day9Store';
import { Loader } from '@react-three/drei';
import { initSmoothScrolling } from '@/utils/smoothScroll';
import { FIRST_POINT } from './constants';

const Render = lazy(() => import('./Render'));
const worker = new Worker(new URL('./worker.tsx', import.meta.url), {
  type: 'module'
});

const Human = () => {
  const { changeState } = useDay9();
  const onMouseDown = () => {
    changeState(true);
  };
  const onMouseUp = () => {
    changeState(false);
  };

  useEffect(() => {
    initSmoothScrolling();
  }, []);

  return (
    <div
      className="w-full h-screen"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="fixed w-full h-screen top-0 left-0">
        <Canvas
          className="w-full h-full absolute"
          worker={worker}
          fallback={<Render />}
          camera={{
            position: FIRST_POINT,
            fov: 3,
            rotation: [
              -0.378338441934772, 0.24289259065317328, 0.09531055245982788
            ],
            near: 0.1
          }}
          shadows
        />
        <Loader />
      </div>
      <div id="scroll">
        <div className="w-full h-screen bg-slate-300" id="scroll-box1"></div>
        <div className="w-full h-screen bg-red-300" id="scroll-box2"></div>
        <div className="w-full h-screen bg-yellow-300" id="scroll-box3"></div>
        <div className="w-full h-screen bg-green-300" id="scroll-box4"></div>
      </div>
    </div>
  );
};

export default Human;
