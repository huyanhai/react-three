import { MeshTransmissionMaterial, useCubeTexture } from '@react-three/drei';
import {
  WebGLProgramParametersWithUniforms,
  WebGLRenderer,
  Vector2,
  MeshPhysicalMaterial,
  MeshDepthMaterial,
  RGBADepthPacking,
  IcosahedronGeometry
} from 'three';
import vertexBody from './glsl/vertexBody.vert';
import fragmentBody from './glsl/fragmentBody.frag';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import CustomShaderMaterial from 'three-custom-shader-material';
import { useControls } from 'leva';
import { mergeVertices } from 'three-stdlib';

const Box = () => {
  const shaderRef = useRef<typeof CustomShaderMaterial>();
  const depthMaterialRef = useRef<typeof CustomShaderMaterial>();
  const [mouse, setMouse] = useState<Vector2>(new Vector2());
  const [time, setTime] = useState(0);

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: mouse }
  };

  useFrame(({ clock, gl, camera, scene, pointer }) => {
    setMouse(new Vector2(pointer.x, pointer.y));
    setTime(clock.getElapsedTime());
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.uMouse.value = mouse;

    // depthMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    // depthMaterialRef.current.uniforms.uMouse.value = mouse;
  });

  // const { x, y, z } = useControls({
  //   x: { value: 0, min: -10, max: 10, step: 0.1 },
  //   y: { value: 0, min: -10, max: 10, step: 0.1 },
  //   z: { value: 5, min: -10, max: 10, step: 0.1 }
  // });

  // const geometry = useMemo(() => {
  //   const geometry = mergeVertices(new IcosahedronGeometry(4, 200));
  //   geometry.computeTangents();
  //   return geometry;
  // }, []);

  return (
    <group>
      <mesh rotation={[0, 0, 0]} scale={1.2}>
        {/* <sphereGeometry args={[4, 320, 320]} /> */}
        <icosahedronGeometry args={[4, 200]} />
        <CustomShaderMaterial
          ref={shaderRef}
          baseMaterial={MeshPhysicalMaterial}
          roughness={0.6}
          metalness={0.95}
          clearcoat={1}
          ior={1.81}
          iridescence={0.01} // 清漆效果
          silent
          vertexShader={vertexBody}
          fragmentShader={fragmentBody}
          uniforms={uniforms}
          color={'black'}
        />
      </mesh>
      <directionalLight intensity={2} position={[10, 0, 5]} color={'white'} />
      <directionalLight intensity={10} position={[-10, 10, 5]} color={'white'} />
      <directionalLight intensity={30} position={[0, 0, 20]} color={'white'} />
    </group>
  );
};

export default Box;
