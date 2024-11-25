import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient';
import { forgotPasswordSchema } from '@/app/api/utils/validations/auth'
import { generatePasswordResetToken } from '@/app/api/utils/tokens';
import { sendPasswordResetEmail } from '@/app/api/utils/mails/mail';


export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = forgotPasswordSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      const resetToken = await generatePasswordResetToken(user.id);
      await sendPasswordResetEmail(user.email, resetToken);
    }

    // Always return success to prevent user enumeration
    return NextResponse.json({
      message: 'If an account exists, you will receive a password reset email',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }

}
