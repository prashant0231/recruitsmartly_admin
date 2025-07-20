import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_PATH } from "./lib/config"; // e.g. "/internal"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value; // ✅ Updated
  const { pathname } = request.nextUrl;

  const isRootPath = pathname === "/";
  const isAuthRoute = pathname.startsWith(`/auth`);
  const isWorkspaceRoute = pathname.startsWith(`/workspace`);

  if (isRootPath) {
    const redirectTo = token
      ? `${BASE_PATH}/workspace/dashboard`
      : `${BASE_PATH}/auth/login`;
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (!token && isWorkspaceRoute) {
    return NextResponse.redirect(
      new URL(`${BASE_PATH}/auth/login`, request.url)
    );
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(
      new URL(`${BASE_PATH}/workspace/dashboard`, request.url)
    );
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     "/", // root
//     `${BASE_PATH}/auth/:path*`, // auth pages
//     `${BASE_PATH}/workspace/:path*`, // protected pages
//   ],
// };
export const config = {
  matcher: ["/", "/auth/:path*", "/workspace/:path*"], // ✅ static values only
};
