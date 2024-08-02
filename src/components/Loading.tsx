import { Html, useProgress } from '@react-three/drei';
import Number from './Number';
const Loading = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html fullscreen>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 break-keep"></div>
    </Html>
  );
};

export default Loading;
