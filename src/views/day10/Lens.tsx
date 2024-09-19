import { ReactNode, useRef, useState } from 'react';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';
import { Mesh, Scene } from 'three';

interface Props {
  damping?: number;
  children?: ReactNode;
}

const Lens = ({ children, damping = 0.14, ...props }: Props) => {
  const ref = useRef<Mesh>(new Mesh());
  const { nodes } = useGLTF('/lens-transformed2.glb');
  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);

  //   新建一个场景，将内容渲染到新的场景上面
  const [scene] = useState(() => new Scene());

  useFrame(({ camera, pointer, gl, viewport }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 1]);

    easing.damp3(
      ref.current.position,
      [(pointer.x * width) / 2, (pointer.y * height) / 2, 1],
      damping,
      delta
    );
    gl.setRenderTarget(buffer);
    gl.setClearColor('#ecedef');
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      <mesh
        scale={Math.min(viewport.width, viewport.height) * 0.14}
        ref={ref}
        rotation-x={Math.PI / 2}
        geometry={(nodes.Cylinder as Mesh).geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.14}
          thickness={1.4}
          anisotropy={0.14}
          chromaticAberration={0.14}
          distortion={0.14}
          distortionScale={1.4}
          temporalDistortion={0.14}
        />
      </mesh>
    </>
  );
};

export default Lens;

useGLTF.preload('/lens-transformed2.glb');
