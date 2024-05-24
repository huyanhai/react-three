import React from 'react';
import { Color, Vector3 } from 'three';

type Props = {
  color: string;
  intensity: number;
  position: [x: number, y: number, z: number];
};

const Light = (props: Props) => {
  const { color, intensity } = props;

  return (
    <pointLight {...props}>
      <mesh>
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={intensity / 1000}
        />
        <sphereGeometry args={[0.1, 10, 10]} />
      </mesh>
    </pointLight>
  );
};

export default Light;
