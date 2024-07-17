import { Text } from '@react-three/drei';

const TextCom = () => {
  return (
    <Text fontSize={0.6} color="white" anchorX="center" anchorY="middle" position={[0, 0, 6]}>
      hello world!
    </Text>
  );
};

export default TextCom;
