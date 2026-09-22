import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSessionToken, STUDIO_COOKIE } from "@/lib/studio/session";

function withNoIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(STUDIO_COOKIE)?.value;
  const authed = await isValidSessionToken(token);
  const isLogin = pathname === "/studio";

  if (!authed && !isLogin) {
    const login = new URL("/studio", request.url);
    return withNoIndex(NextResponse.redirect(login));
  }

  if (authed && isLogin) {
    const resumes = new URL("/studio/resumes", request.url);
    return withNoIndex(NextResponse.redirect(resumes));
  }

  return withNoIndex(NextResponse.next());
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
