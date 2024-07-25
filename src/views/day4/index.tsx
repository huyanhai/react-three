import CanvasLayout from '@/layouts/CanvasLayout';
import React from 'react';
import Render from './Render';

const index = () => {
  return (
    <CanvasLayout>
      <Render />
      {/* <color attach={'background'} args={['#111']} /> */}
    </CanvasLayout>
  );
};

export default index;
