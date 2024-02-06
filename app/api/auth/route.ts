import { NextRequest, NextResponse } from "next/server";
import { auth, customInitApp } from "@/firebase/server";

customInitApp();

// 세션 쿠키 생성 함수
async function createSessionCookie(idToken: string, expiresIn: number) {
  try {
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });
    return sessionCookie;
  } catch (error) {
    console.error("Failed to create session cookie", error);
    throw error;
  }
}

// 세션 쿠키 검증 함수
async function verifySessionCookie(sessionCookie: any) {
  try {
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error("Failed to verify session cookie", error);
    throw error;
  }
}

// POST 요청 처리
export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const idToken = authorization.split("Bearer ")[1];
  try {
    // ID 토큰 검증
    await auth().verifyIdToken(idToken);
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5일
    const sessionCookie = await createSessionCookie(idToken, expiresIn);

    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expiresIn,
    };
    const response = NextResponse.json({ status: "success" });
    response.cookies.set("session", sessionCookie, options);
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 401 }
    );
  }
}

// GET 요청 처리
export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("session") || "";

  try {
    await verifySessionCookie(sessionCookie);
    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
}
