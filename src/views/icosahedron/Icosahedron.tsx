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

  const {
    lightPosition,
    lightColor,
    lightPosition1,
    lightColor1,
    lightColor2,
    lightPosition2
  } = useControls({
    lightPosition: {
      value: [
        Math.sin((Math.PI / 3) * 2) * 10,
        Math.sin((Math.PI / 3) * 2) * 10,
        Math.sin((Math.PI / 3) * 2) * 10
      ]
    },
    lightColor: {
      value: 'red'
    },
    lightPosition1: {
      value: [
        Math.sin((Math.PI / 2) * 2) * 10,
        Math.sin((Math.PI / 2) * 2) * 10,
        Math.sin((Math.PI / 2) * 2) * 10
      ]
    },
    lightColor1: {
      value: 'blue'
    },
    lightPosition2: {
      value: [
        Math.sin(Math.PI * 2) * 10,
        Math.sin(Math.PI * 2) * 10,
        Math.sin(Math.PI * 2) * 10
      ]
    },
    lightColor2: {
      value: 'green'
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
      <mesh
        geometry={nodes.dragon.geometry}
        position={[0, 0, 0]}
        rotateY={Math.PI / 2}
      >
        <sphereGeometry args={[1, 300, 300]} />
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
                },
                uLightPosition1: {
                  value: lightPosition1
                },
                uLightColor1: {
                  value: new THREE.Color(lightColor1)
                },
                uLightPosition2: {
                  value: lightPosition1
                },
                uLightColor2: {
                  value: new THREE.Color(lightColor1)
                }
              },
              defines: {
                COUNT: 0.25
              }
            }
          ]}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          // glslVersion={THREE.GLSL3}
        />
      </mesh>
    </>
  );
};

export default Icosahedron;
