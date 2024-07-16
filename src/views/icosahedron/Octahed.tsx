import { useTexture } from '@react-three/drei';

const Octahed = () => {
  const [gold] = useTexture(['matcap/2.png']);

  return (
    <mesh>
      <octahedronGeometry args={[2, 1]} />
      <meshMatcapMaterial matcap={gold} />
    </mesh>
  );
};

export default Octahed;
