import Loading from '@/components/Loading';
import { Loader } from '@react-three/drei';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { Suspense } from 'react';

const CanvasLayout = (props: CanvasProps) => {
  return (
    <>
      <Canvas camera={{ far: 200, position: [0, 0, 10]}} {...props}>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default CanvasLayout;
