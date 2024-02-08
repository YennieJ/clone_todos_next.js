import { db } from "@/firebase/client";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

// 모든 할일 가져오기
export async function fetchRoutines(uid) {
  const userRoutineRef = collection(db, `users/${uid}/routine`);

  // 'selected_at' 필드를 기준으로 내림차순 정렬
  const descQuery = query(userRoutineRef, orderBy("selected_at"));

  const querySnapshot = await getDocs(descQuery);

  if (querySnapshot.empty) {
    return [];
  }

  const fetchedRoutines = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return fetchedRoutines;
}

// 할일 추가
export async function addARoutine(uid, { title, memo, selected_at }) {
  const userRoutineRef = doc(collection(db, `users/${uid}/routine`));

  const newRoutineData = {
    id: userRoutineRef.id,
    title,
    memo,
    is_done: false,
    selected_at,
  };

  // 생성된 문서 참조에 새로운 Routine 데이터를 저장합니다.
  await setDoc(userRoutineRef, newRoutineData);

  return newRoutineData;
}

// 단일 할일 조회
export async function fetchARoutine(id, uid) {
  if (!id) return null;

  const routineDocRef = doc(db, `users/${uid}/routine`, id);
  const routineDocSnap = await getDoc(routineDocRef);

  if (!routineDocSnap.exists()) {
    console.log("No such document!");
    return null;
  }

  return {
    id: routineDocSnap.id,
    ...routineDocSnap.data(),
  };
}

// 단일 할일 삭제
export async function deleteARoutine(id, uid) {
  const fetchedRoutine = await fetchARoutine(id, uid);

  if (fetchedRoutine === null) {
    return null;
  }
  await deleteDoc(doc(db, `users/${uid}/routine`, id));
  return fetchedRoutine;
}

// 단일 할일 수정
export async function editARoutine(
  id,
  uid,
  { title, memo, is_done, selected_at }
) {
  const fetchedRoutine = await fetchARoutine(id, uid);

  if (fetchedRoutine === null) {
    return null;
  }

  const routineDocRef = doc(db, `users/${uid}/routine`, id);

  await updateDoc(routineDocRef, {
    title,
    memo,
    is_done,
    selected_at,
  });

  return {
    id,
    title,
    memo,
    is_done,
    selected_at,
  };
}
