"use client";
import { useCard } from "@/store/useCard";
import React from "react";

const OverlayContainer = () => {
  const setName = useCard((state) => state.setName);

  const toggle = () => {
    setName(undefined)
    console.log("toggle");
  };
  return (
    <div className="absolute z-10 pointer-events-none text-black transition-opacity duration-1000">
        {/* pointer-events-auto - 加上这个下面的内容才能被操作 */}
      <button className="pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer" onClick={() => toggle()}>
        关闭
      </button>
    </div>
  );
};

export default OverlayContainer;
