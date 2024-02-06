import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const url = request.nextUrl.clone(); // 요청된 URL 복제

  // 로그인 상태에서 /login 또는 /signup 페이지 접근 시 홈으로 리디렉션
  if (session && (url.pathname === "/login" || url.pathname === "/signup")) {
    url.pathname = "/"; // 홈 페이지로 경로 변경
    return NextResponse.redirect(url);
  }

  // 로그인 페이지 또는 회원가입 페이지로의 접근을 제외하고, 세션이 없다면 로그인 페이지로 리디렉션
  if (!session && !["/login", "/signup"].includes(url.pathname)) {
    url.pathname = "/login"; // 로그인 페이지로 경로 변경
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
