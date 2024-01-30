"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Todo } from "@/types";

import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";

const DeleteRoutineForm = ({
  focusedTodo,
  onClose,
}: {
  focusedTodo: Todo;
  onClose: () => void;
}) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const router = useRouter();

  const notifySuccessEvent = (meg: string) => toast.success(meg);

  // 할일 삭제 함수
  const deleteATodoHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    onClose: () => void
  ) => {
    e.preventDefault();

    setIsDeleteLoading(true);
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`,
        {
          method: "delete",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일 삭제에 실패했습니다.");
      }
      onClose();
      router.refresh();

      // alert 모달창
      notifySuccessEvent("할일이 삭제 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
      <form
        onSubmit={async (e) => {
          deleteATodoHandler(e, focusedTodo.id, onClose);
        }}
      >
        <ModalBody>
          <p>
            <span className="font-bold">할일 내용 : </span>
            {focusedTodo.title}
          </p>
          <p>을 삭제하시겠습니까?</p>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="default" onPress={onClose}>
            닫기
          </Button>
          <Button type="submit" color="warning" variant="flat">
            {isDeleteLoading ? <Spinner color="warning" /> : "삭제"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default DeleteRoutineForm;
