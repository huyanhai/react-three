import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
const index = () => {
  return (
    <CanvasLayout>
      <color attach={'background'} args={['#000']} />
      <Render />
    </CanvasLayout>
  );
};

export default index;
