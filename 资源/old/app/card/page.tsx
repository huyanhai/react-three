"use client";

import Common from "@/components/commpn/Common";
import BoxContainer from "./Box";
import OverlayContainer from "./Overlay";
import "./style.css"

const CardPage = () => {
  return (
    <div className="w-screen h-screen">
      <OverlayContainer />
      <Common>
        <BoxContainer />
      </Common>
    </div>
  );
};

export default CardPage;
