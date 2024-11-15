import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      const {token} = req.nextUrl.searchParams;
        console.log(req.nextUrl.searchParams)
      const user = await prisma.user.findFirst({
        where: {
          verificationToken: token,
          verificationTokenExp: {
            gt: new Date(),
          },
        },
      });
  
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid or expired verification token' },
          { status: 400 }
        );
      }
  
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
          verificationToken: null,
          verificationTokenExp: null,
        },
      });
  
      return NextResponse.json({
        message: 'Email verified successfully',
      });
    } catch (error) {
      console.error('Verification error:', error);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }
  }