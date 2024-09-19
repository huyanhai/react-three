import {
  UseCanvas,
  ScrollScene,
  ScrollSceneChildProps,
  useScrollbar
} from '@14islands/r3f-scroll-rig';
import { a, useSpring } from '@react-spring/three';
import {
  MeshWobbleMaterial,
  OrbitControls,
  useTexture
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

interface IImageProps {
  className?: string;
}

const Test = ({ inViewport }: ScrollSceneChildProps) => {
  const meshRef = useRef<Mesh>(new Mesh());
  const { scroll } = useScrollbar();
  const texture = useTexture('/maxim-berg-ANuuRuCRRAc-unsplash.jpg');
  const spring = useSpring({
    scale: inViewport ? 2 : 0,
    delay: 1
  });

  useFrame(() => {
    (meshRef.current.material as any).factor += scroll.velocity * 0.005;
    (meshRef.current.material as any).factor *= 0.95;
  });

  return (
    <group>
      <a.mesh {...spring} ref={meshRef}>
        <boxGeometry args={[3, 3, 1]} />
        <MeshWobbleMaterial
          factor={1}
          speed={2}
          roughness={0.14}
          metalness={0}
          transparent
          depthTest={false}
          map={texture}
        >
          {/* 渐变色 */}
          {/* <GradientTexture
            stops={[0, 1]} // As many stops as you want
            colors={['red', 'blue']} // Colors need to match the number of stops
            rotation={0.5}
          /> */}
        </MeshWobbleMaterial>
      </a.mesh>
      <OrbitControls />
    </group>
  );
};

const Image = ({ className }: IImageProps) => {
  const el = useRef<HTMLDivElement>(null);
  return (
    <>
      {/* 将canvas挂载到这个dom上 */}
      <div ref={el} className={className}></div>
      <UseCanvas>
        <ScrollScene track={el as any}>
          {(props) => <Test {...props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};

export default Image;
