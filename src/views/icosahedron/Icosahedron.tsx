import React, { useCallback, useRef, useState, useMemo } from 'react';
import vertexShader from '@/shaders/sphere/glsl/vertexShader.vert';
import fragmentShader from '@/shaders/sphere/glsl/fragmentShader.frag';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Icosahedron = () => {
  const i = new THREE.IcosahedronGeometry(1, 0);

  const [time, setTime] = useState(0);
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          args={[
            {
              uniforms: {
                uTime: {
                  value: time
                }
              },
              defines: {
                COUNT: 0.25
              }
            }
          ]}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  );
};

export default Icosahedron;
