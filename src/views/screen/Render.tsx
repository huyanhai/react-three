import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Shader, Vector2, WebGLRenderer } from 'three';

import fragmentShader from '@/shaders/screen/glsl/fragmentShader.frag';

const Render = () => {
  const [size, setSize] = useState(new Vector2());
  const [time, setTime] = useState(0);

  const materialRef = useRef<Shader>();
  const meshRef = useRef<THREE.Mesh>();

  const onBeforeCompile = (shader: Shader, renderer: WebGLRenderer) => {
    shader.uniforms.uTime = { value: time };
    shader.fragmentShader = fragmentShader;
    materialRef.current.userData = shader;
    meshRef.current.material = materialRef.current;

    console.log(shader);
  };

  useFrame((state) => {
    setSize(new Vector2(state.size.width, state.size.height));
    setTime(state.clock.getElapsedTime());

    if (materialRef.current.userData.uniforms) {
      materialRef.current.userData.uniforms.uTime = {
        value: time
      };
      meshRef.current.material = materialRef.current;
    }
  });
  return (
    <>
      <mesh ref={meshRef}>
        <screenShader uTime={time} />
        <meshPhysicalMaterial
          ref={materialRef}
          color={'black'}
          roughness={0.47}
          metalness={0.6}
          ior={1.5}
          iridescenceIOR={1.4}
          onBeforeCompile={onBeforeCompile}
          transparent={true}
        />
        <planeGeometry args={[10, 10, 10]} />
      </mesh>
      <spotLight color={'white'} position={[0, 0, 10]} intensity={1000} castShadow />
      
    </>
  );
};

export default Render;
