import Human from './Human';
import Effect from './Effect';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';
import { useFrame, useThree } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLine } from './hooks/useLine';
import { useMemo, useState } from 'react';
import { PerspectiveCamera } from 'three';
import { useDay9 } from '@/store/day9Store';
import { easing } from 'maath';
import { FIRST_ROTATION } from './constants';

const Render = () => {
  const { camera } = useThree();
  const { shape, points, getPointAt } = useLine();
  const { scrollProgress, changeScrollProgress } = useDay9();
  const [scrolling, setScrolling] = useState(false);

  const oldCamera = useMemo(() => {
    return camera.clone().position;
  }, [scrollProgress]);

  useFrame(({ pointer, camera }, delta) => {
    if (scrollProgress < 1) return;
    easing.damp3(
      camera.position,
      [
        oldCamera.x - pointer.x * 30,
        oldCamera.y + pointer.y * 20,
        oldCamera.z + pointer.y * 10
      ],
      0.2,
      delta
    );
    camera.lookAt(0, 0, 0);
  });
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
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
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          changeScrollProgress(progress);
          const point = getPointAt(progress);
          camera.position.set(point.x, point.y, point.z);
          camera.lookAt(0, 0, 0);
          (camera as PerspectiveCamera).fov = 3 + (6 * progress) / 3;
          (camera as PerspectiveCamera).updateProjectionMatrix();
        },
        onToggle: (self) => {
          console.log('end');

          setScrolling(self.isActive);

          console.log(scrolling, self.isActive);
        }
      }
    });
    tl.fromTo(camera.rotation, FIRST_ROTATION, {
      x: -0.378338441934772,
      y: 12,
      z: 0.09531055245982788
    });

    tl.to('#text', {
      opacity: 0,
      y: -100
    });
  });

  return (
    <>
      <Human />
      <Effect />
      <color attach="background" args={['#050505']} />
      {/* <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: 1000,
                bevelEnabled: false,
                extrudePath: points
              }
            ]}
          />
          <meshBasicMaterial color={'white'} opacity={0} />
        </mesh> */}
    </>
  );
};

export default Render;
