import { useEffect, forwardRef, useRef } from 'react';
import anime from 'animejs';

const Number = (props: { number: string }) => {
  const dynamic = useRef(null);
  useEffect(() => {
    anime({
      targets: dynamic.current,
      innerHTML: [0, props.number],
      easing: 'easeInOutExpo',
      round: 1,
      autoplay: true,
      duration: 100,
    });
  }, [props.number]);
  return <span className="text-black" ref={dynamic}></span>;
};

export default Number;
