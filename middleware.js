import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/room031")) return NextResponse.next();
  if (pathname.startsWith("/api")) return NextResponse.next();

  const origin = request.nextUrl.origin;

  let maintenance = false;
  try {
    const res = await fetch(`${origin}/api/site-status`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      maintenance = data.maintenance === true;
    }
  } catch {
    maintenance = false;
  }

  if (pathname === "/maintenance") {
    if (!maintenance) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (maintenance) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
