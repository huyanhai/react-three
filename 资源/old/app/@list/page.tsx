import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "这是metadata",
};

// 预加载
export const preload = () => {}

const List = async () => {
  const data = await fetch("http://127.0.0.1:3000/api/about?query=123").then((res) => res.json());

  console.log("data", data);

  return (
    <>
      <Suspense fallback={"加载失败1"}>{data.data}</Suspense>
      <Suspense fallback={"加载失败2"}>正常渲染的2</Suspense>
    </>
  );
};

export default List;
