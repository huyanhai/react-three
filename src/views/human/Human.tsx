import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo, useRef, useState } from 'react';
import headShader from '@/shaders/human/glsl/head.frag';
import bodyShader from '@/shaders/human/glsl/body.frag';

import {
  PMREMGenerator,
  WebGLRenderer,
  Texture,
  Shader,
  ACESFilmicToneMapping
} from 'three';
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  SMAA,
  ToneMapping,
  Scanline,
  HueSaturation
} from '@react-three/postprocessing';

import {
  BlendFunction,
  ToneMappingMode,
  WebGLExtension,
  BlendMode
} from 'postprocessing';

const genPmrTexture = (renderer: WebGLRenderer, texture: Texture) => {
  const pmremGenerator = new PMREMGenerator(renderer!);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  return envMap;
};

const Human = () => {
  const env = useTexture('env.jpg');
  const { nodes } = useGLTF('human.glb');

  const [exposure, setExposure] = useState(0);
  const [intensity, setIntensity] = useState(1);

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
  const effectComposerRef = useRef<any>();

  const envMap = useMemo(() => {
    if (renderer) {
      return genPmrTexture(renderer, env);
    }
  }, [renderer]);

  useFrame(({ clock, gl, camera, scene }) => {
    setTime(clock.getElapsedTime());
    setRenderer(gl);

    if (shaderRef.current.userData.shader) {
      shaderRef.current.userData.shader.uniforms.uTime = {
        value: time
      };
      humanRef.current.material = shaderRef.current;
    }

    scene.environment = envMap!;
  });

  useEffect(() => {
    setIntensity(5);
  }, [renderer]);

  const onBeforeCompile = (shader: Shader) => {
    // 给shader添加uniform
    shader.uniforms.uTime = {
      value: time
    };

    shader.fragmentShader = `${headShader}` + '\n' + shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <envmap_physical_pars_fragment>\n',
      `${bodyShader}\n`
    );

    shaderRef.current.userData.shader = shader;
    humanRef.current.material = shaderRef.current;
  };

  return (
    <>
      {/* <mesh geometry={nodes.human.geometry} position={[0, -16, 0]}>
        <meshStandardMaterial
          color={'hotpink'}
          emissive={'hotpink'}
          emissiveIntensity={4 * exposure}
        />
      </mesh> */}
      <group>
        <mesh
          ref={humanRef}
          geometry={nodes.human.geometry}
          position={[0, -16, 0]}
        >
          <meshStandardMaterial
            toneMapped={false}
            ref={shaderRef}
            roughness={0.28}
            metalness={0.5}
            envMap={envMap}
            color={'#fff'}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </group>

      <EffectComposer ref={effectComposerRef}>
        <Bloom luminanceThreshold={0.9} intensity={intensity} mipmapBlur={true} />
        <BrightnessContrast brightness={0.01} contrast={0.6} />
        {/* <Scanline density={5} /> */}
        <ToneMapping mode={ToneMappingMode.LINEAR} />
        <SMAA />
      </EffectComposer>
    </>
  );
};

export default Human;
