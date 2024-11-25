import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import  prisma  from '@/prisma/prismaClient';
import { resetPasswordSchema } from '@/app/api/utils/validations/auth'

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = resetPasswordSchema.parse(json);

    const user = await prisma.user.findFirst({
      where: {
        resetToken: body.token,
        resetTokenExp: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return NextResponse.json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
