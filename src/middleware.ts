import { NextRequest, NextResponse } from "next/server";

// Middleware Next.js : rewrite la racine vers le splash HTML.
// Plus robuste que next.config.mjs rewrites pour le path "/" qui entre en conflit avec Next.js routing.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/preview/splash.html", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Ne match que la racine pour ne pas interférer avec /organisations, /citoyens, /about, etc.
  matcher: ["/"],
};
