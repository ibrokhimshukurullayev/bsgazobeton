// middleware.js
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  console.log("=== MIDDLEWARE COOKIE TOKEN ===");
  console.log(token);

  if (!token && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
