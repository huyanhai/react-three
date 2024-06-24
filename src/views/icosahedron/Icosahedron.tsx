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
  const [texture, matcap] = useTexture(['sem-0033.jpg', 'matcap1.png']);
  const { nodes } = useGLTF('test.glb');
  const i = new THREE.IcosahedronGeometry(1, 0);
  const shader = useRef();

  const [all, setAll] = useState({});

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
        Math.sin((Math.PI / 3) * 2) * 5,
        0,
        Math.cos((Math.PI / 3) * 2) * 5
      ]
    },
    lightColor: {
      value: 'red'
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

  const beforeCompile = (shader: any) => {
    console.log('shader', shader.uniforms);
    shader.uniforms && setAll(shader.uniforms);
  };

  return (
    <>
      {/* <mesh position={lightPosition}>
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
      <mesh position={[0, 0, 0]}>
        <meshBasicMaterial color={'red'} />
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      </mesh> */}
      <mesh
        ref={shader}
        geometry={nodes.dragon.geometry}
        position={[0, 0, 0]}
        rotateY={Math.PI / 2}
      >
        {/* <torusKnotGeometry args={[10, 3, 200, 100]} /> */}
        {/* <sphereGeometry args={[1, 32, 32]} /> */}
        <torusGeometry args={[10, 3, 200, 100]} />
        {/* <planeGeometry args={[50, 50]} /> */}
        <shaderMaterial
          args={[
            {
              uniforms: {
                uTime: {
                  value: time
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
                uLightPosition1: {
                  value: lightPosition1
                },
                uLightColor1: {
                  value: new THREE.Color(lightColor1)
                },
                uLightPosition2: {
                  value: lightPosition2
                },
                uLightColor2: {
                  value: new THREE.Color(lightColor2)
                },
                color: {
                  value: new THREE.Color(lightColor2)
                },
                metalness: {
                  value: 1.0
                },
                roughness: {
                  value: 0.0
                },
                emissive: {
                  value: new THREE.Color(0xffffff)
                },

                
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
