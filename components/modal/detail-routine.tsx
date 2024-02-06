import React from "react";

import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
} from "@nextui-org/react";

import { Todo } from "@/types";

const DetailRoutine = ({
  focusedTodo,
  onClose,
}: {
  focusedTodo: Todo;
  onClose: () => void;
}) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {`${focusedTodo.is_done ? "완료된" : "진행중인"} 할일 상세`}
      </ModalHeader>
      <ModalBody>
        <Input
          type="time"
          name="time"
          label="시간"
          isReadOnly
          variant="bordered"
          labelPlacement="outside"
          defaultValue={focusedTodo.selected_at}
        />
        <Input
          type="text"
          name="todo"
          label="할일"
          isReadOnly
          variant="bordered"
          labelPlacement="outside"
          defaultValue={focusedTodo.title}
        />
        {focusedTodo.memo && (
          <Textarea
            type="text"
            name="memo"
            label="memo"
            isReadOnly
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedTodo.memo}
          />
        )}
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
