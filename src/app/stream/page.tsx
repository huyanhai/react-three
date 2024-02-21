import React, { Suspense } from "react";
import TestCom from "./testCom";
import Loading from "./loading";
import Ai from "./ai";

const Stream = () => {
  return (
    <div className="p-2 h-screen">
      <Ai />
    </div>
  );
};

export default Stream;
