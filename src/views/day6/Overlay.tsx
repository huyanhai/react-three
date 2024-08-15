import { useDay6 } from '@/store/day6Store';
import React from 'react';

const Overlay = () => {
  const { stop } = useDay6();
  return (
    <div className="w-full h-full absolute inset-0">
      {stop ? 'stop' : 'false'}
    </div>
  );
};

export default Overlay;
