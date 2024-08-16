import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { ScrollControls, OrbitControls, Environment } from '@react-three/drei';
import Overlay from './Overlay';
import './day6.scss';

const index = () => {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-white h-full" id="bg">
      <CanvasLayout
        className="z-10"
        camera={{
          aspect: window.innerWidth / window.innerHeight,
          far: 5000, // 相机的远剪裁面-从什么地方结束渲染
          near: 0.01 // 相机的近剪裁面-从什么地方开始渲染
        }}
      >
        <ScrollControls pages={20} damping={1}>
          <Render />
        </ScrollControls>
        {/* <OrbitControls /> */}
        <Environment files={'/hdr/studio_small_09_4k.exr'} />
      </CanvasLayout>
      <Overlay />
    </div>
  );
};

export default index;
