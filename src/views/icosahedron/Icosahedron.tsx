import React, { useCallback, useRef, useState, useMemo } from 'react';
import vertexShader from '@/shaders/sphere/glsl/vertexShader.vert';
import fragmentShader from '@/shaders/sphere/glsl/fragmentShader.frag';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';

const Icosahedron = () => {
  const texture = useTexture('sem-0033.jpg');
  const { nodes } = useGLTF('test.glb');
  const i = new THREE.IcosahedronGeometry(1, 0);

  const [time, setTime] = useState(0);
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  return (
    <>
      <mesh geometry={nodes.dragon.geometry} position={[0, 0, 0]} rotateY={Math.PI / 2}>
        <shaderMaterial
          args={[
            {
              uniforms: {
                uTime: {
                  value: time
                },
                u_tex0: {
                  value: texture
                },
                u_camera: {
                  value: new THREE.Vector3(-1.43923, 0.891203, 1.98093)
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
