import { Float, shaderMaterial, useGLTF, useScroll } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import {
  BackSide,
  BoxGeometry,
  CatmullRomCurve3,
  Group,
  Shape,
  Vector3
} from 'three';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { easing } from 'maath';
import { useDay6 } from '@/store/day6Store';

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

const AirPlane = memo((props: { delta: number }) => {
  const { nodes } = useGLTF('/modules/airplane.glb');
  const circleRef = useRef<any>(new BoxGeometry());

  useFrame((_, delta) => {
    circleRef.current.rotation.x += delta * 10 * (1 + props.delta);
  });
  return (
    <group scale={0.2} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={nodes.PUSHILIN_Plane_Circle000}></primitive>
      <primitive
        object={nodes.PUSHILIN_Plane_Helix}
        ref={circleRef}
      ></primitive>
    </group>
  );
});

const Plane = () => {
  const scroll = useScroll();
  const { setStop } = useDay6();

  const airPlaneRef = useRef<Group>(new Group());

  const [airPlanePosition, setAirPlanePosition] = useState(new Vector3());
  const [deltaValue, setDeltaValue] = useState(0);

  const { camera } = useThree();

  const points = useMemo(() => {
    return new CatmullRomCurve3([
      new Vector3(0, 0, 0),
      new Vector3(0, 0, -10),
      new Vector3(-5, 0, -20),
      new Vector3(0, 0, -30),
      new Vector3(5, 0, -40),
      new Vector3(0, 0, -50),
      new Vector3(0, 0, -60),
      new Vector3(0, 0, -70)
    ]);
  }, []);

  const shape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, -0.01);
    shape.lineTo(0, 0.01);

    return shape;
  }, [points]);

  const airPos = useMemo<[number, number, number]>(() => {
    return [airPlanePosition.x, airPlanePosition.y + 0.1, airPlanePosition.z];
  }, [airPlanePosition]);

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
      if (airPlaneRef.current.position.z > -90) {
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
      }

      setStop(true);
    }
  };

  useFrame((_, delta) => {
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
      <mesh>
        <extrudeGeometry
          args={[
            shape,
            {
              steps: 1000,
              bevelEnabled: false,
              extrudePath: points
            }
          ]}
        />
        <meshBasicMaterial color={'white'} opacity={0} />
      </mesh>
    </>
  );
};

const Render = () => {
  return (
    <>
      <Plane />
    </>
  );
};

export default Render;
useGLTF.preload('/modules/airplane.glb');
