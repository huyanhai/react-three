import { useRef, ReactNode } from 'react';
import {
  ScrollScene,
  UseCanvas,
  useScrollRig,
  styles
} from '@14islands/r3f-scroll-rig';
import { MeshDistortMaterial } from '@react-three/drei';
import { WebGLText } from '@14islands/r3f-scroll-rig/powerups';

interface TextProps {
  children: ReactNode;
  wobble?: boolean;
  className?: string;
  font?: string;
}

const Text = ({
  children,
  wobble,
  className,
  font = '/font/MontserratAlternates-Bold.ttf',
  ...props
}: TextProps) => {
  const el = useRef<HTMLElement>(null);
  const { hasSmoothScrollbar } = useScrollRig();
  return (
    <>
      <span
        ref={el}
        className={styles.transparentColorWhenSmooth + ' ' + className}
        style={{ display: 'block' }}
        {...props}
      >
        {children}
      </span>

      {hasSmoothScrollbar && (
        <UseCanvas debug={false}>
          <ScrollScene track={el as any}>
            {(props) => (
              <WebGLText
                el={el} // getComputedStyle is called on this element
                font={font}
                glyphGeometryDetail={16} // needed for distortion to work
                {...props} // contains scale from the ScrollScene
              >
                {wobble && <MeshDistortMaterial speed={1.4} distort={0.14} />}
                {children}
              </WebGLText>
            )}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  );
};

export default Text;
