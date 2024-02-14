import { NextRequest, NextResponse } from "next/server";
import { fetchRoutines, addARoutine } from "@/data/routine";
import { getAuth, customInitApp } from "@/firebase/server";

// 루틴 목록 가져오기
export async function GET(request: NextRequest) {
  customInitApp();

  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const fechedRoutines = await fetchRoutines(uid);

  const response = {
    message: "get all routines",
    data: fechedRoutines,
  };
  return NextResponse.json(response, { status: 200 });
}

// 루틴 추가
export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = await getAuth().verifyIdToken(token as string);
  const uid = decodedToken.uid;

  const { title, memo, selected_at } = await request.json();

  if (title === undefined) {
    const errMsg = {
      message: "루틴을 작성해주세요.",
    };
    return NextResponse.json(errMsg, { status: 422 });
  }

  const addedRoutine = await addARoutine(uid, { title, memo, selected_at });

  const response = {
    message: "success add routine",
    data: addedRoutine,
  };

  return NextResponse.json(response, { status: 201 });
}
