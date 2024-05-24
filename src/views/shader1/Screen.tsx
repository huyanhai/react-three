import React, { forwardRef } from 'react';

const Screen = (props, ref) => {
  return (
    <>
      <mesh ref={ref}>
        <meshPhysicalMaterial />
        <boxGeometry />
      </mesh>
    </>
  );
};

export default forwardRef(Screen);
