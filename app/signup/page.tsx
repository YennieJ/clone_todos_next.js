"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Spinner } from "@nextui-org/react";

import { signUp } from "@/data/auth";
import axiosInstance from "@/data/axiosInstance";

import { title } from "@/components/primitives";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const toggleVisibility = (): void => setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsSignUpLoading(true);

    try {
      const authUser = await signUp(email, password);
      if (authUser) {
        const response = await axiosInstance.post("/api/auth", {
          email,
          password,
        });
        if (response.status === 200) {
          router.push("/");
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSignUpLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center space-y-8 pt-10">
      <h1 className={title()}>SignUp</h1>
      <form
        className="w-96 p-10 space-y-10 border-medium border-default-200 rounded"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          label="email"
          placeholder="you@example.com"
          autoFocus
          isRequired
          autoComplete="username"
          variant="bordered"
          labelPlacement="outside"
          onValueChange={(changedInput) => {
            setEmail(changedInput);
            changedInput && setError("");
          }}
        />
        <Input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          label="password"
          placeholder="6자리 이상의 비밀번호를 입력해주세요"
          isRequired
          autoComplete="current-password"
          variant="bordered"
          labelPlacement="outside"
          onValueChange={(changedInput) => {
            setPassword(changedInput);
            changedInput && setError("");
          }}
        />
        <Input
          type={isPasswordVisible ? "text" : "password"}
          name="confirm-password"
          label="confirm password"
          placeholder="다시 한번 비밀번호를 입력해주세요"
          isRequired
          autoComplete="confirm-password"
          errorMessage={error}
          variant="bordered"
          labelPlacement="outside"
          onValueChange={(changedInput) => {
            setConfirmPassword(changedInput);
            changedInput && setError("");
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isPasswordVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <Button
          type="submit"
          color="warning"
          variant="flat"
          fullWidth
          isDisabled={
            email.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
          }
        >
          {isSignUpLoading ? <Spinner color="warning" /> : "Sign In"}
        </Button>
      </form>
      <p className="mt-10 text-center text-sm text-gray-400">
        Already have an account?
        <Button
          onClick={() => router.push("login")}
          variant="light"
          className="ml-1"
        >
          Log In
        </Button>
      </p>
    </section>
  );
}

export default SignUp;
