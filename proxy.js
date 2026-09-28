import { NextResponse } from "next/server";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";

// Optimistic check only (JWT signature/expiry, no DB). Every protected API
// still verifies the user itself via requireAdmin().
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const payload = await verifyToken(request.cookies.get(AUTH_COOKIE)?.value);
  const isAdmin = payload?.role === "ADMIN";
  const isLogin = pathname === "/admin/login";

  if (isLogin && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!isLogin && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
