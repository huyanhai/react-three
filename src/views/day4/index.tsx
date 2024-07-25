import CanvasLayout from '@/layouts/CanvasLayout';
import React from 'react';
import Render from './Render';

const index = () => {
  return (
    <CanvasLayout>
      <Render />
      <color attach={'background'} args={['red']} />
    </CanvasLayout>
  );
};

export default index;
