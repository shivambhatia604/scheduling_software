"use server";

import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";
import { z } from "zod";

const resetPasswordFormSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
// TODO: improve state type .use zod errors type for errors field and modify it to remove token error
export type State = {
  status: "error" | "success" | null;
  errors?: {
    password?: string[];
    confirmPassword?: string[];
  };
  message: string | null;
};

export async function resetPasswordAction(
  token: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  // TODO: Input sanitizaiton
  try {
    const validatedFields = resetPasswordFormSchema.safeParse({
      token,
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    console.log("validatedFields", validatedFields);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log("error flatten", validatedFields.error.flatten());
      return {
        status: "error",
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Password Validation Failed. Enter Correct password format",
      };
    }

    const { password } = validatedFields.data;

    const encryptedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      select: {
        id: true,
      },
      where: {
        resetToken: token,
        resetTokenExp: {
          gt: new Date(),
        },
      },
      data: {
        password: encryptedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return {
      status: "success",
      message: "password reset successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "we encountered an error while resetting password",
    };
  }
  // TODO: instead of redirect return a json success message , show toast and redirect on client to signIn
}
// instead of success: true use status: "error" | "success"
