import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { OrbitControls, Environment } from '@react-three/drei';
import { initSmoothScrolling } from '@/utils/smoothScroll';

const index = () => {
  initSmoothScrolling();
  return (
    <div className="w-full h-screen">
      <div className="fixed w-full h-screen top-0 left-0">
        <CanvasLayout className="w-full h-full absolute">
          <Render />
          <Environment files={'/hdr/studio_small_09_4k.exr'} />
          <OrbitControls enableZoom={false} />
        </CanvasLayout>
      </div>
      <div className="fixed w-full h-screen top-0 left-0 z-10 flex items-center justify-center">
        <p className="text-9xl opacity-0" id="text">
          文本
        </p>
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

export default index;
