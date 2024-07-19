import { useTexture } from '@react-three/drei';

const Torus = () => {
  const [gold] = useTexture(['matcap/4.png']);

  return (
    <mesh position={[0, 14, 0]} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[10, 4, 16, 100]} />
      <meshMatcapMaterial matcap={gold} />
    </mesh>
  );
};
useTexture.preload(['matcap/4.png']);
export default Torus;
