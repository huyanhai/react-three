import React, { forwardRef } from 'react';

const Screen = (props: any, ref: any) => {
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
