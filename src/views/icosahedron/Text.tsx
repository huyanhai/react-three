import { Text, useTexture } from '@react-three/drei';

const TextCom = () => {
  const [gold] = useTexture(['matcap/5.png']);

  return (
    <Text
      strokeColor={'yellow'}
      fontSize={0.6}
      anchorX="center"
      anchorY="middle"
      position={[0, 0, 6]}
    >
      hello world!
      <meshMatcapMaterial matcap={gold} />
    </Text>
  );
};

export default TextCom;
