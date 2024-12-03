// middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "./lib/server-helpers/session";

const protectedRoutes = ["/dashboard", "/events"];
const publicRoutesUnaccessibleWhenAuthenticated = [
  "/login",
  "/signup",
  "/",
  "forgot-password",
];
const publicRoutes = [];
export async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRouteUnaccessibleWhenAuthenticated =
      publicRoutesUnaccessibleWhenAuthenticated.includes(path);

    // Redirect to Sign-In if the user is not authenticated
    const session = await getToken();
    console.log(session, "session in middleware");
    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // Redirect to /dashboard if the user is authenticated
    if (isPublicRouteUnaccessibleWhenAuthenticated && session?.userId) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - ingest (analytics)
     * - site.webmanifest
     */
    {
      source:
        "/((?!_next/static|_next/image|ingest|favicon|site.webmanifest).*)",
    },
  ],
};
