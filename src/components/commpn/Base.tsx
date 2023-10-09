"use client";

import { Environment, GizmoHelper, GizmoViewport, Grid, Sky } from "@react-three/drei";

const Base = () => {
  return (
    <>
      <Environment preset="city" />
      <Sky />
      <GizmoHelper margin={[80, 80]}>
        <GizmoViewport></GizmoViewport>
      </GizmoHelper>
      <Grid followCamera={true} args={[10.5, 10.5]} infiniteGrid={true} cellColor={"black"} sectionColor={"red"} sectionSize={2} />
    </>
  );
};

export default Base;
