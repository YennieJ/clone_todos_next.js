import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = {
    message: "idk",
    data: "???",
  };
  return NextResponse.json(response, { status: 200 });
}
