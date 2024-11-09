"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Label, ErrorMessage } from "@/ui/atoms/fieldset";
import { Input } from "@/ui/atoms/input";
import { Switch } from "@/ui/atoms/switch";
import { Button } from "@/ui/atoms/button";
import { Text, TextLink } from "@/ui/atoms/text";
import LandingText from "./components/Landing/landingText";
import { emailRegex } from "@/lib/constants";
import Loader from "./components/loader";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/ui/context/NotificationContext";

export default function Home() {
  const [email, setEmail] = useState({ value: "", isValid: true });
  const [password, setPassword] = useState("");
  const { showNotification } = useNotification();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) => {
      return fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });
    },
    onSuccess: async (data, variables) => {
      if (data.statusText === "OK") {
        const res = await data.json();
        showNotification(data.statusText, res.message, "success");
        router.push("/dashboard");
      } else {
        const errRes = await data.json();
        showNotification(data.statusText, errRes.error, "error");
      }
    },
  });
  function validateEmail() {
    if (email.value === "") {
      return;
    }
    if (!emailRegex.test(email.value)) {
      setEmail({ ...email, isValid: false });
      return;
    }
    setEmail({ ...email, isValid: true });
  }

  const handleButtonDisable = () => {
    return (
      !email.isValid ||
      email.value === "" ||
      password === "" ||
      password.length < 6
    );
  };
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-2">
      <LandingText />
      <div className="my-auto mx-8 p-8 rounded-lg hover:shadow-[inset_0px_0px_12px_4px_rgba(79,70,229,0.3)]">
        {mutation.isPending ? (
          <Loader className="!bg-transparent !min-h-full" />
        ) : (
          <div className="mx-auto w-9/12">
            <h1 className="font-bold text-indigo-600">
              Sign in to your account
            </h1>
            <Field className="mt-8">
              <Label>Email</Label>
              <Input
                id="signIn_email"
                name="email"
                type="email"
                value={email.value}
                invalid={!email.isValid}
                onBlur={() => validateEmail()}
                onChange={(e) => {
                  setEmail({ ...email, isValid: true, value: e.target.value });
                }}
              />
              {!email.isValid && <ErrorMessage>Email is invalid</ErrorMessage>}
              <div className="mt-8">
                <Label>
                  Password{" "}
                  <span className="text-gray-500">(Minimun 6 characters)</span>
                </Label>
                <Input
                  id="signIn_password"
                  name="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap justify-between gap-2 mt-8">
                <div className="flex items-center gap-2">
                  <Switch name="allow_embedding" color="indigo" />
                  <Label>Remember Me</Label>
                </div>
                <Text>
                  <TextLink href="#" className="text-indigo-600">
                    Forgot password?
                  </TextLink>
                </Text>
              </div>
              <div className="mt-8">
                <Button
                  className="w-full before:bg-indigo-600"
                  onClick={() => {
                    mutation.mutate({ email: email.value, password });
                  }}
                  disabled={handleButtonDisable()}
                >
                  Sign In
                </Button>
              </div>
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}
