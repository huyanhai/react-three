import React from "react";

const TestCom = async () => {
  const data = await fetch("http://127.0.0.1:3000/api/test", { cache: 'no-cache' }).then((res) => res.json());
  return <div>{data.data}</div>;
};

export default TestCom;
