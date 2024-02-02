"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { logOut, signIn } from "@/data/firestore";

function SignIn() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // 회원가입 로직 구현

    await signIn(email, passwordOne);
    console.log("login:", email, passwordOne);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => logOut()}>로그아웃 </button>
    </>
  );
}

export default SignIn;
