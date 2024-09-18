import { lazy, useEffect } from 'react';
// import { Canvas } from '@react-three/offscreen';
import { useDay9 } from '@/store/day9Store';
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { initSmoothScrolling } from '@/utils/smoothScroll';
import { FIRST_POINT, FIRST_ROTATION } from './constants';
import { tips } from '@/constants/index';
import './index.scss';
import Render from './Render';

// const Render = lazy(() => import('./Render'));
// const worker = new Worker(new URL('./worker.tsx', import.meta.url), {
//   type: 'module'
// });

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
        <div
          id="text"
          className="montserrat-alternates-bold text-9xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white whitespace-nowrap text-linear"
        >
          {tips}
        </div>
        <Canvas
          className="w-full h-full absolute"
          camera={{
            position: FIRST_POINT,
            fov: 3,
            rotation: [FIRST_ROTATION.x, FIRST_ROTATION.y, FIRST_ROTATION.z],
            near: 0.1
          }}
          shadows
        >
          <Render />
        </Canvas>
        <Loader />
      </div>
      <div id="scroll">
        <div className="w-full h-screen bg-slate-300"></div>
        <div className="w-full h-screen bg-red-300"></div>
        <div className="w-full h-screen bg-yellow-300"></div>
        <div className="w-full h-screen bg-green-300"></div>
      </div>
    </div>
  );
};

export default Human;
