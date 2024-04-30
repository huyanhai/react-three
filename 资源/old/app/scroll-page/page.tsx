"use client";

import { Scroll, ScrollControls, Html, GizmoHelper, GizmoViewport, OrbitControls, Sky, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Line from "./line";
import Desktop from "./desktop";

const page = () => {
  return (
    <div className="w-screen h-screen bg-slate-600">
      <Canvas>
        <OrbitControls />
        <Sky />
        <Environment files={"hdr/tief_etz_4k.exr"} />
        <GizmoHelper margin={[80, 80]}>
          <GizmoViewport></GizmoViewport>
        </GizmoHelper>
        <ScrollControls pages={3}>
          {/* 不放到Scroll里面就不会随着滚动 */}
          {/* <Line /> */}
          <Desktop />
          <Scroll></Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default page;
