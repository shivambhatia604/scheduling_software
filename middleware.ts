// middleware.js
import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
import { getToken } from "./lib/helpers/jwt";

// const auth_secret = process.env.NEXTAUTH_SECRET || "";
export async function middleware(
  req: NextRequest & { user: { userId: number } }
) {
  try {
  const user = await getToken({ req }) as  { userId: number };
  console.log(user,"user");
  if (user) {
  //   req.user = { userId: user.userId };
  // console.log(req.user,"Request user");
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", String(user.userId));
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
    const path = req.nextUrl.pathname;
    const redirectUrl = new URL("/dashboard", req.url);
    switch (path) {
      case "/signup":
        return NextResponse.redirect(redirectUrl);

      case "/":
        return NextResponse.redirect(redirectUrl);
      case "/forgotpassword":
        return NextResponse.redirect(redirectUrl);

      default:
        return response;
    }
  } else {
    return NextResponse.next();
  }

   
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
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
