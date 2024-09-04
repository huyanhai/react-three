import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { Environment } from '@react-three/drei';

const index = () => {
  return (
    <CanvasLayout
      className="w-full h-full absolute"
      camera={{ far: 200, position: [0, 0, 1] }}
    >
      
      <Environment files={'/hdr/studio_small_09_4k.exr'}></Environment>
      <color attach="background" args={['#000']} />
      <Render />
    </CanvasLayout>
  );
};

export default index;
