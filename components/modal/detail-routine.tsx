import React from "react";

import { Todo } from "@/types";

import { Button, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const DetailRoutine = ({
  focusedTodo,
  onClose,
}: {
  focusedTodo: Todo;
  onClose: () => void;
}) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">할일 상세</ModalHeader>
      <ModalBody>
        <p>
          <span className="font-bold">id : </span>
          {focusedTodo.id}
        </p>
        <p>
          <span className="font-bold">할일 내용 : </span>
          {focusedTodo.title}
        </p>

        <p>
          <span className="font-bold">완료 여부 : </span>
          {`${focusedTodo.is_done ? "완료" : "미완료"}`}
        </p>

        <p>
          <span className="font-bold">작성일 : </span>
          {focusedTodo.created_at}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="default" onPress={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </>
  );
};

export default DetailRoutine;
