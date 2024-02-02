"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/data/firestore";

function SignUp() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // 회원가입 로직 구현
    if (passwordOne === passwordTwo) {
      await signUp(email, passwordOne);
      console.log("회원가입:", email, passwordOne);
    }
  };

  return (
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
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
