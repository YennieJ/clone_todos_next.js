import { auth } from "@/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// 회원가입
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    let errorMessage; // 사용자에게 보여줄 메시지
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "이미 사용중인 아이디입니다.";
        break;
      case "auth/weak-password":
        errorMessage = "6자리 이상의 비밀번호를 사용해주세요.";
        break;
      default:
        errorMessage =
          "회원가입하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.";
    }
    throw new Error(errorMessage);
  }
}

// 로그인
export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "이메일을 찾을 수 없습니다.";
        break;
      case "auth/wrong-password":
        errorMessage = "비밀번호를 확인해주세요.";
        break;
      case "auth/too-many-requests":
        errorMessage =
          "보안상의 이유로 계정이 임시로 잠겼습니다. 나중에 다시 시도해주세요.";
        break;
      default:
        errorMessage =
          "로그인하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.";
    }
    throw new Error(errorMessage);
  }
}

// 로그아웃
export async function logOut() {
  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
}
