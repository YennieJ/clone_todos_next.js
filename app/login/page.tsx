"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Spinner, Checkbox } from "@nextui-org/react";

import { logIn } from "@/data/auth";
import axiosInstance from "@/data/axiosInstance";

import { title } from "@/components/primitives";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLogInLoading, setIsLogInLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isTestAccount, setIsTestAccount] = useState(false);

  const router = useRouter();

  const toggleVisibility = (): void => setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLogInLoading(true);

    try {
      const authUser = await logIn(
        isTestAccount ? "test@gmail.com" : email,
        isTestAccount ? "test123" : password
      );
      if (authUser) {
        const response = await axiosInstance.post("/api/auth", {
          email: isTestAccount ? "test@gmail.com" : email,
          password: isTestAccount ? "test123" : password,
        });
        if (response.status === 200) {
          router.push("/");
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLogInLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center space-y-8 pt-10 ">
      <h1 className={title()}>LogIn</h1>
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
          value={isTestAccount ? "test@gmail.com" : email}
          readOnly={isTestAccount}
        />
        <Input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          label="password"
          placeholder="비밀번호를 입력해주세요."
          isRequired
          autoComplete="current-password"
          errorMessage={error}
          variant="bordered"
          labelPlacement="outside"
          value={isTestAccount ? "test123" : password}
          readOnly={isTestAccount}
          onValueChange={(changedInput) => {
            setPassword(changedInput);
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
        <Checkbox isSelected={isTestAccount} onValueChange={setIsTestAccount}>
          체험하기
        </Checkbox>
        <Button
          type="submit"
          color="warning"
          variant="flat"
          fullWidth
          isDisabled={
            !isTestAccount && (email.trim() === "" || password.trim() === "")
          }
        >
          {isLogInLoading ? <Spinner color="warning" /> : "Sign In"}
        </Button>
      </form>
      <p className="mt-10 text-center text-sm text-gray-400">
        Not a member?
        <Button
          onClick={() => router.push("signup")}
          variant="light"
          className="ml-1"
        >
          Sign Up
        </Button>
      </p>
    </section>
  );
}

export default LogIn;
