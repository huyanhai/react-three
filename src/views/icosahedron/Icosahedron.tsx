import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect
} from 'react';
import vertexShader from '@/shaders/sphere/glsl/vertexShader.vert';
import fragmentShader from '@/shaders/sphere/glsl/fragmentShader.frag';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useControls } from 'leva';

const Icosahedron = () => {
  const [matcap, env] = useTexture(['matcap.png', 'hdr.png']);
  const { nodes } = useGLTF('test.glb');
  const i = new THREE.IcosahedronGeometry(1, 0);
  const shader = useRef<THREE.Mesh>();

  const {
    lightPosition,
    lightPosition1,
    lightPosition2,
    lightColor,
    lightColor1,
    lightColor2
  } = useControls({
    lightPosition: {
      value: [
        Math.sin((Math.PI / 3) * 2) * 10,
        Math.sin((Math.PI / 3) * 2) * 10,
        Math.cos((Math.PI / 3) * 2) * 10
      ]
    },
    lightColor: {
      value: 'white'
    },
    lightPosition1: {
      value: [
        Math.sin((Math.PI / 3) * 4) * 5,
        0,
        Math.cos((Math.PI / 3) * 4) * 5
      ]
    },
    lightColor1: {
      value: 'blue'
    },
    lightPosition2: {
      value: [
        Math.sin((Math.PI / 3) * 6) * 5,
        0,
        Math.cos((Math.PI / 3) * 6) * 5
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
      <mesh position={lightPosition}>
        <meshBasicMaterial color={lightColor} />
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      </mesh>
      <mesh position={lightPosition1}>
        <meshBasicMaterial color={lightColor1} />
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      </mesh>
      <mesh position={lightPosition2}>
        <meshBasicMaterial color={lightColor2} />
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      </mesh>
      <mesh
        geometry={nodes.dragon.geometry}
        position={[0, 0, 0]}
        rotateY={Math.PI / 2}
      >
        {/* <torusKnotGeometry args={[10, 3, 200, 100]} /> */}
        {/* <sphereGeometry args={[3, 32, 32]} /> */}
        <torusGeometry args={[10, 3, 200, 100]} ref={shader} />
        {/* <planeGeometry args={[50, 50]} /> */}
        <shaderMaterial
          args={[
            {
              uniforms: {
                uTime: {
                  value: time
                },
                uEnv: {
                  value: env
                },
                uTexture: {
                  value: matcap
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
                albedo: {
                  value: new THREE.Color(0xffffff)
                },
                metallic: {
                  value: 0.5
                },
                roughness: {
                  value: 0.5
                },
                ao: {
                  value: 1
                },
                lightPositions: {
                  value: [
                    new THREE.Vector3(
                      lightPosition[0],
                      lightPosition[1],
                      lightPosition[2]
                    ),
                    new THREE.Vector3(
                      lightPosition1[0],
                      lightPosition1[1],
                      lightPosition1[2]
                    ),
                    new THREE.Vector3(
                      lightPosition2[0],
                      lightPosition2[1],
                      lightPosition2[2]
                    ),
                    new THREE.Vector3(0, 10, 10)
                  ]
                },
                lightColors: {
                  value: [
                    new THREE.Color(lightColor),
                    new THREE.Color(lightColor1),
                    new THREE.Color(lightColor2),
                    new THREE.Color('white')
                  ]
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
        {/* <meshMatcapMaterial
          matcap={matcap}
          displacementScale={5}
          normalScale={new THREE.Vector2(0.1, 0.5)}
        /> */}
        {/* <meshPhysicalMaterial
        onBeforeCompile={beforeCompile}
        color={'red'}
        metalness={1.0}
        roughness={0}
      /> */}
      </mesh>
    </>
  );
};

export default Icosahedron;
