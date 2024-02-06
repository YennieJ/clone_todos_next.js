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
export async function fetchTodos(uid) {
  const userTodoRef = collection(db, `users/${uid}/routine`);

  // 'selected_at' 필드를 기준으로 내림차순 정렬
  const descQuery = query(userTodoRef, orderBy("selected_at"));

  const querySnapshot = await getDocs(descQuery);

  if (querySnapshot.empty) {
    return [];
  }

  const fetchedTodos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return fetchedTodos;
}

// 할일 추가
export async function addATodo({ uid, title, memo, selected_at }) {
  const userTodoRef = doc(collection(db, `users/${uid}/routine`));

  const newTodoData = {
    id: userTodoRef.id,
    title,
    memo,
    is_done: false,
    selected_at,
  };

  // 생성된 문서 참조에 새로운 Todo 데이터를 저장합니다.
  await setDoc(userTodoRef, newTodoData);

  return newTodoData;
}

// 단일 할일 조회
export async function fetchATodo(id, uid) {
  if (!id) return null;

  const todoDocRef = doc(db, `users/${uid}/routine`, id);
  const todoDocSnap = await getDoc(todoDocRef);

  if (!todoDocSnap.exists()) {
    console.log("No such document!");
    return null;
  }

  return {
    id: todoDocSnap.id,
    ...todoDocSnap.data(),
  };
}

// 단일 할일 삭제
export async function deleteATodo(id, uid) {
  const fetchedTodo = await fetchATodo(id, uid);

  if (fetchedTodo === null) {
    return null;
  }
  await deleteDoc(doc(db, `users/${uid}/routine`, id));
  return fetchedTodo;
}

// 단일 할일 수정
export async function editATodo(
  id,
  uid,
  { title, memo, is_done, selected_at }
) {
  const fetchedTodo = await fetchATodo(id, uid);

  if (fetchedTodo === null) {
    return null;
  }

  const todoDocRef = doc(db, `users/${uid}/routine`, id);

  await updateDoc(todoDocRef, {
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
