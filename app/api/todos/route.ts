import { NextRequest, NextResponse } from "next/server";
import { fetchTodos, addATodo } from "@/data/firestore";

// 할일 목록 가져오기
export async function GET(request: NextRequest) {
  const fechedTodos = await fetchTodos();
  const response = {
    message: "get all todos",
    data: fechedTodos,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 추가
export async function POST(request: NextRequest) {
  const { title, memo, selected_at } = await request.json();

  if (title === undefined) {
    const errMsg = {
      message: "할일을 작성해주세요.",
    };
    return NextResponse.json(errMsg, { status: 422 });
  }

  const addedTodo = await addATodo({ title, memo, selected_at });

  const response = {
    message: "success add todo",
    data: addedTodo,
  };

  return NextResponse.json(response, { status: 201 });
}
