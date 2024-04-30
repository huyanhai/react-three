import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  viewport: "width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function Home() {
  return <main className="flex flex-col items-center justify-between p-24"></main>;
}
