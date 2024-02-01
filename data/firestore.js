import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
