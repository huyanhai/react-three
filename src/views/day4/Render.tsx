import { useFrame, extend, useLoader } from '@react-three/fiber';
import fragment from './glsl/fragment.frag';
import vertex from './glsl/vertex.vert';
import { useState } from 'react';
import { Color, TextureLoader, Vector2, Vector3 } from 'three';
import { shaderMaterial, useCubeTexture, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const Shader = shaderMaterial(
  {
    u_resolution: new Vector2(),
    u_time: 0,
    u_camera: new Vector3(),
    u_aspect: 0,
    u_lightColor: new Color(),
    u_env: null,
    u_matcap: null,
    u_cube: null
  },
  vertex,
  fragment
);

extend({ Shader });

const Raymarch = () => {
  // 导入hdr
  const cubeEnv = useCubeTexture(
    ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg'],
    { path: '/cube' }
  );
  const env = useLoader(RGBELoader, '/hdr/cobblestone_street_night_2k.hdr');
  const matcap = useTexture('/matcap/7.png');

  const [time, setTime] = useState(0);
  const [camera, setCamera] = useState(new Vector3());
  const [viewport, setViewport] = useState(new Vector2());
  const [aspect, setAspect] = useState(-1);

  const { lightColor } = useControls({
    lightColor: {
      value: '#ffffff'
    }
  });

  useFrame(({ camera, viewport }, delta) => {
    setTime(time + delta);
    setCamera(new Vector3().copy(camera.position));
    setViewport(new Vector2(viewport.width, viewport.height));
    setAspect(viewport.aspect);
  });

  return (
    <mesh scale={[viewport.x, viewport.y, 1]}>
      <planeGeometry args={[1, 1]} />
      <shader
        u_resolution={viewport}
        u_time={time}
        u_camera={camera}
        u_aspect={aspect}
        u_lightColor={lightColor}
        u_env={env}
        u_matcap={matcap}
        u_cube={cubeEnv}
      />
    </mesh>
  );
};

const Render = () => {
  return (
    <>
      <Raymarch />
    </>
  );
};

useTexture.preload('/matcap/7.png');
useCubeTexture.preload(
  ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg'],
  { path: '/cube' }
)
useLoader.preload(RGBELoader, '/hdr/cobblestone_street_night_2k.hdr')
export default Render;
