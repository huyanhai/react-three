import React from "react";

import type { Content } from "./types";
import Loading from "./loading";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/base16/darcula.css";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      console.log("code", code, lang);

      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const Message = (props: Content) => {
  const { rule, content, loading } = props;

  return (
    <div className={`mb-4 flex flex-col ${rule === "user" ? "items-end" : "items-start"}`}>
      <div className={`text-sm text-gray-700 inline-block ${rule === "user" && "max-w-xs"}`}>
        <div className={`${rule === "user" && "text-right"}`}>{rule}</div>
        <div className={`p-2 bg-black/5 rounded-lg mt-2 ${rule === "user" && "bg-blue-500 text-white"}`}>
          {loading ? <Loading /> : <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }}></div>}
        </div>
      </div>
    </div>
  );
};

export default Message;
