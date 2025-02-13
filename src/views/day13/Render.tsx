import { useFBO, useGLTF, useTexture } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

import vertexShader from './glsl/vertex.vert';
import fragmentShader from './glsl/fragment.frag';
import Noise from './Noise';
import { AdditiveBlending, Camera, Scene } from 'three';

const FBOParticles = () => {
  const { nodes } = useGLTF('test1.glb');
  const points = useRef();
  const scene = new Scene();
  const camera = new Camera()

  // const { scene, camera } = useThree();

  const fbo = useFBO();

  const uniforms = useMemo(
    () => ({
      uPositions: {
        value: null
      },
      uTime: {
        value: 0
      },
      uRadius: {
        value: 2
      }
    }),
    []
  );

  useFrame(({ clock, gl }) => {
    gl.setRenderTarget(fbo);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    points.current.material.uniforms.uPositions.value = fbo.texture;
    points.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <>
      {/* createPortal(<mesh></mesh>, scene) 在指定对象渲染 */}
      {createPortal(<Noise />, scene)}
      {/* <points>
        <bufferGeometry attributes={nodes.head1.geometry.attributes} />
        <pointsMaterial size={0.01} color={'red'} />
      </points> */}
      <points ref={points}>
        <planeGeometry args={[1, 1, 100, 100]} />
        <shaderMaterial
          // AdditiveBlending颜色叠加
          blending={AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  );
};

export default FBOParticles;
