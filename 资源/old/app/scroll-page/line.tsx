"use client";

import { Line, useScroll, Text, useCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef, useState } from "react";

const LineCom = () => {
  const ref = useRef<any>();
  const box = useRef<any>();
  const scroll = useScroll();
  const [arr] = useState(new Array(10).fill(0));
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [num, setNum] = useState([0, 0, 0]);

  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      setNum(parseInt(scroll.offset * arr.length));
      const y = scroll.range(index / arr.length, 0.1);
      easing.damp(child.scale, "x", 1 + y, 0.1, delta);
    });

    easing.damp(box.current.rotation, "z", scroll.offset * Math.PI * 2, 0.1, delta);
    easing.damp(box.current.rotation, "y", scroll.offset * Math.PI * 2, 0.1, delta);
    easing.damp(state.camera.position, "z", 5 + scroll.offset, 0.1, delta);
    setWidth(state.viewport.width / 2);
    setHeight(state.viewport.height / 2);
  });

  return (
    <group>
      <group ref={ref}>
        {arr.map((item, index) => {
          return (
            <Line
              key={index}
              points={[
                [0, 0.1, 0],
                [0.05, 0.1, 0],
              ]}
              color={"white"}
              position={[-width + 0.2, index / arr.length - (arr.length / 2) * 0.1, 0]}
            />
          );
        })}
      </group>
      <group>
        <Text color={"white"} position={[-width + 0.5, 0, 0]} scale={0.5} anchorX={"left"}>
          {num}
        </Text>
      </group>
      <mesh ref={box}>
        <meshNormalMaterial />
        <boxGeometry />
      </mesh>
    </group>
  );
};

export default LineCom;
