import CanvasLayout from '@/layouts/CanvasLayout';
import React from 'react';
import Render from './Render';
import { Html } from '@react-three/drei';
import { tips } from '@/constants';

const index = () => {
  return (
    <CanvasLayout>
      <Render />
      {/* <color attach={'background'} args={['#111']} /> */}
      <Html center>
        <div className=" text-white whitespace-nowrap text-center text-9xl montserrat-alternates-bold">
          {tips}
        </div>
      </Html>
    </CanvasLayout>
  );
};

export default index;
