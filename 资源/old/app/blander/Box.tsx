"use client";

import { Merged, MeshTransmissionMaterial, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { Geometry } from "three/examples/jsm/deprecated/Geometry.js";

const BoxContainer = () => {
  const data = useGLTF("models/1.glb");
  const data1 = useGLTF("models/sss.glb");

  console.log(data1);
  

  const { showAsciiRenderer, ...config } = useControls({
    showAsciiRenderer: { value: false },
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.06, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
  });

  const { scene, animations, nodes } = data;

  const groupRef = useRef<any>();

  const geometryArray = Object.keys(nodes)
    .map((key: string) => {
      if (key !== "Scene") {
        return nodes[key]?.geometry;
      }
    })
    .filter(Boolean);

  const { actions } = useAnimations(animations, scene);

  useFrame((state, dl) => {
    groupRef.current?.children.map((item: any, index: number) => {
      item.rotation.set((item.rotation.x += dl * (index + 1) * 0.9), 0, 0);
    });
  });

  useEffect(() => {
    groupRef.current?.children.map((item: any) => {
      item.rotation.set(Math.PI / 2, 0, 0);
    });
  }, [groupRef]);

  useEffect(() => {
    actions["a1"]?.play();
    actions["a2"]?.play();
    actions["a3"]?.play();
  }, [actions]);

  return (
    <>
      {/* <primitive object={data1.scene} position={[2, 3, 3]}></primitive> */}
      {/* <primitive object={scene} position={[1, 2, 3]}>
        <meshPhysicalMaterial color={"red"} />
      </primitive> */}

      <group ref={groupRef}>
        {geometryArray.map((item, index) => {
          return (
            <mesh scale={[2, 2, 2]} key={item.id} geometry={item} position={[index * 4, 0, 0]} name={`index_${index}`}>
              <MeshTransmissionMaterial color={`#${parseInt((Math.random() * 1e6).toString())}`} {...config} />
            </mesh>
          );
        })}
      </group>
      <OrbitControls />
    </>
  );
};

useGLTF.preload("/models/1.glb");

export default BoxContainer;
