import { Text, shaderMaterial, useScroll, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import { useState } from 'react';
import { Vector2 } from 'three';
import { tips } from '@/constants/index';

type TPosition = [number, number, number];

type TImgItem = { src: string; position: TPosition; text: string };
type TProps = {
  img: string;
  position: TPosition;
  delta: number;
  offset: number;
  text: string;
};

const imgConfig: TImgItem[] = [
  { src: '/pics/1.jpg', position: [0, 0, 0], text: 'HE' },
  { src: '/pics/2.jpg', position: [0, 0, 0], text: 'LL' },
  { src: '/pics/3.jpg', position: [0, 0, 0], text: 'O' },
  { src: '/pics/4.jpg', position: [0, 0, 0], text: 'WO' },
  { src: '/pics/5.jpg', position: [0, 0, 0], text: 'R' },
  { src: '/pics/6.jpg', position: [0, 0, 0], text: 'LD' }
];

const Shader = shaderMaterial(
  {
    u_texture: null,
    u_aspect: 0,
    u_delta: 0,
    transparent: true,
    wireframe: false,
    u_mouse: null
  },
  vertex,
  fragment
);

extend({ Shader });

const Plane = (props: TProps) => {
  const { img, position, delta, text } = props;

  const { viewport, pointer } = useThree();
  const texture = useTexture(img);

  const { width, height } = texture.image;

  const renderSize = new Vector2(
    (width / 25) * viewport.aspect,
    (height / 25) * viewport.aspect
  );

  const deltaOffset = delta * 1000;

  return (
    <group>
      <mesh position={position}>
        <planeGeometry args={[renderSize.x, renderSize.y, 50]} />
        <shader
          u_texture={texture}
          u_aspect={viewport.aspect}
          u_delta={delta}
          u_mouse={pointer}
        />
      </mesh>
      <Text
        color={'white'}
        font="/font/BodoniModaSC-Italic-VariableFont_opsz,wght.ttf"
        position={[
          -renderSize.x / 2,
          position[1] + renderSize.y / 2 - 10 + deltaOffset,
          1
        ]}
        scale={20}
      >
        {text.toLocaleUpperCase()}
      </Text>
      <Text
        color={'white'}
        font="/font/BodoniModaSC-Italic-VariableFont_opsz,wght.ttf"
        position={[
          renderSize.x / 2,
          position[1] - renderSize.y / 2 + 5 + deltaOffset,
          1
        ]}
        scale={4}
      >
        {tips.toLocaleUpperCase()}
      </Text>
    </group>
  );
};

const Render = () => {
  const scroll = useScroll();
  const unit = 500;
  const [offset, setOffset] = useState(scroll.offset * unit);
  const [delta, setDelta] = useState(scroll.delta);
  useFrame(() => {
    setOffset(scroll.offset * unit);
    setDelta(scroll.delta);
  });
  return (
    <>
      <fog attach="fog" args={['white', 1, 20]} />
      {imgConfig.map((item, index) => (
        <Plane
          key={index}
          img={item.src}
          delta={delta}
          offset={offset}
          text={item.text}
          position={[
            item.position[0],
            -(100 * index) + offset,
            item.position[2]
          ]}
        />
      ))}
    </>
  );
};

useTexture.preload(imgConfig.map((_, index) => `/pics/${index + 1}.jpg`));

export default Render;
