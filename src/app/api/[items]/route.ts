import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, { params }: Record<string, any>) {
  const query = request.nextUrl.searchParams.get("query");
  return NextResponse.json({ data: "测试数据", query, params });
}
