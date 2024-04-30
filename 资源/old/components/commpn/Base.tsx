"use client";

import { Environment, GizmoHelper, GizmoViewport, Grid, PerformanceMonitor, Sky } from "@react-three/drei";

const Base = () => {
  return (
    <>
      {/* <color attach="background" args={['#f0f0f0']} /> */}
      <Environment files={"hdr/studio_small_09_4k.exr"} />
      <Sky />
      <GizmoHelper margin={[80, 80]}>
        <GizmoViewport></GizmoViewport>
      </GizmoHelper>
      <PerformanceMonitor />
      {/* <Grid followCamera={true} args={[10.5, 10.5]} infiniteGrid={true} cellColor={"black"} sectionColor={"red"} sectionSize={2} /> */}
    </>
  );
};

export default Base;
