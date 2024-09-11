import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
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

  const [renderer, setRenderer] = useState<WebGLRenderer>();
  const [time, setTime] = useState(0);

  const humanRef = useRef<any>();
  const shaderRef = useRef<any>();

  const envMap = useMemo(() => {
    if (renderer) {
      return genPmrTexture(renderer, env);
    }
  }, [renderer]);

  const { camera } = useThree();

  const oldCamera = useMemo(() => {
    return camera.clone().position;
  }, []);

  useFrame(({ clock, gl, camera, scene, pointer }, delta) => {
    setTime(clock.getElapsedTime());
    setRenderer(gl);

    if (shaderRef.current.userData.shader) {
      shaderRef.current.userData.shader.uniforms.uTime = {
        value: time
      };
      humanRef.current.material = shaderRef.current;
    }

    scene.environment = envMap!;
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 2.0;
    easing.damp3(
      camera.position,
      [
        oldCamera.x - pointer.x * 30,
        oldCamera.y + pointer.y * 20,
        oldCamera.z + pointer.y * 10
      ],
      0.2,
      delta
    );
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {}, []);

  const onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
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
