"use client";
import { useView } from "@/store/useView";
import React from "react";

const Overlay = () => {
  const view = useView((state) => state.view);
  const setView = useView((state) => state.setView);

  const changeView = () => {
    setView((view > 2 ? 0 : view) + 1);
  };
  return (
    <div className="absolute top-0 left-0 z-10">
      <button onClick={changeView}>切换视角{view}</button>
    </div>
  );
};

export default Overlay;
