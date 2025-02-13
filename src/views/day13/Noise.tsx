import vertexShader from './glsl/noiseVertex.vert';
import fragmentShader from './glsl/noiseFragment.frag';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {
  DataTexture,
  DoubleSide,
  FloatType,
  MathUtils,
  Mesh,
  RGBAFormat
} from 'three';
import { useGLTF } from '@react-three/drei';

const getRandomDataBox = (width: number, height: number) => {
  var len = width * height * 4;
  var data = new Float32Array(len);

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4;

    data[stride] = (Math.random() - 0.5) * 2.0;
    data[stride + 1] = (Math.random() - 0.5) * 2.0;
    data[stride + 2] = (Math.random() - 0.5) * 2.0;
    data[stride + 3] = 1.0;
  }
  return data;
};
const Noise = () => {
  const { nodes } = useGLTF('test1.glb');
  const node1 = useMemo(() => {
    // 细分曲面？好像没啥作用
    // const modifier = new TessellateModifier(20, 20);
    // const { attributes } = modifier.modify(nodes?.head1.geometry);
    const { attributes } = (nodes?.head1 as Mesh).geometry;

    const position = attributes.position.array;
    const count = attributes.position.count;

    const array = new Float32Array(count * 4);
    const size = Math.sqrt(count);

    for (let index = 0; index < count; index++) {
      const i3 = index * 3;
      const i4 = index * 4;
      array[i4] = position[i3];
      array[i4 + 1] = position[i3 + 1];
      array[i4 + 2] = position[i3 + 2];
      array[i4 + 3] = 1;
    }

    return {
      array,
      size
    };
  }, [nodes]);

  const meshRef = useRef<Mesh>(new Mesh());
  const size = 90;

  const positionsTextureA = new DataTexture(
    node1.array,
    node1.size,
    node1.size,
    RGBAFormat,
    FloatType
  );

  const positionsTextureB = new DataTexture(
    getRandomDataBox(size, size),
    size,
    size,
    RGBAFormat,
    FloatType
  );

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uPositionA: {
        value: positionsTextureA
      },
      uPositionB: {
        value: positionsTextureB
      }
    };
  }, []);

  positionsTextureA.needsUpdate = true;
  positionsTextureB.needsUpdate = true;

  useFrame(({ clock }) => {
    (meshRef.current.material as any).uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Noise;
