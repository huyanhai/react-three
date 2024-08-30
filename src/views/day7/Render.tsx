import { useRef } from 'react';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Group } from 'three';
import { useGSAP } from '@gsap/react';

const Render = () => {
  const groupRef = useRef<Group>(new Group());
  let t = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    t.current = gsap.timeline({
      defaults: {
        duration: 10
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
      t.current?.to(
        child.rotation,
        {
          // 设置时间轴的间隔时间
          stagger: 0.5,
          z: Math.PI * 2
        },
        '<0.5'
      );
    });

    // 表示一个时间轴上的一段效果动画
    t.current?.fromTo(
      '#text',
      {
        y: '-100%',
        opacity: 0
      },
      { y: '0', opacity: 1 },
      '+=0.1'
    );
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshBasicMaterial color={'red'} />
      </mesh>
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[1.2, 2.4, 0.1]} />
        <meshBasicMaterial color={'green'} />
      </mesh>
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[1.3, 2.6, 0.1]} />
        <meshBasicMaterial color={'blue'} />
      </mesh>
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[1.4, 2.8, 0.1]} />
        <meshBasicMaterial color={'while'} />
      </mesh>
    </group>
  );
};

export default Render;
