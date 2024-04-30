"use client";
import { useScroll, Image } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";

const M1 = (props: any) => {
  const { height, width } = useThree((state) => state.viewport);

  const data = useScroll();
  const group = useRef();

  useFrame((state, delta) => {
    // 从0开始增加，当到达1/3时，则为1，后续不在增加
    // const a = scroll.range(0, 1 / 3);
    // 从1/3开始增加，当到达2/3时为1，后续不增加
    // const b = scroll.range(1 / 3, 1 / 3)
    // const c = scroll.range(1 / 3, 1 / 3, 0.1)
    // const d = scroll.curve(1 / 3, 1 / 3)
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1;
    group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3;
    group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3);
    group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
    // const offset = 1 - scroll.offset;
    // state.camera.position.set(Math.sin(offset) * -10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10);
  });
  return (
    <group {...props} ref={group}>
      <Image scale={[10, height, 1]} position={[-5, 0, 0]} url="/p1.jpg" />
      <Image position={[2, 0, 1]} scale={3} url="/p1.jpg" />
      <Image position={[-2.3, -height, 2]} scale={[1, 3, 1]} url="/p1.jpg" />
      <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url="/p1.jpg" />
      <Image position={[0.75, -height, 3.5]} scale={1.5} url="/p1.jpg" />
      <Image position={[0, -height * 1.5, 2.5]} scale={[1.5, 3, 1]} url="/p1.jpg" />
      <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height / 2, 1]} url="/p1.jpg" />
    </group>
  );
};

export default M1;
