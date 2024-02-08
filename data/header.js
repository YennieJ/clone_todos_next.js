import { db } from "@/firebase/client";

import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

// 머릿말 추가
export async function setHeader(uid, { startTime, description }) {
  const userHeaderRef = doc(db, `users/${uid}`);

  await setDoc(userHeaderRef, { startTime, description }, { merge: true });
  return { startTime, description };
}

// 머릿말 조회
export async function fetchHeader(uid) {
  const headerDocRef = doc(db, `users/${uid}`);
  const headerDocSnap = await getDoc(headerDocRef);

  if (!headerDocSnap.exists()) {
    return null;
  }

  return {
    ...headerDocSnap.data(),
  };
}

// 머릿말 삭제
export async function deleteHeader(uid) {
  await deleteDoc(doc(db, `users/${uid}`));
  return null;
}
