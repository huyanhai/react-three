import CanvasLayout from '@/layouts/CanvasLayout';
import Render from './Render';
const index = () => {
  const { width, height } = window.screen;

  const aspect = width / height;
  return (
    <CanvasLayout>
      <Render />
    </CanvasLayout>
  );
};

export default index;
