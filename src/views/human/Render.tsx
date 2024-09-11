import Human from './Human';
import Effect from './Effect';

const Render = () => {
  return (
    <>
      <Human />
      <Effect />
      <color attach="background" args={['#050505']} />
    </>
  );
};

export default Render;
