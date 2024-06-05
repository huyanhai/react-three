import React from 'react';

const Light = () => {
  return (
    <spotLight
      position={[-10, 10, -10]}
      intensity={100}
      color={'#ff0000'}
      shadow-mapSize-width={2048}
    ></spotLight>
  );
};

export default Light;
