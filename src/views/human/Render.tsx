import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Human from './Human';
import Effect from './Effect';
import { useControls } from 'leva';

const Render = () => {
  const onClickCapture = (e) => {
    console.log(e);
  };
  return (
    <Canvas
      camera={{
        position: [18.47337626175879, 27.538580746027492, 69.28164971877845],
        fov: 5,
        rotation: [
          -0.378338441934772, 0.24289259065317328, 0.09531055245982788
        ],
        near: 0.1
      }}
      shadows
      onClickCapture={onClickCapture}
    >
      <Human />
      <color attach="background" args={['#050505']} />
      <Effect />
    </Canvas>
  );
};

export default Render;
