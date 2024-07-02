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
import { useCubeTexture, useGLTF, useTexture } from '@react-three/drei';
import { useControls } from 'leva';

const Icosahedron = () => {
  const cubeMap = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    {
      path: 'cube/'
    }
  );
  const [matcap, env] = useTexture(['matcap.png', 'hdr.png']);
  const { nodes } = useGLTF('test.glb');

  const sphere = useRef<THREE.Mesh>();
  const torus = useRef<THREE.Mesh>();

  const { lightPosition, lightColor, color1, color2 } = useControls({
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
    color1: {
      value: 'blue'
    },
    color2: {
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
    // sphere.current.rotation.y += 0.01;
    // torus.current.rotation.y += 0.01;
  });

  return (
    <>
      <mesh position={lightPosition}>
        <meshBasicMaterial color={lightColor} />
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      </mesh>
      <mesh position={[2, 2, 2]}>
        <meshBasicMaterial color={'red'} />
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <mesh position={[10, 0, 0]} ref={torus}>
        <torusKnotGeometry args={[3, 1, 200, 100]} />
        <shaderMaterial
          args={[
            {
              uniforms: {
                uTime: {
                  value: time
                },
                uCubeMap: {
                  value: cubeMap
                },
                uColor: {
                  value: new THREE.Color(color1)
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
                lightPosition: {
                  value: new THREE.Vector3(
                    lightPosition[0],
                    lightPosition[1],
                    lightPosition[2]
                  )
                },
                lightColor: {
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
          transparent
        />
      </mesh>
      <mesh ref={sphere} geometry={nodes.dragon.geometry} position={[0, 0, 0]}>
        {/* <torusKnotGeometry args={[10, 3, 200, 100]} /> */}
        <sphereGeometry args={[3, 32, 32]} />
        {/* <torusGeometry args={[10, 3, 10, 10]} ref={shader} /> */}
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
                uCubeMap: {
                  value: cubeMap
                },
                uColor: {
                  value: new THREE.Color(color2)
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
                lightPosition: {
                  value: new THREE.Vector3(
                    lightPosition[0],
                    lightPosition[1],
                    lightPosition[2]
                  )
                },
                lightColor: {
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
          transparent
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
