import { extend } from '@react-three/fiber';
import Render from './Render';
import {
  Effects,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  PresentationControls
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  BrightnessContrast
} from '@react-three/postprocessing';

import {
  FilmPass,
  WaterPass,
  UnrealBloomPass,
  LUTPass,
  LUTCubeLoader
} from 'three-stdlib';
import CanvasLayout from '@/layouts/CanvasLayout';

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

const Day1 = () => {
  return (
    <CanvasLayout>
      {/* <color args={['#000']} attach="background" /> */}
      {/* <Environment
        files={[
          'cube/px.jpg',
          'cube/nx.jpg',
          'cube/py.jpg',
          'cube/ny.jpg',
          'cube/pz.jpg',
          'cube/nz.jpg'
        ]}
        // background // 将环境作为背景显示
      /> */}
      {/* 透视相机-近大远小 */}
      <PresentationControls
        snap
        global
        zoom={0.8}
        rotation={[0, 0, 0]}
        polar={[0, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Render />
      </PresentationControls>
      {/* 正交相机 */}
      {/* <OrbitControls
        autoRotateSpeed={0.85}
        zoomSpeed={0.75}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.55}
      /> */}

      {/* <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceSmoothing={0.025}
          luminanceThreshold={0.9}
          intensity={0.42}
          radius={0.92}
        />
        <BrightnessContrast brightness={0.1} contrast={0.3} />
      </EffectComposer> */}

      <Environment>
        <Lightformer
          color={'white'}
          intensity={2}
          position={[0, 0, -10]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          form={'circle'}
        />
        <Lightformer
          color={'white'}
          intensity={6}
          position={[0, 0, 4]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          form={'circle'}
        />
      </Environment>

      {/* <Effects disableGamma>
        <waterPass factor={0.1} />
        <unrealBloomPass args={[undefined, 0.4, 0.1, 0.1]} />
        <filmPass args={[1, 0.1, 1500, false]} />
        <lUTPass lut={data.texture} intensity={0.75} />
      </Effects> */}
    </CanvasLayout>
  );
};

export default Day1;
