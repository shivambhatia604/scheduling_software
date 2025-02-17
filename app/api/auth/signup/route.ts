import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";
import signupSchema from "@/app/api/utils/validations/signupSchema";
import checkIfUserExists from "./checkIfUserExists";
import { NextResponse, type NextRequest } from "next/server";
import { generateVerificationToken } from "../../utils/tokens";
import { sendVerificationEmail } from "../../utils/mails/mail";
import { createSession } from "@/lib/server-helpers/session";
export async function POST(request: NextRequest) {
  try {
    const signupData = await request.json();

    const validatedData = signupSchema.safeParse(signupData);

    if (!validatedData.success) {
      console.log("signupdata validation error", validatedData.error.flatten());
      return NextResponse.json(
        {
          errors: validatedData.error.flatten().fieldErrors,
          message: "Please enter correct input format",
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validatedData.data;

    const existingUser = await checkIfUserExists(email);

    if (existingUser) {
      // TODO: redirect user to signIn
      // console.log("url is ", request.nextUrl)
      // const redirectUrl = new URL('/', request.url)
      // console.log(redirectUrl)
      // return NextResponse.redirect(redirectUrl)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });

    const { id } = newUser;
    const verificationToken = await generateVerificationToken(newUser.id);
    const info = await sendVerificationEmail(newUser.email, verificationToken);
    console.log("email \n", info);
    const response = NextResponse.json(
      {
        success:
          "signup successfull. Please check your email to verify your account",
      },
      { status: 200 }
    );
await createSession({userId: id})
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errors: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
