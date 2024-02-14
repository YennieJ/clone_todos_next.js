import { NextRequest, NextResponse } from "next/server";
import { getAuth, customInitApp } from "@/firebase/server";
import { setHeader, fetchHeader, deleteHeader } from "@/data/header";

// 머릿말 추가
export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const { startTime, description } = await request.json();

  const addedHeader = await setHeader(uid, { startTime, description });

  const response = {
    message: "success add header",
    data: addedHeader,
  };

  return NextResponse.json(response, { status: 201 });
}

// 머릿말 가져오기
export async function GET(request: NextRequest) {
  customInitApp();

  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const fetchedHeader = await fetchHeader(uid);

  if (fetchedHeader === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "get header",
    data: fetchedHeader,
  };
  return NextResponse.json(response, { status: 200 });
}

// 머릿말 수정
export async function PATCH(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const { startTime, description } = await request.json();

  const editedHeader = await setHeader(uid, {
    startTime,
    description,
  });

  if (editedHeader === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "edit header",
    data: editedHeader,
  };
  return NextResponse.json(response, { status: 200 });
}

// 머릿말 삭제
export async function DELETE(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const deletedHeader = await deleteHeader(uid);

  if (deletedHeader === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "delete header",
    data: deletedHeader,
  };
  return NextResponse.json(response, { status: 200 });
}
