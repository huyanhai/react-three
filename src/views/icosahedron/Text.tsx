import { Html, Text, useTexture } from '@react-three/drei';
import { tslFn } from 'three/nodes';

const TextCom = () => {
  const [gold] = useTexture(['matcap/5.png']);

  return (
    <>
      {/*<Text
        strokeColor={'yellow'}
        fontSize={10}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, -20]}
        fontWeight={700}
        color={'white'}
      >
        hello world!
        <meshMatcapMaterial matcap={gold} />
      </Text>*/}
      <Html center prepend>
        <div className="text-white whitespace-nowrap text-center text-9xl montserrat-alternates-bold">
          hello world!
        </div>
      </Html>
    </>
  );
};

export default TextCom;
