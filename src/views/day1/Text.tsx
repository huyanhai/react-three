import { tips } from '@/constants';
import { Html, Text, useTexture } from '@react-three/drei';

const TextCom = () => {
  return (
    <>
      <Html center prepend>
        <div className="text-white whitespace-nowrap text-center text-9xl montserrat-alternates-bold">
          {tips}
        </div>
      </Html>
    </>
  );
};

export default TextCom;
