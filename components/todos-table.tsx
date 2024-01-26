"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
} from "@nextui-org/react";
import { Todo } from "@/types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodosTable({ todos }: { todos: Todo[] }) {
  const [todoAddEnable, setTodoAddEnable] = useState<boolean>(false);
  const [aTodoValue, setATodoValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // 할일 추가 함수
  const addATodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (aTodoValue.trim() === "") {
      setError("빈칸을 입력할 수 없습니다.");
      return;
    }

    e.currentTarget.reset();
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`,
        {
          method: "post",
          body: JSON.stringify({ title: aTodoValue }),
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일 추가에 실패했습니다.");
      }

      // alert 모달창
      toast.success("할일이 추가 되었습니다.");

      router.refresh();
    } catch (error) {
      console.error(error);
      setError("할일 추가에 실패했습니다.");
    }
  };

  // input에 포커스 체크
  useEffect(() => {
    checkFocus();
  }, [aTodoValue]);

  const checkFocus = () => {
    if (inputRef.current) {
      const isFocused = document.activeElement === inputRef.current;

      if (isFocused && !aTodoValue) {
        setError("할일을 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      {/* alert 컴포넌트 */}
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      />
      {/* 할일 추가 폼 */}
      <form
        onSubmit={addATodoHandler}
        className="flex w-full flex-wrap md:flex-nowrap gap-4"
      >
        <Input
          ref={inputRef}
          type="text"
          label="새로운 할일"
          name="todo"
          errorMessage={error}
          onValueChange={(changedInput) => {
            setATodoValue(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
          onBlur={() => checkFocus()}
        />
        <Button
          className="h-auto"
          color={todoAddEnable ? "warning" : "default"}
          type="submit"
        >
          추가
        </Button>
      </form>

      {/* 할일 목록을 표시하는 테이블 */}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일 내용</TableColumn>
          <TableColumn>완료 여부</TableColumn>
          <TableColumn>생성일</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"새로운 루틴을 추가하세요."}>
          {todos &&
            todos.map((aTodo) => (
              <TableRow key={aTodo.id}>
                <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "완료" : "아직"}</TableCell>
                <TableCell>{aTodo.created_at}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
