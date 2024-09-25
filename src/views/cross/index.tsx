import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
import { Environment, Grid, Lightformer, OrbitControls } from '@react-three/drei';

const Day2 = () => {
  //   const cubeMap = useCubeTexture(
  //     ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
  //     {
  //       path: '/cube/'
  //     }
  //   );

  return (
    <CanvasLayout camera={{ position: [0, -5, 8] }} shadows>
      <color attach={'background'} args={['blue']} />
      <Render />
      <Environment files={'/hdr/studio_small_08_2k.exr'}>
        <Lightformer
          color={'white'}
          intensity={1}
          position={[0, 0, -20]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          form={'circle'}
        />
        <Lightformer
          color={'white'}
          intensity={10}
          position={[0, 0, 4]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          form={'circle'}
        />
      </Environment>
    </CanvasLayout>
  );
};

export default Day2;
