import prisma from '@/prisma/prismaClient';
import crypto from 'crypto';


export async function generateVerificationToken(userId: number) {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await prisma.user.update({
    where: { id: userId },
    data: {
      verificationToken: token,
      verificationTokenExp: expires,
    },
  });

  return token;
}

export async function generatePasswordResetToken(userId: number) {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { id: userId },
    data: {
      resetToken: token,
      resetTokenExp: expires,
    },
  });

  return token;
}