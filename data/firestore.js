import { initializeApp } from "firebase/app";
import {
  getFirestore,
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export async function signUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
  }
}

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    console.log("로그아웃");
  } catch (e) {
    console.log(e);
  }
}

// 모든 할일 가져오기
export async function fetchTodos() {
  const todosRef = collection(db, "todos");
  const descQuery = query(todosRef, orderBy("selected_at"));

  const querySnapshot = await getDocs(descQuery);

  if (querySnapshot.empty) {
    return [];
  }

  const fetchedTodos = [];

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());

    const aTodo = {
      id: doc.id,
      title: doc.data()["title"],
      memo: doc.data()["memo"],
      is_done: doc.data()["is_done"],
      selected_at: doc.data()["selected_at"],
    };

    fetchedTodos.push(aTodo);
  });

  return fetchedTodos;
}

// 할일 추가
export async function addATodo({ title, memo, selected_at }) {
  const newTodoRef = doc(collection(db, "todos"));

  const newTodoData = {
    id: newTodoRef.id,
    title,
    memo,
    is_done: false,
    selected_at: selected_at,
  };

  await setDoc(newTodoRef, newTodoData);

  return {
    id: newTodoRef.id,
    title,
    memo,
    is_done: false,
    selected_at: selected_at,
  };
}

// 단일 할일 조회
export async function fetchATodo(id) {
  if (id === null) {
    return null;
  }
  const todoDocRef = doc(db, "todos", id);
  const todoDocSnap = await getDoc(todoDocRef);

  if (todoDocSnap.exists()) {
    console.log("Document data:", todoDocSnap.data());

    const fetchedTodo = {
      id: todoDocSnap.id,
      title: todoDocSnap.data()["title"],
      memo: todoDocSnap.data()["memo"],
      is_done: todoDocSnap.data()["is_done"],
      selected_at: todoDocSnap.data()["selected_at"],
    };
    return fetchedTodo;
  } else {
    console.log("No such document!");
    return null;
  }
}

// 단일 할일 삭제
export async function deleteATodo(id) {
  const fetchedTodo = await fetchATodo(id);

  if (fetchedTodo === null) {
    return null;
  }

  await deleteDoc(doc(db, "todos", id));
  return fetchedTodo;
}

// 단일 할일 수정
export async function editATodo(id, { title, memo, is_done, selected_at }) {
  const fetchedTodo = await fetchATodo(id);

  if (fetchedTodo === null) {
    return null;
  }

  const todoRef = doc(db, "todos", id);

  await updateDoc(todoRef, {
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
