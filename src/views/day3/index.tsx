import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';

const Day3 = () => {
  return (
    <CanvasLayout camera={{ position: [0, 0, 50] }} shadows>
      <color attach={'background'} args={['white']} />
      <Render />
      <Environment files={'/hdr/studio_small_09_4k.exr'}>
        <Lightformer
          color={'blue'}
          intensity={10}
          position={[0, 0, -20]}
          scale={[10, 10, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          form={'rect'}
        />
        <Lightformer
          color={'yellow'}
          intensity={5}
          position={[0, 0, -20]}
          scale={[5, 5, 1]}
          onUpdate={(self) => self.lookAt(-5, -5, -5)}
          form={'circle'}
        />
        <Lightformer
          color={'red'}
          intensity={5}
          position={[0, 0, -20]}
          scale={[5, 5, 1]}
          onUpdate={(self) => self.lookAt(-5, 5, 6)}
          form={'circle'}
        />
      </Environment>
      <OrbitControls />
    </CanvasLayout>
  );
};

export default Day3;
