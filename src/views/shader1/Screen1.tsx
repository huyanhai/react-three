import React, { forwardRef } from 'react';

const Screen1 = (props, ref) => {
  return (
    <>
      <mesh ref={ref}>
        <meshPhysicalMaterial color={'red'} />
        <boxGeometry />
      </mesh>
    </>
  );
};

export default forwardRef(Screen1);
