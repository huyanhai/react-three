import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Sky
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Entry from './Entry';
import { resolveLygia } from '@/utils/readlygia';
// import fragmentShader from '@/shaders/screen/glsl/fragmentShader.frag?raw';

const Shader1 = () => {
  import('../../shaders/screen/glsl/fragmentShader.frag').then((res) => {
    console.log('res', res.default);
  });

  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 80 }}>
        <Environment files={'studio_small_09_4k.exr'} />
        <Sky />
        {/* <color attach="background" args={['blue']} /> */}

        <Entry />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default Shader1;
