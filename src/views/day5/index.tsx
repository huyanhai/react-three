import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { PerspectiveCamera, ScrollControls } from '@react-three/drei';

const index = () => {
  const { width, height } = window.screen;

  const aspect = width / height;
  return (
    <CanvasLayout>
      <color attach="background" args={['black']} />
      <ScrollControls pages={6}>
        <Render />
      </ScrollControls>
      <PerspectiveCamera aspect={aspect} makeDefault position={[0, 0, 100]} />
    </CanvasLayout>
  );
};

export default index;
