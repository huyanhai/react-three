import React, { useCallback, useRef, useState, useMemo } from 'react';
import vertexShader from '@/shaders/sphere/glsl/vertexShader.vert';
import fragmentShader from '@/shaders/sphere/glsl/fragmentShader.frag';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useControls } from 'leva';

const Icosahedron = () => {
  const texture = useTexture('sem-0033.jpg');
  const { nodes } = useGLTF('test.glb');
  const i = new THREE.IcosahedronGeometry(1, 0);

  const { lightPosition, lightColor } = useControls({
    lightPosition: {
      value: [5, 5, 5]
    },
    lightColor: {
      value: "red"
    }
  });


  const [time, setTime] = useState(0);
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );

  useFrame(({ clock, camera }) => {
    setTime(clock.getElapsedTime());
    setCameraPosition(
      new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
    );
  });

  return (
    <>
      {/* <spotLight color={lightColor} position={lightPosition} /> */}
      <mesh
        geometry={nodes.dragon.geometry}
        position={[0, 0, 0]}
        rotateY={Math.PI / 2}
      >
        <sphereGeometry args={[1, 100, 100]} />
        <shaderMaterial
          args={[
            {
              uniforms: {
                uTime: {
                  value: time
                },
                uTexture: {
                  value: texture
                },
                uCameraPosition: {
                  value: cameraPosition
                },
                uLightPosition: {
                  value: lightPosition
                },
                uLightColor: {
                  value: new THREE.Color(lightColor)
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
