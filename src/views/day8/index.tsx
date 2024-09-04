import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import './day8.scss';

const index = () => {
  useGSAP(() => {
    gsap.to('.line', {
      x: -10,
      borderColor: 'gray',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.1, from: 'start', repeat: -1, yoyo: true }
    });
    gsap.to('.font80', {
      color: 'gray',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.1, from: 'start', repeat: -1, yoyo: true }
    });
  });

  return (
    <main className="bg-black h-screen grid place-items-center text-white montserrat-alternates-bold day8">
      <section className="w-3/4 h-3/4 relative grid place-items-center test">
        <div className="absolute w-full h-full border  line"></div>
        <div className="absolute w-full h-[95%] border  line"></div>
        <div className="absolute w-full h-[90%] border  line"></div>
        <div className="absolute w-full h-[85%] border  line"></div>
        <div className="absolute w-full h-[80%] border  line"></div>
        <div className="absolute w-full h-[75%] border  line"></div>
        <div className="absolute w-full h-[70%] border  line"></div>
        <div className="absolute w-full h-[65%] border  line"></div>
        <div className="absolute w-full h-[60%] border  line"></div>
        <div className="absolute w-full h-[55%] border  line"></div>
        <div className="absolute w-full h-[50%] border  line"></div>
        <div className="absolute w-full h-[45%] border  line"></div>
        <div className="absolute w-full h-[40%] border  line"></div>
        <div className="absolute w-full h-[35%] border  line"></div>
        <div className="absolute w-full h-[30%] border  line"></div>
        <div className="absolute w-full h-[25%] border  line"></div>
        <div className="absolute w-full h-[20%] border  line"></div>
        <div className="absolute left-[0%] flex justify-center items-center font80">
          h
        </div>
        <div className="absolute left-[10%] flex justify-center items-center font80">
          e
        </div>
        <div className="absolute left-[20%] flex justify-center items-center font80">
          l
        </div>
        <div className="absolute left-[30%] flex justify-center items-center font80">
          l
        </div>
        <div className="absolute left-[40%] flex justify-center items-center font80">
          o
        </div>
        <div className="absolute right-[40%] flex justify-center items-center font80">
          w
        </div>
        <div className="absolute right-[30%] flex justify-center items-center font80">
          o
        </div>
        <div className="absolute right-[20%] flex justify-center items-center font80">
          r
        </div>
        <div className="absolute right-[10%] flex justify-center items-center font80">
          l
        </div>
        <div className="absolute right-[0%] flex justify-center items-center font80">
          d
        </div>
      </section>
    </main>
  );
};

export default index;
