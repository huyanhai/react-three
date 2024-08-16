import LineCom from './LineCom';
import CloudCom from './CloudCom';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const Render = () => {
  return (
    <>
      <CloudCom />
      <LineCom />
    </>
  );
};

export default Render;
