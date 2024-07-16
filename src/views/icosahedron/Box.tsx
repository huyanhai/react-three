import { MeshTransmissionMaterial, useCubeTexture } from '@react-three/drei';
import { Shader, WebGLRenderer } from 'three';
import fragmentShader from './glsl/fragmentShader.frag';
import vertexHead from './glsl/vertexHead.vert';
import vertexBody from './glsl/vertexBody.vert';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Box = () => {
  const shaderRef = useRef<THREE.Material>();
  const cubeMap = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    {
      path: 'cube/'
    }
  );

  useFrame(({ clock, gl, camera, scene }) => {
    if (shaderRef.current!.userData.shader) {
      shaderRef.current!.userData.shader.uniforms.uTime = {
        value: clock.getElapsedTime()
      };
    }
  });

  const onBeforeCompile = (shader: Shader, renderer: WebGLRenderer) => {
    shader.uniforms = {
      ...shader.uniforms,
      uTime: { value: 0 }
    };

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>\n',
      `#include <dithering_fragment>\n${fragmentShader}\n`
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
      <mesh>
        <sphereGeometry args={[5, 320, 320]} />
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
