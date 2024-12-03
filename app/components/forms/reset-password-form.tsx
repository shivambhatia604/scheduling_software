"use client";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { Button } from "@/app/ui/button";
import { useActionState, useEffect } from "react";
import {
  resetPasswordAction,
  State,
} from "@/lib/server-helpers/actions/forms/resetPassword";
import { useRouter } from "next/navigation";
import { useNotification } from "@/ui/context/NotificationContext";
import { Input } from "@/ui/atoms/input";
import { ErrorMessage, Field, Label } from "@/ui/atoms/fieldset";
import { Button } from "@/ui/atoms/button";

export function ResetPasswordForm({ token }: { token: string }) {
  const initialState: State = { status: null, message: null, errors: {} };
  const resetPasswordActionWithToken = resetPasswordAction.bind(null, token);
  const [state, formAction] = useActionState(
    resetPasswordActionWithToken,
    initialState
  );
  // console.log("stateis", state);
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state?.status === "success" && state.message) {
      console.log(state, "wow state");
      console.log(state.message);
      showNotification(state.message); // TODO: solve ts error/ modify State type
      router.push("/");
    }

    if (state?.status === "error" && state.message) {
      showNotification(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="rounded-md p-4 md:p-6">
        {/* New Password */}
        <Field className="mb-4">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {/* <input
                id="new-password"
                name="password"
                type="text"
                placeholder="Enter New Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="new-password-error"
              /> */}
              <Input
                id="new-password"
                name="password"
                type="text"
                placeholder="Enter New Password"
                aria-describedby="new-password-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              <EyeIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="new-password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                // <p className="mt-2 text-sm text-red-500" key={error}>
                //   {error}

                // </p>
                <ErrorMessage key={error}>{error}</ErrorMessage>
              ))}
          </div>
        </Field>

        {/* comfirm passrword */}

        <Field className="mb-4">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {/* <input
                id="confirm-password"
                name="confirmPassword"
                type="text"
                placeholder="Enter New Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="confirm-password-error"
              /> */}
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="text"
                placeholder="Enter confirm Password"
                aria-describedby="confirm-password-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              <EyeSlashIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div
            id="confirm-password-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.confirmPassword &&
              state.errors?.confirmPassword.map((error: string) => (
                // <p className="mt-2 text-sm text-red-500" key={error}>
                //   {error}
                // </p>
                <ErrorMessage key={error}>{error}</ErrorMessage>
              ))}
          </div>
        </Field>
        {/* <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.errors && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/" className="content-center">
          Cancel
        </Link>
        <Button type="submit" className="h-10">
          Reset Password
        </Button>
      </div>
    </form>
  );
}

// TODO: improve form styling
