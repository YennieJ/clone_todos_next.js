"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Todo } from "@/types";

import {
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  Spinner,
} from "@nextui-org/react";

const EditRoutineForm = ({
  focusedTodo,
  onClose,
}: {
  focusedTodo: Todo;
  onClose: () => void;
}) => {
  // 수정된 할일 입력
  const [editedTodoTitle, setEditedTodoTitle] = useState(focusedTodo.title);

  // 수정된 할일 여부
  const [isDone, setIsDone] = useState(focusedTodo.is_done);

  // 업데이트 로딩
  const [isEditLoading, setIsEditLoading] = useState(false);

  // 수정 input error
  const [editError, setEditError] = useState("");

  // 수정된 할일 객체
  const editedATodo = {
    id: focusedTodo.id,
    title: editedTodoTitle,
    is_done: isDone,
  };

  const router = useRouter();

  const notifySuccessEvent = (meg: string) => toast.success(meg);

  // 할일 수정 함수
  const editATodoHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    editedATodo: Todo,
    onClose: () => void
  ) => {
    e.preventDefault();

    const { id, title, is_done } = editedATodo;
    if (title.trim() === "") {
      setEditError("칸을 비울 수 없습니다.");
      return;
    }

    setIsEditLoading(true);

    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`,
        {
          method: "post",
          body: JSON.stringify({ title: title, is_done: is_done }),
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일 수정에 실패했습니다.");
      }
      onClose();
      router.refresh();

      // alert 모달창
      notifySuccessEvent("할일이 수정 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
      <form
        onSubmit={async (e) => {
          editATodoHandler(e, editedATodo, onClose);
        }}
      >
        <ModalBody>
          <p>
            <span className="font-bold">id : </span>
            {focusedTodo.id}
          </p>

          <Input
            autoFocus
            label="할일"
            placeholder="할일을 입력해주세요."
            variant="bordered"
            isRequired
            errorMessage={editError}
            defaultValue={focusedTodo.title}
            onValueChange={(editTodo) => {
              setEditedTodoTitle(editTodo);
              editTodo && setEditError("");
            }}
          />

          <div>
            <span className="font-bold">완료 여부 : </span>
            <Switch
              aria-label="완료 여부"
              color="warning"
              defaultSelected={focusedTodo.is_done}
              onValueChange={setIsDone}
            />
          </div>
          <p>
            <span className="font-bold">작성일 : </span>
            {focusedTodo.created_at}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="default" onPress={onClose}>
            닫기
          </Button>
          <Button
            type="submit"
            color="warning"
            variant="flat"
            isDisabled={
              focusedTodo.title === editedATodo.title &&
              focusedTodo.is_done === editedATodo.is_done
            }
          >
            {isEditLoading ? <Spinner color="warning" /> : "수정"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default EditRoutineForm;
