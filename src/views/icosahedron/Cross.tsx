import { Addition, Base, Geometry } from '@react-three/csg';
import React from 'react';

const Cross = () => {
  return (
    <Geometry>
      <Base>
        <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
      </Base>
      <Addition rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
      </Addition>
    </Geometry>
  );
};

export default Cross;
