import { NextRequest, NextResponse } from "next/server";
import dummyTodos from "@/data/dummy.json";

// 모든 할 일 가져오기
export async function GET(request: NextRequest) {
  const response = {
    message: "get all todos",
    data: dummyTodos,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 추가
export async function POST(request: NextRequest) {
  // const data=await request.json();

  const { title } = await request.json();

  const newTodo = {
    id: "10",
    title,
    is_done: false,
  };

  const response = {
    message: "success add todo",
    data: newTodo,
  };

  return NextResponse.json(response, { status: 201 });
}
