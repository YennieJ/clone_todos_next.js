import { NextRequest, NextResponse } from "next/server";
import { fetchATodo, deleteATodo, editATodo } from "@/data/firestore";

// 할일 단일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const fetchedTodo = await fetchATodo(params.slug);

  if (fetchedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "get todo item",
    data: fetchedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 삭제 id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const deletedTodo = await deleteATodo(params.slug);

  if (deletedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "delete todo item",
    data: deletedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 수정
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, memo, is_done, selected_at } = await request.json();

  const editedTodo = await editATodo(params.slug, {
    title,
    memo,
    is_done,
    selected_at,
  });

  if (editedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "edit todo item",
    data: editedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}
