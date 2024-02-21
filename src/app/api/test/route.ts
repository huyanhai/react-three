import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: "sk-VOcuv9befBAbu9xHTTBK7fLTrQsmiooaS2mXIujO7YrnnpM4",
  baseURL: "https://api.chatanywhere.tech/v1",
});

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
const encoder = new TextEncoder();

async function* makeIterator() {
  yield encoder.encode("<p>One</p>");
  await sleep(200);
  yield encoder.encode("<p>Two</p>");
  await sleep(200);
  yield encoder.encode("<p>Three</p>");
}

const sleep = (time: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export async function GET(request: NextRequest, { params }: Record<string, any>) {
  await sleep();
  return NextResponse.json({ data: "xxx success" });
}

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [{ role: "system", content: message }],
  });

  const stream = OpenAIStream(response);

  return new Response(stream, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    },
  });

  // const iterator = makeIterator();
  // const stream = iteratorToStream(iterator);

  // return new Response(stream, {
  //   status: 200,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //   },
  // });
}
