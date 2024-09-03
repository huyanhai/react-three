import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { OrbitControls, Environment } from '@react-three/drei';

const index = () => {
  return (
    <CanvasLayout
      className="w-full h-full absolute"
      camera={{ far: 200, position: [0, 0, 1] }}
    >
      <Render />
      <Environment
        files={'/hdr/studio_small_09_4k.exr'}
        backgroundRotation={[Math.PI / 2, -Math.PI / 2, Math.PI / 1]}
      />
      <color attach="background" args={['#000']} />
      <OrbitControls />
    </CanvasLayout>
  );
};

export default index;
