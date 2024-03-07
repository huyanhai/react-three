import { A11y } from "@react-three/a11y";
import React from "react";

const A11yCom = (children: React.ReactNode) => {
  return (
    <>
      {/* 处理事件 */}
      <A11y
        role="button"
        description="描述"
        showAltText
        actionCall={() => {
          console.log("focusCall");
        }}
      >
        {children}
      </A11y>
    </>
  );
};

export default A11y;
