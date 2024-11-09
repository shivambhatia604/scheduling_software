// middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const auth_secret = process.env.NEXTAUTH_SECRET || "";
export function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token missing" },
      { status: 401 }
    );
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, auth_secret);
    // request.user = decoded; // Attach decoded user information to request if needed
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/protected-route", // Add specific routes you want to protect
  ],
};
