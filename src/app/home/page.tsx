"use client";
import React, { useEffect, useRef } from "react";
import "./style.scss";
import { Canvas } from "@react-three/fiber";
import { CameraControls, OrbitControls, View } from "@react-three/drei";
import Box from "./Box";
import { useHome } from "@/store/useHome";

const renderItems = [
  { color: "blue", component: Box },
  { color: "red", component: Box },
  { color: "red", component: Box },
  { color: "red", component: Box },
  { color: "red", component: Box },
  { color: "red", component: Box },
];

const Home = () => {
  const itemsRef: any = {};

  const containerRef = useRef<any>(null);
  const cameraControls = useRef<any>();
  const { view, setView } = useHome();

  renderItems.forEach((item, index) => {
    itemsRef[`itemRef${index + 1}`] = useRef();
  });

  return (
    <div ref={containerRef} className="w-screen min-h-screen grid grid-cols-3 row-gap col-gap max-md:grid-cols-1 max-lg:grid-cols-2 p-3 box-border relative">
      {renderItems.map((_, index) => {
        return (
          <div
            className={`bg-gray-200 max-md:h-96 max-sm:h-60 flex justify-center grou transitio ${view === index + 1 ? "w-full h-full fixed inset-0 z-20" : "relative"}`}
            key={index}
            ref={itemsRef[`itemRef${index + 1}`]}
          >
            {/* <button className="absolute z-10 bottom-2 bg-slate-600 group-hover:block">info</button> */}
          </div>
        );
      })}
      <Canvas className="canvas" eventSource={containerRef}>
        {renderItems.map((item, index) => {
          return (
            <View track={itemsRef[`itemRef${index + 1}`]} key={index}>
              <item.component color={item.color} />
              <OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
            </View>
          );
        })}
      </Canvas>
    </div>
  );
};

export default Home;
