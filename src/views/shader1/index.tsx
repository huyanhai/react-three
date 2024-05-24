import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Entry from './Entry';

const Shader1 = () => {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <Environment files={'studio_small_09_4k.exr'} />
        {/* <Sky /> */}
        <color attach="background" args={['blue']} />

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
