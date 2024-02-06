import React, { useState, FormEvent } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";

import axiosInstance from "@/data/axiosInstance";

import { Todo } from "@/types";
import { alertFail, alertSuccess } from "@/app/utils/alert";

const DeleteRoutineForm = ({
  focusedTodo,
  onClose,
  fetchTodos,
}: {
  focusedTodo: Todo;
  onClose: () => void;
  fetchTodos: () => Promise<void>;
}) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // 할일 삭제 함수
  const deleteATodoHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string,
    onClose: () => void
  ) => {
    e.preventDefault();

    setIsDeleteLoading(true);
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await axiosInstance.delete(`/api/${id}`);
      if (response.status === 200) {
        alertSuccess("할일이 삭제 되었습니다.");
        fetchTodos();
      } else {
        throw new Error("할일 삭제에 실패했습니다.");
      }
    } catch (error: any) {
      error.message === "Request failed with status code 404" &&
        alertFail("할일 추가에 실패했습니다.");
    } finally {
      setIsDeleteLoading(false);
      onClose();
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
