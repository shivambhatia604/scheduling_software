import "server-only";
import prisma from "@/prisma/prismaClient";

export default async function getUser(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      isEmailVerified: true,
      name: true,
      bookings: true,
    },
  });
}
