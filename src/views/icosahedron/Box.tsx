import { MeshTransmissionMaterial, useCubeTexture } from '@react-three/drei';
import { Shader, WebGLRenderer, Vector2 } from 'three';
import vertexHead from './glsl/vertexHead.vert';
import vertexBody from './glsl/vertexBody.vert';
import fragmentHead from './glsl/fragmentHead.frag';
import fragmentBody from './glsl/fragmentBody.frag';

import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

const Box = () => {
  const shaderRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [mouse, setMouse] = useState<Vector2>(new Vector2());
  const cubeMap = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    {
      path: 'cube/'
    }
  );

  useFrame(({ clock, gl, camera, scene, pointer }) => {
    setMouse(new Vector2(pointer.x, pointer.y));

    if (shaderRef.current!.userData.shader) {
      shaderRef.current!.userData.shader.uniforms.uTime = {
        value: clock.getElapsedTime()
      };
      shaderRef.current!.userData.shader.uniforms.uMouse = {
        value: mouse
      };
    }
  });

  const onBeforeCompile = (shader: Shader, renderer: WebGLRenderer) => {
    shader.uniforms = {
      ...shader.uniforms,
      uTime: { value: 0 },
      uMouse: { value: mouse }
    };

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>\n', `#include <common>\n${fragmentHead}\n`)
      .replace(
        '#include <dithering_fragment>\n',
        `#include <dithering_fragment>\n${fragmentBody}\n`
      );

    shader.vertexShader = shader.vertexShader
      .replace(`#include <common>\n`, `#include <common>\n${vertexHead}\n`)
      .replace(
        `#include <fog_vertex>\n`,
        `#include <fog_vertex>\n${vertexBody}\n`
      );

    shaderRef.current!.userData.shader = shader;
  };

  return (
    <group>
      <mesh rotation={[0, 0, 0]} scale={1.2}>
        <sphereGeometry args={[4, 320, 320]} />
        <meshPhysicalMaterial
          ref={shaderRef}
          color={'black'}
          emissive={'black'}
          envMap={null}
          envMapIntensity={1.0}
          roughness={0.5}
          thickness={1.0}
          ior={1.52}
          vertexColors
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </group>
  );
};

export default Box;
