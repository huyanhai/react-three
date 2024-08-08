import {
  Html,
  MeshTransmissionMaterial,
  Scroll,
  Text,
  shaderMaterial,
  useScroll,
  useTexture
} from '@react-three/drei';
import { ThreeEvent, extend, useFrame, useThree } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CylinderGeometry, InstancedMesh, Object3D, Vector2 } from 'three';
import { easing } from 'maath';
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
    u_mouse: null,
    u_uv: null,
    u_move: null,
    u_time: 0,
    u_duration: null
  },
  vertex,
  fragment
);

extend({ Shader });
const obj = new Object3D();
const Plane = (props: TProps) => {
  const { img, position, delta, text } = props;

  const { viewport, pointer } = useThree();
  const texture = useTexture(img);
  const [newVU, setNewVU] = useState(new Vector2(0, 0));
  const [movePoint, setMovePoint] = useState(new Vector2(0, 0));
  const [clock, setClock] = useState(0);
  const [duration] = useState(new Vector2(0, 0));
  const [isOver, setIsOver] = useState(false);
  const instancedRef = useRef<InstancedMesh>(null);

  const cylinder = useMemo(() => {
    return new CylinderGeometry(0.5, 0.5, 0.5, 32, 32);
  }, []);

  const { width, height } = texture.image;

  const deltaOffset = delta * 1000;

  const renderSize = new Vector2(
    (width / 25) * viewport.aspect,
    (height / 25) * viewport.aspect
  );

  const size = useMemo(() => {
    return Math.ceil(width / 50);
  }, [width]);

  const move = (e: ThreeEvent<PointerEvent>) => {
    setNewVU(new Vector2(e.uv?.x, e.uv?.y));
    setMovePoint(new Vector2(e.pointer.x, e.pointer.y));
  };

  const over = () => {
    setIsOver(true);
  };

  const out = () => {
    setIsOver(false);
  };

  useFrame(({ clock }, delate) => {
    setClock(clock.getElapsedTime());
    if (isOver) {
      easing.damp(duration, 'x', 1, 0.5, delate);
    } else {
      easing.damp(duration, 'x', 0, 0.5, delate);
    }
  });

  useEffect(() => {
    for (let index = 0; index < size; index++) {
      obj.position.set(
        -renderSize.x / 2 + index,
        position[1] - renderSize.y / 2,
        position[2]
      );
      obj.updateMatrix();
      instancedRef.current?.setMatrixAt(index, obj.matrix);
    }
    (instancedRef.current as InstancedMesh).instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh ref={instancedRef} args={[null as any, null as any, size]}>
        <boxGeometry args={[0.1, renderSize.y, 0.1]} />
        <meshBasicMaterial color={'red'} />
        {/* <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
        /> */}
      </instancedMesh>
      <mesh
        position={position}
        onPointerMove={move}
        onPointerOver={over}
        onPointerOut={out}
      >
        <planeGeometry args={[renderSize.x, renderSize.y, 50]} />
        <shader
          u_texture={texture}
          u_aspect={viewport.aspect}
          u_delta={delta}
          u_mouse={pointer}
          u_uv={newVU}
          u_move={movePoint}
          u_time={clock}
          u_duration={duration}
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
  const unit = 35;
  const [offset, setOffset] = useState(scroll.offset * unit);
  const [delta, setDelta] = useState(scroll.delta);
  useFrame(() => {
    setOffset(scroll.offset * unit);
    setDelta(scroll.delta);
  });

  return (
    <>
      {/* <fog attach="fog" args={['white', 1, 20]} /> */}
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
