import { NextRequest, NextResponse } from "next/server";

// 할일 단일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");

  const response = {
    message: "get todo item",
    data: {
      id: params.slug,
      title: "아이템 하나",
      is_done: false,
      query,
    },
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 삭제 id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const response = {
    message: "delete todo item",
    data: {
      id: params.slug,
      title: "아이템 하나",
      is_done: false,
    },
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 수정 id
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editTodo = {
    id: params.slug,
    title,
    is_done,
  };

  const response = {
    message: "edit todo item",
    data: editTodo,
  };
  return NextResponse.json(response, { status: 200 });
}
