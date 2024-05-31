import { Center, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  PMREMGenerator,
  WebGLRenderer,
  Texture,
  Mesh,
  ACESFilmicToneMapping,
  Shader
} from 'three';

const genPmrTexture = (renderer: WebGLRenderer, texture: Texture) => {
  const pmremGenerator = new PMREMGenerator(renderer!);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  return envMap;
};

const setRendererExposure = (renderer: WebGLRenderer, exposure: number) => {
  renderer.toneMappingExposure = Math.pow(exposure, 4.0);
  renderer.toneMapping = ACESFilmicToneMapping;
};

const Human = () => {
  const env = useTexture('env.jpg');
  const { nodes } = useGLTF('human.glb');

  const [exposure, setExposure] = useState(0);

  useControls({
    exposure: {
      value: 0.7,
      min: 0,
      max: 3,
      onChange: (e) => {
        setExposure(e);
      }
    }
  });

  const [renderer, setRenderer] = useState<WebGLRenderer>();
  const [time, setTime] = useState(0);

  const humanRef = useRef<any>();
  const shaderRef = useRef<any>();

  const envMap = useMemo(() => {
    if (renderer) {
      return genPmrTexture(renderer, env);
    }
  }, [renderer]);

  useFrame(({ clock, gl }) => {
    setTime(clock.getElapsedTime());
    setRenderer(gl);
    setRendererExposure(gl, exposure);
    humanRef.current.rotation.y += 0.001;

    // console.log(shaderRef.current);
  });

  const onBeforeCompile = (shader: Shader) => {
    // 给shader添加uniform
    shader.uniforms.uTime = {
      value: time
    };
  };

  return (
    <Center>
      <mesh ref={humanRef} geometry={nodes.human.geometry}>
        {/* <humanShader uTime={time} /> */}
        <meshStandardMaterial
          ref={shaderRef}
          roughness={0.28}
          metalness={1}
          envMap={envMap}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
    </Center>
  );
};

export default Human;
