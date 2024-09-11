import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import headShader from './glsl/head.frag';
import bodyShader from './glsl/body.frag';

import {
  PMREMGenerator,
  WebGLRenderer,
  Texture,
  WebGLProgramParametersWithUniforms,
  ACESFilmicToneMapping
} from 'three';
import { easing } from 'maath';
import { useDay9 } from '@/store/day9Store';

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
  const { isTouch, scrollProgress } = useDay9();

  const [renderer, setRenderer] = useState<WebGLRenderer>();
  const [time, setTime] = useState(0);
  // 强度
  const [strength] = useState({
    value: 0.1
  });

  const humanRef = useRef<any>();
  const shaderRef = useRef<any>();

  const envMap = useMemo(() => {
    if (renderer) {
      return genPmrTexture(renderer, env);
    }
  }, [renderer]);

  useFrame(({ clock, gl, camera, scene, pointer }, delta) => {
    setTime(time + 0.01);
    setRenderer(gl);

    if (shaderRef.current.userData.shader) {
      shaderRef.current.userData.shader.uniforms.uTime = {
        value: time
      };
      shaderRef.current.userData.shader.uniforms.uStrength = {
        value: strength.value
      };
      humanRef.current.material = shaderRef.current;
    }

    scene.environment = envMap!;
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 2.0;

    if (scrollProgress < 1) return;
    if (isTouch) {
      strength.value < 1 && easing.damp(strength, 'value', 1, 0.5, delta);
    } else {
      strength.value > 0 && easing.damp(strength, 'value', 0, 0.5, delta);
    }
  });

  useEffect(() => {}, []);

  const onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    // 给shader添加uniform
    shader.uniforms.uTime = {
      value: time
    };
    shader.uniforms.uStrength = {
      value: 0
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
      <group>
        <hemisphereLight args={[0xffffff]} intensity={100} />
        <mesh
          ref={humanRef}
          geometry={(nodes.human as any).geometry}
          position={[0, -16.5, 0]}
        >
          <meshStandardMaterial
            toneMapped={true}
            ref={shaderRef}
            roughness={0.42}
            metalness={1}
            envMap={envMap}
            color={'#a8a8a8'}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </group>
    </>
  );
};

export default Human;
