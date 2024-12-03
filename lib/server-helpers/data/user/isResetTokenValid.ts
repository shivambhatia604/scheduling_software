import prisma from "@/prisma/prismaClient";


type IsResetTokenValidOptions = {
  token: string;
};

export const isResetTokenValid = async ({ token }: IsResetTokenValidOptions) => {
  const foundToken = await prisma.user.findFirst({
    select: {
      id: true,
    },
    where: {
      resetToken:token,
      resetTokenExp:{
        gt: new Date(),
      }
    },
  });
console.log("found TOKEN IS", foundToken);
  return !!foundToken;
};