import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/firebase/server";
import { fetchARoutine, deleteARoutine, editARoutine } from "@/data/routine";

// 할일 단일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const fetchedRoutine = await fetchARoutine(params.slug, uid);

  if (fetchedRoutine === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "get routine item",
    data: fetchedRoutine,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 삭제 id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const deletedRoutine = await deleteARoutine(params.slug, uid);

  if (deletedRoutine === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "delete routine item",
    data: deletedRoutine,
  };
  return NextResponse.json(response, { status: 200 });
}

// 할일 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const { title, memo, is_done, selected_at } = await request.json();

  const editedRoutine = await editARoutine(params.slug, uid, {
    title,
    memo,
    is_done,
    selected_at,
  });

  if (editedRoutine === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "edit routine item",
    data: editedRoutine,
  };
  return NextResponse.json(response, { status: 200 });
}
