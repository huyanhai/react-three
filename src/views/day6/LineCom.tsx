import { useDay6 } from '@/store/day6Store';
import { useScroll, Float, shaderMaterial } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Group,
  CatmullRomCurve3,
  Vector3,
  Shape,
  BackSide,
  DoubleSide
} from 'three';
import AirPlane from './AirPlane';

import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import { extend } from '@react-three/fiber';
import { pointsPosition } from './constants';

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

const LineCom = () => {
  const scroll = useScroll();
  const { stop, setStop } = useDay6();

  const airPlaneRef = useRef<Group>(new Group());
  const roundRef = useRef<Group>(new Group());

  const [deltaValue, setDeltaValue] = useState(0);

  const { camera } = useThree();

  const points = useMemo(() => {
    return new CatmullRomCurve3(pointsPosition);
  }, []);

  const shape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, -0.01);
    shape.lineTo(0, 0.01);

    return shape;
  }, [points]);

  const updateCamera = (delta?: number) => {
    setDeltaValue(scroll.delta * 10e2);
    const offset = scroll.offset < 0 ? 0 : scroll.offset;
    if (offset < 0.9) {
      const cameraPosition = points?.getPointAt(offset);
      const lookAt = points.getPointAt(offset + 0.1);
      const tangent = points.getTangent(offset + 0.02).normalize();
      const air = points.getPointAt(offset + 0.02);

      airPlaneRef.current.lookAt(
        airPlaneRef.current.position.clone().add(tangent)
      );
      camera.position.copy(
        new Vector3(cameraPosition.x, cameraPosition.y + 0.5, cameraPosition.z)
      );
      camera.lookAt(lookAt);
      easing.damp3(
        airPlaneRef.current.position,
        [air.x, air.y + 0.2, air.z],
        0.05,
        delta
      );
      setStop(false);
    } else {
      easing.damp3(
        airPlaneRef.current.position,
        [
          airPlaneRef.current.position.x,
          airPlaneRef.current.position.y,
          airPlaneRef.current.position.z - 1
        ],
        0.3,
        delta
      );
      easing.damp3(airPlaneRef.current.scale, [0, 0, 0], 3, delta);
      easing.damp3(
        roundRef.current.position,
        [
          roundRef.current.position.x,
          roundRef.current.position.y,
          roundRef.current.position.z + 2
        ],
        0.3,
        delta
      );
      setStop(true);
    }
  };

  useFrame((_, delta) => {
    if (stop && airPlaneRef.current.position.z < -80) return;
    updateCamera(delta);
  });

  useEffect(() => {
    updateCamera();
  }, []);

  return (
    <>
      <group ref={airPlaneRef}>
        <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
          <AirPlane delta={deltaValue} />
        </Float>
      </group>
      <mesh>
        <tubeGeometry args={[points, 256, 1, 128, false]} />
        <shader side={BackSide} u_delta={deltaValue} />
      </mesh>
      <group ref={roundRef}>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color={'white'} opacity={0} />
        </mesh>
      </group>
    </>
  );
};

export default LineCom;
