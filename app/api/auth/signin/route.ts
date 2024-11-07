import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prismaClient";
import { validateSignInData } from "@/lib/helpers/index";
import { signToken } from "@/lib/helpers/jwt";

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    const { email, password } = await request.json();

    const validationError = validateSignInData(email, password);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({ userId: user.id });
    // Return token as response
    //   return NextResponse.json({ token }, { status: 200 });
    // Create the response with a JSON body
    const response = NextResponse.json({
      message: "Login successful",
      body: user,
    });

    // Set cookies in the response
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1-hour expiration
      path: "/",
    });

    // Set custom headers in the response
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST"); // Prevent caching of sensitive data

    return response;
  } catch (error) {}
}
