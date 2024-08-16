import { useGLTF } from '@react-three/drei';
import { cloudPosition } from './constants';

const CloudCom = () => {
  const { nodes } = useGLTF('/modules/cloud.gltf');
  console.log(nodes);

  return (
    <group>
      {cloudPosition.map((point, index) => {
        return (
          <mesh
            geometry={(nodes.Mball001 as any).geometry}
            position={point}
            key={index}
            scale={2}
          >
            <meshStandardMaterial color={'white'}/>
          </mesh>
        );
      })}
    </group>
  );
};

export default CloudCom;
useGLTF.preload('/modules/cloud.gltf');
