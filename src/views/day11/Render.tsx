import React, { useEffect, useMemo, useRef } from 'react';
import { Box3, InstancedMesh, Mesh, Object3D, Raycaster, Vector3 } from 'three';

const params = {
  modelPreviewSize: 2,
  modelSize: 9,
  gridSize: 0.24,
  boxSize: 0.24,
  boxRoundness: 0.03
};

const object = new Object3D();

const Render = () => {
  const meshRef = useRef<Mesh>(new Mesh());
  const instanceRef = useRef<InstancedMesh>(null);
  const rayCaster = new Raycaster();
  let rayCasterIntersects = [];

  function isInsideMesh(pos: Vector3, mesh: Mesh) {
    rayCaster.set(pos, new Vector3(0, -1, 0));
    rayCasterIntersects = rayCaster.intersectObject(mesh, false);
    // we need odd number of intersections
    return rayCasterIntersects.length % 2 === 1;
  }

  const voxels = useMemo(() => {
    const box = new Box3().setFromObject(meshRef.current);
    const voxels = [];

    for (let i = box.min.x; i < box.max.x; i += params.gridSize) {
      for (let j = box.min.y; j < box.max.y; j += params.gridSize) {
        for (let k = box.min.z; k < box.max.z; k += params.gridSize) {
          const pos = new Vector3(i, j, k);
          if (isInsideMesh(pos, meshRef.current)) {
            voxels.push({
              position: pos
            });
          }
        }
      }
    }
    return voxels;
  }, [meshRef.current]);

  useEffect(() => {
    for (let i = 0; i < voxels.length; i++) {
      object.position.copy(voxels[i].position);
      object.updateMatrix();
      instanceRef.current?.setMatrixAt(i, object.matrix);
    }
    (instanceRef.current as InstancedMesh).instanceMatrix.needsUpdate = true;
  }, [voxels]);

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={'hotpink'} opacity={0} transparent />
      </mesh>
      <instancedMesh ref={instanceRef} />
    </group>
  );
};

export default Render;
