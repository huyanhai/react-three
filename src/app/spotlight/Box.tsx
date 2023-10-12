"use client";

import { Box, MeshReflectorMaterial, Plane, SpotLight } from "@react-three/drei";
import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";

const PlaneM = (props: any) => {
  const [ref] = usePlane(() => ({ type: "Kinematic", quaternion: [-1, 1, 1, 1], ...props }));
  return (
    <Plane ref={ref} args={[30, 30]} {...props} receiveShadow>
      <meshPhysicalMaterial color={"#dedede"} />
    </Plane>
  );
};

const LightM = () => {
  return (
    <mesh position={[0, 10, 0]}>
      <cylinderGeometry args={[0.5, 1.5, 2, 32]} />
      <meshStandardMaterial />
      <SpotLight castShadow penumbra={0.2} radiusTop={0.4} radiusBottom={40} distance={80} angle={0.45} attenuation={20} anglePower={10} intensity={100} opacity={0.1} />
      {/* <primitive object={target} position={[0, -1, 0]} /> */}
    </mesh>
  );
};

const BoxM = (props: any) => {
  const [ref] = useBox(() => ({ mass: 500, linearDamping: 0.95, angularDamping: 0.95, ...props }));
  return (
    <Box ref={ref} receiveShadow castShadow dispose={null}>
      <meshStandardMaterial color={"red"} />
    </Box>
  );
};

const BoxContainer = () => {
  return (
    <>
      <Physics allowSleep={false} iterations={100} gravity={[0, -80, 0]}>
        <Debug color={"red"}>
          <BoxM position={[0, 5, 0]} />
          <BoxM position={[0, 10, 0]} />
          <LightM />
          <PlaneM position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </Debug>
      </Physics>
    </>
  );
};

export default BoxContainer;
