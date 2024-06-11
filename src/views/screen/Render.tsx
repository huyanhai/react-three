import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Shader, Vector2, WebGLRenderer } from 'three';

import fragmentShader from '@/shaders/screen/glsl/fragmentShader.frag';
import { useTexture } from '@react-three/drei';

const Render = () => {
  const [size, setSize] = useState(new Vector2());
  const [time, setTime] = useState(0);

  // const texture = useTexture('https://i.imgur.com/MqQY5Ww.png');

  // 处理贴图重复
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(1, 1).multiplyScalar(0.5);

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
          // normalScale={}
        />
        <planeGeometry args={[10, 10, 10]} />
      </mesh>
      <spotLight color={'white'} position={[0, 0, 10]} intensity={1000} castShadow />
      
    </>
  );
};

export default Render;
