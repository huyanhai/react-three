// @ts-nocheck
import { RoundedBox, useTexture } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  InstancedMesh,
  Matrix4,
  Material,
  PlaneGeometry,
  InstancedBufferAttribute,
  DoubleSide,
  Vector2
} from 'three';
import {
  MeshStandardNodeMaterial,
  vec4,
  vec3,
  uv,
  tslFn,
  texture,
  attribute,
  positionLocal,
  sin,
  mul,
  positionGeometry,
  uniform,
  cameraProjectionMatrix,
  modelViewMatrix,
  timerLocal,
  timerGlobal,
  length,
  vec2,
  float
} from 'three/nodes';

const sdCircle = (
  n: ReturnType<typeof vec2>,
  r: ReturnType<typeof float> | number
) => {
  return length(n).sub(r);
};

const CustomMaterial = () => {
  const img = useTexture('/pics/6.jpg');
  const [mouse, setMouse] = useState(new Vector2(0, 0));
  const [aspect, setAspect] = useState(0);
  const [screen, setScreen] = useState(new Vector2(0, 0));

  useFrame(({ mouse, viewport }) => {
    setMouse(mouse); // 范围是[-1,1],中心是[0,0]
    setAspect(viewport.aspect);
    setScreen(new Vector2(viewport.width, viewport.height));
  });

  const uMouse = uniform(mouse); // 使用uniform
  const uAspect = uniform(aspect);
  const uScreen = uniform(screen);

  const material: Material = new MeshStandardNodeMaterial({
    color: '#fff',
    transparent: true,
    wireframe: false,
    metalness: 0.7,
    roughness: 0.5,
    side: DoubleSide
  });

  const colorFn = tslFn(([x, y, z]) => {
    return vec3(1, 0, 0);
  });

  const positionFn = tslFn(() => {
    const pixUv = attribute('aPixelUV');
    const textureColor = texture(img, pixUv);
    const pixel = uAspect;
    // return textureColor;
    // uv*2-1,将圆圈放到中心
    const uvCenter = pixUv.mul(2).sub(1);
    const mouseFormate = uMouse.mul(pixel);
    const s = length(uvCenter.sub(mouseFormate)).sub(0.1);

    const p = positionLocal;
    // p.z.addAssign(
    //   textureColor.x.mul(textureColor.y).mul(sin(timerGlobal()).add(1).mul(10))
    // );
    // p.z.addAssign(sin(timerGlobal()).mul(10));
    return p;
  });

  material.colorNode = colorFn(1, 1, 0);
  material.positionNode = positionFn(); // vec3
  // material.vertexNode = tslFn(() => {
  //   const textureColor = texture(img, attribute('aPixelUV'));
  //   // In a vertexNode, acts as geometry positions of your mesh's cube.
  //   const position = positionLocal;

  //   // position.z.addAssign(textureColor.x.mul(textureColor.y).mul(sin(t).mul(5)));

  //   // Need to apply transformation matrices for output to be the same
  //   return cameraProjectionMatrix.mul(modelViewMatrix).mul(position);
  // })();
  return material;
};

const Base = () => {
  const instanceRef = useRef<InstancedMesh>(null);
  const geometryRef = useRef<PlaneGeometry>(null);

  // 横向个数
  const row = 50;
  // 纵向个数
  const col = 50;
  // 总个数
  const count = row * col;
  // 间距
  const gap = 0;
  // 单个尺寸
  const size = 2;

  let uv = new Float32Array(count * 2);

  useEffect(() => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let m = new Matrix4();
        const index = i * col + j;
        uv[index * 2] = i / (row - 1);
        uv[index * 2 + 1] = j / (col - 1);
        let newSize = gap + size;
        m.setPosition(
          i * newSize - (newSize * (row - 1)) / 2,
          0,
          j * newSize - (newSize * (col - 1)) / 2
        );
        instanceRef.current?.setMatrixAt(index, m);
      }
    }
    (instanceRef.current as InstancedMesh).instanceMatrix.needsUpdate = true;
    (instanceRef.current as InstancedMesh).computeBoundingSphere();
    geometryRef.current?.setAttribute(
      'aPixelUV',
      new InstancedBufferAttribute(uv, 2, false)
    );
  }, [instanceRef.current]);

  return (
    <>
      <instancedMesh
        castShadow
        receiveShadow
        ref={instanceRef}
        args={[null, null, count]}
        material={CustomMaterial()}
      >
        <boxGeometry args={[size, size, size]} ref={geometryRef} />
      </instancedMesh>

      <ambientLight color={'white'} intensity={10} />
      <directionalLight
        castShadow
        color={'white'}
        position={[0, 0, -10]}
        intensity={2}
      />
      <directionalLight
        castShadow
        color={'white'}
        position={[-5, 0, 10]}
        intensity={0.5}
      />
    </>
  );
};

const Render = () => {
  return <Base />;
};

export default Render;
