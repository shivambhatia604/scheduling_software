"use client";
import { useState } from "react";
import { Field, Label, ErrorMessage } from "@/ui/atoms/fieldset";
import { Input } from "@/ui/atoms/input";
import { Switch } from "@/ui/atoms/switch";
import { Button } from "@/ui/atoms/button";
import { Text, TextLink } from "@/ui/atoms/text";
import LandingText from "./components/Landing/landingText";
import { emailRegex } from "@/lib/constants";

export default function Home() {
  const [email, setEmail] = useState({ value: "", isValid: true });
  const [password, setPassword] = useState("");

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
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-2">
      <LandingText />
      <div className="my-auto mx-8 p-8 rounded-lg hover:shadow-[inset_0px_0px_12px_4px_rgba(79,70,229,0.3)]">
        <div className="mx-auto w-9/12">
          <h1 className="font-bold text-indigo-600">Sign in to your account</h1>
          <Field className="mt-8">
            <Label>Email</Label>
            <Input
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
              <Label>Password</Label>
              <Input
                name="full_name"
                value={password}
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
              <Button className="w-full before:bg-indigo-600">Sign In</Button>
            </div>
          </Field>
        </div>
      </div>
    </div>
  );
}
