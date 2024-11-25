import Link from "next/link";
import { redirect } from "next/navigation";

import { isResetTokenValid } from "@/lib/server-helpers/isResetTokenValid";

import { ResetPasswordForm } from "@/app/components/forms/reset-password-form";

type ResetPasswordPageProps = {
  params: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params;
  const isValid = await isResetTokenValid({ token });

  if (!isValid) {
    // redirect("/reset-password");
    redirect("/signup");
  }

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-4xl font-semibold text-indigo-600">
          Reset Password
        </h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Please choose your new password
        </p>

        <ResetPasswordForm token={token} />
        {/* <ResetPasswordForm token={token} className="mt-4" /> */}

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary duration-200 hover:opacity-70"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
