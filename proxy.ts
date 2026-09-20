import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, verifySessionToken } from "@/lib/auth";

const PUBLIC_PATHS = new Set(["/", "/explore", "/login", "/api/auth/login", "/api/auth/logout"]);

/**
 * Auth gate (Next.js 16 "proxy", formerly middleware). Runs for every
 * non-static request: verifies the signed session JWT and redirects
 * unauthenticated users away from protected pages.
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets are matched out by the config below; anything still
  // containing a file extension (e.g. /earth-texture.jpg) is public.
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  const isPublicPath =
    PUBLIC_PATHS.has(pathname) || pathname.startsWith("/destinations");
  const session = await verifySessionToken(request.cookies.get(AUTH_COOKIE)?.value);
  const isAuthenticated = session !== null;

  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Exact asset exclusions instead of a blanket "." catch-all.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|icon-light-32x32.png|icon-dark-32x32.png|apple-icon.png|earth-blue-marble.jpg|placeholder.svg|placeholder-logo.svg|placeholder-logo.png|placeholder.jpg|placeholder-user.jpg).*)",
  ],
};
