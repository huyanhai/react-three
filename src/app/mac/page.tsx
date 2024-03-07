"use client";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Mac from "./Mac";
import Common from "@/components/commpn/Common";
const page = () => {
  return (
    <div className="w-screen h-screen">
      <Common>
        <Mac />
        <OrbitControls />
      </Common>
    </div>
  );
};

export default page;
