import { useMemo, useRef } from 'react';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackSide, DoubleSide, FrontSide, Group } from 'three';
import { useGSAP } from '@gsap/react';
import { MeshTransmissionMaterial, Image } from '@react-three/drei';
import { geometry } from 'maath';
import { extend } from '@react-three/fiber';

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

const positions = new Array(20).fill(1).map((item, index) => {
  return {
    z: index * 0.05,
    img: `https://picsum.photos/id/1/100/130`
  };
});
let winsize = { width: window.innerWidth, height: window.innerHeight };
const Render = () => {
  const groupRef = useRef<Group>(new Group());
  let t = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    t.current = gsap.timeline({
      defaults: {
        duration: 1
        // ease: 'power1.easeInOut'
        // repeat: 1, // 循环次数
        // yoyo: false // 是否往返运动
      },
      scrollTrigger: {
        trigger: `#scroll`,
        pin: false, // pin the trigger element while active
        start: 'top+=100 top', // 当滚动条距离顶部100的位置开始动画
        end: 'center center', // 当滚动条到达窗口中心的时候就停止
        // 正向和反向
        scrub: true,
        // 标记，开启后会出现滚动条
        markers: false
      }
    });
    groupRef.current.children.forEach((child, index) => {
      // >x 表示上一个动画结束后x秒执行当前动画
      // <x 表示上一个动画开始x秒后执行当前动画
      // +=x 表示上一个动画结束x秒后
      // -=x 表示上一个动画开始x秒后
      // add('label',2) 在2秒处添加一个标记
      // label+=x 在label处往后推x秒
      // label-=x 在label处往前推x秒
      t.current
        ?.fromTo(
          child.position,
          {
            y: () => {
              return index * -0.2;
            },
            x: () => {
              return -1 * Math.sin(index / 10);
            }
          },
          {
            y: () => {
              return 1 - index * 0.2;
            },
            x: () => {
              return 1 - Math.sin(index / 10);
            }
          }
        )
        .fromTo(
          child.rotation,
          {
            // 设置时间轴的间隔时间
            stagger: 0.05,
            x: () => {
              return Math.PI / 2 + 0.1 * index;
            },
            z: () => {
              return Math.PI / 20 + index * 0.1;
            },
          },
          {
            // 设置时间轴的间隔时间
            stagger: 0.05,
            z: () => {
              return Math.PI * 2 + index * 0.1;
            },
          },
          '<0.1'
        );
    });

    // 表示一个时间轴上的一段效果动画
    // t.current?.fromTo(
    //   '#text',
    //   {
    //     y: '-100%',
    //     opacity: 0
    //   },
    //   { y: '0', opacity: 1 },
    //   '+=0.1'
    // );

    // t.current?.to(groupRef.current.rotation, {
    //   z: Math.PI,
    //   duration: 1
    // });
  });

  return (
    <group ref={groupRef}>
      {positions.map((item, index) => {
        return (
          <group key={index} position={[0, 0, -item.z]}>
            <Image url={item.img} key={`${index}_1`} side={DoubleSide} />
            {/* <mesh>
              <boxGeometry args={[1, 1.3, 0.01]} />
              <meshBasicMaterial color={'red'} />
            </mesh> */}
          </group>
        );
      })}
    </group>
  );
};

export default Render;
// useTexture.preload('/hdr/studio_small_09_4k.exr')
