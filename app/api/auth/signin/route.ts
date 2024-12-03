import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prismaClient";
import { validateSignInData } from "@/lib/helpers/index";
import { createSession } from "@/lib/server-helpers/session";

export async function POST(request: NextRequest) {
  try {
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

    // Create the response with a JSON body
    const response = NextResponse.json({
      message: "Login successful",
      body: { email: user.email, name: user.name },
    });

    // Set cookies in the response
    await createSession({ userId: user.id });

    // Set custom headers in the response
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST"); // Prevent caching of sensitive data

    return response;
  } catch (error) {}
}
