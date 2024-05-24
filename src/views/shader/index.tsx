import { Canvas } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Sky,
  GizmoHelper,
  GizmoViewport,
  Stars
} from '@react-three/drei';
import Screen from './Screen';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Screen1 from './Screen1';


const Shader = () => {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas camera={{ position: [0, 20, 30], fov: 10 }} shadows>
        {/* <Environment files={'studio_small_09_4k.exr'} /> */}
        {/* <Sky /> */}
        <color attach="background" args={['#15151a']} />
        {/* 星空 */}
        <Stars
          radius={10}
          depth={30}
          count={5000}
          factor={4}
          saturation={10}
          fade
          speed={10}
        />
        {/* 模糊效果 */}
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceSmoothing={0.025}
            luminanceThreshold={0.9}
            intensity={0.42}
            radius={0.92}
          />
        </EffectComposer>
        <Screen />

        <Screen1 />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        <OrbitControls />

      </Canvas>
    </div>
  );
};

export default Shader;
