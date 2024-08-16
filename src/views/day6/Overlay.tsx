import { tips } from '@/constants';
import { useDay6 } from '@/store/day6Store';
import React from 'react';

const Overlay = () => {
  const { stop } = useDay6();
  return (
    <div className="w-full h-full absolute inset-0 flex justify-center items-center">
      {stop ? (
        <div className={`text-white whitespace-nowrap text-center text-9xl montserrat-alternates-bold touch-none play ${stop ? 'stop' : ''}`}>
          {tips}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Overlay;
