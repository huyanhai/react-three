import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Sky,
  GizmoHelper,
  GizmoViewport
} from '@react-three/drei';
import Screen from './Screen';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Screen1 from './Screen1';

const Shader = () => {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas camera={{ position: [0, 20, 30], fov: 10 }} shadows>
        <GizmoHelper margin={[80, 80]}>
          <GizmoViewport></GizmoViewport>
        </GizmoHelper>
        <Environment files={'studio_small_09_4k.exr'} />
        {/* <Sky /> */}
        <OrbitControls />
        <color attach="background" args={['#15151a']} />
        <EffectComposer>
          {/* 模糊效果 */}
          <Bloom
            mipmapBlur
            luminanceSmoothing={0.025}
            luminanceThreshold={0.9}
            intensity={0.42}
            radius={0.92}
          />
        </EffectComposer>
        {/* <Screen /> */}
        <Screen1 />
      </Canvas>
    </div>
  );
};

export default Shader;
