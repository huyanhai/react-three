import {
  Html,
  Scroll,
  Text,
  shaderMaterial,
  useScroll,
  useTexture
} from '@react-three/drei';
import { ThreeEvent, extend, useFrame, useThree } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import { useState } from 'react';
import { Vector2 } from 'three';
import { easing } from 'maath';
import { tips } from '@/constants/index';
import anime from 'animejs';

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
    u_mouse: null,
    u_uv: null,
    u_move: null,
    u_time: 0
  },
  vertex,
  fragment
);

extend({ Shader });

const Plane = (props: TProps) => {
  const { img, position, delta, text } = props;

  const { viewport, pointer } = useThree();
  const texture = useTexture(img);
  const [newVU, setNewVU] = useState(new Vector2(0, 0));
  const [movePoint, setMovePoint] = useState(new Vector2(0, 0));
  const [clock, setClock] = useState(0);
  const [duration, setDuration] = useState(new Vector2(0, 0));
  const [timestamp, setTimestamp] = useState(0);

  const { width, height } = texture.image;

  const deltaOffset = delta * 1000;

  const renderSize = new Vector2(
    (width / 25) * viewport.aspect,
    (height / 25) * viewport.aspect
  );

  const move = (e: ThreeEvent<PointerEvent>) => {
    setNewVU(new Vector2(e.uv?.x, e.uv?.y));
    setMovePoint(new Vector2(e.pointer.x, e.pointer.y));
    setDuration(new Vector2(1, 1));
    setTimestamp(e.timeStamp);
  };

  useFrame(({ clock }) => {
    setClock(clock.getElapsedTime());
  });

  return (
    <group>
      <mesh position={position} onPointerMove={move}>
        <planeGeometry args={[renderSize.x, renderSize.y, 50]} />
        <shader
          u_texture={texture}
          u_aspect={viewport.aspect}
          u_delta={delta}
          u_mouse={pointer}
          u_uv={newVU}
          u_move={movePoint}
          u_time={clock}
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
      <Scroll>
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
      </Scroll>
    </>
  );
};

useTexture.preload(imgConfig.map((_, index) => `/pics/${index + 1}.jpg`));

export default Render;
