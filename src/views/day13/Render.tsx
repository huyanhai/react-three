import { useFBO, useGLTF, useTexture } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

import vertexShader from './glsl/vertex.vert';
import fragmentShader from './glsl/fragment.frag';
import Noise from './Noise';
import { AdditiveBlending, Camera, MathUtils, Scene } from 'three';

const FBOParticles = () => {
  const count = 100000;

  const points = useRef();
  const scene = new Scene();
  const camera = new Camera();

  // const { scene, camera } = useThree();

  const fbo = useFBO();

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * 1;
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);

      let x = distance * Math.sin(theta) * Math.cos(phi);
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

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
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
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
