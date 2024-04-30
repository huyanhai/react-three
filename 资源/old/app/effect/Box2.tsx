"use client";
import {
  MeshTransmissionMaterial,
  Box,
  useTexture,
  Decal,
  Sphere,
  AsciiRenderer,
  MeshWobbleMaterial,
  MeshDiscardMaterial,
  Plane,
  GradientTexture,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  MeshRefractionMaterial,
  SoftShadows,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const Box2 = () => {
  const [p1] = useTexture(["/three.png"]);
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
  const texture = useLoader(RGBELoader, "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr");
  return (
    <>
      <Box>
        {/* roughness 透明度 */}
        {/* thickness 粗糙度 */}
        <MeshTransmissionMaterial distortionScale={1} temporalDistortion={0.5} color={"blue"} roughness={0.5} thickness={1} />
        {/* 渐变纹理 */}
        {/* <meshBasicMaterial>
            <GradientTexture stops={[0, 1]} colors={["red", "blue"]} type={GradientType.Linear} innerCircleRadius={1} outerCircleRadius={"auto"}></GradientTexture>
          </meshBasicMaterial> */}
      </Box>
      <Sphere position={[0, 0, 2]} args={[1, 100, 100]} dispose={null}>
        <MeshTransmissionMaterial distortionScale={1} temporalDistortion={0.5} color={"red"} roughness={0.5} thickness={0.5} />
        {/* 贴花几何体 */}
        <Decal map={p1} scale={1} position={[1, 0, 0]} rotation={[0, 0, 0]} debug={true} />
      </Sphere>
      <Box position={[2, 0, 2]}>
        {/* 让物体摆动 */}
        <MeshWobbleMaterial factor={1} speed={10} />
      </Box>

      <Plane position={[-3, 0, -3]} args={[3, 4, 10]} rotation={[0, Math.PI / 2, 0]} castShadow>
        {/* 让物体摆动 */}
        <MeshDistortMaterial speed={5} factor={1}>
          <GradientTexture stops={[0, 0.8, 1]} colors={["#e63946", "#f1faee", "#a8dadc"]} size={100} />
        </MeshDistortMaterial>
      </Plane>

      <Box position={[4, 0, 0]} castShadow>
        {/* 透明材质 */}
        {config.meshPhysicalMaterial ? <meshPhongMaterial /> : <MeshTransmissionMaterial {...config} />}
      </Box>

      <Sphere scale={0.5} position={[4, 0, 0]} args={[1, 10, 10]} castShadow>
        <MeshTransmissionMaterial distortionScale={1} temporalDistortion={0.5} color={"blue"} roughness={0.5} thickness={0.5} />
      </Sphere>

      {/* 代码特性效果 */}
      {showAsciiRenderer && <AsciiRenderer fgColor="blue" bgColor="transparent" />}
    </>
  );
};

export default Box2;
