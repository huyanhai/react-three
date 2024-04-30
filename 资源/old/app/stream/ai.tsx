"use client";

import React, { useRef, useState } from "react";
import Message from "./message";
import type { Content } from "./types";

const getStreamText = async (response: Response, writing: (value: string) => void, success?: () => void) => {
  const render = response.body!.getReader();
  while (true) {
    const { value: text, done } = await render.read();

    if (done) {
      success && success();
      break;
    } else {
      writing && writing(new TextDecoder().decode(text));
    }
  }
};

const Ai = () => {
  const [value, setValue] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<Content[]>([]);
  const [info, setInfo] = useState<Content[]>(infoRef.current);

  const updateInfo = (info: Content[]) => {
    infoRef.current = info;
    setInfo(infoRef.current);
  };

  const inputChange = (e) => {
    setValue(e.target.value);
  };

  const scrollBottom = () => {
    setTimeout(() => {
      chartRef.current!.scrollTop = chartRef.current!.scrollHeight;
    }, 10);
  };

  const submit = async () => {
    if (!value) {
      return;
    }

    updateInfo([...infoRef.current, { rule: "user", content: value }, { rule: "system", content: "", loading: true }]);
    setValue("");

    scrollBottom();

    const response = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
    });
    let result = "";

    getStreamText(
      response,
      (str) => {
        result += str;
      },
      () => {
        const lastItem = infoRef.current[infoRef.current.length - 1];
        lastItem.content = result;
        lastItem.loading = false;
        updateInfo([...infoRef.current].fill(lastItem, infoRef.current.length));
        scrollBottom();
      }
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={chartRef} className="flex-1 h-1/2 overflow-y-auto overscroll-y-none">
        {info.map((item, index) => {
          return <Message {...item} key={index} />;
        })}
      </div>
      <div className="flex-0 my-4">
        <textarea className="border-gray-400 w-full h-60 border-2 border-solid rounded-md outline-none p-2 mb-2" value={value} onInput={inputChange}></textarea>
        <button onClick={submit} className="bg-blue-600 text-white p-1 text-sm w-16 h-8 block rounded-sm">
          提交
        </button>
      </div>
    </div>
  );
};

export default Ai;
