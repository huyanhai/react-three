import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { Environment } from '@react-three/drei';

const Day3 = () => {
  return (
    <CanvasLayout camera={{ position: [0, 0, 120] }} shadows>
      <color attach={'background'} args={['white']} />
      <Render />
      <Environment
        files={'/hdr/studio_small_08_2k.exr'}
        environmentRotation={[Math.PI / 2, 0, 0]}
        environmentIntensity={0.12}
      ></Environment>
    </CanvasLayout>
  );
};

export default Day3;
