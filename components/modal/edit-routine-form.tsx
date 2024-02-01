"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  Spinner,
  Textarea,
} from "@nextui-org/react";

import { Todo } from "@/types";
import { alertSuccess } from "@/app/utils/alert-success";

const EditRoutineForm = ({
  focusedTodo,
  onClose,
}: {
  focusedTodo: Todo;
  onClose: () => void;
}) => {
  // 수정된 시간,할일,완료,메모 입력
  const [editedTime, setEditedTime] = useState<string>(focusedTodo.selected_at);
  const [editedTitle, setEditedTitle] = useState<string>(focusedTodo.title);
  const [editedIsDone, editedSetIsDone] = useState<boolean>(
    focusedTodo.is_done
  );
  const [editedMemo, setEditedMemo] = useState<string | undefined>(
    focusedTodo.memo
  );

  // 업데이트 로딩
  const [isEditLoading, setIsEditLoading] = useState(false);

  const router = useRouter();

  // 할일 수정 함수
  const editATodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${focusedTodo.id}`;

    const updatedTodo = {
      title: editedTitle,
      memo: editedMemo,
      is_done: editedIsDone,
      selected_at: editedTime,
    };

    setIsEditLoading(true);

    // delay
    await new Promise((f) => setTimeout(f, 1000));

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(updatedTodo),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("할일 수정에 실패했습니다.");
      }
      onClose();
      router.refresh();
      alertSuccess("할일이 수정 되었습니다.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditLoading(false);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
      <form onSubmit={editATodoHandler}>
        <ModalBody>
          <Input
            type="time"
            name="time"
            label="시간"
            placeholder="시간을 선택하세요"
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedTodo.selected_at}
            onValueChange={(changedInput) => {
              setEditedTime(changedInput);
            }}
          />
          <Input
            type="text"
            name="title"
            label="할일"
            placeholder="할일을 입력해주세요."
            maxLength={30}
            autoFocus
            isRequired
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedTodo.title}
            onValueChange={(editTodo) => {
              setEditedTitle(editTodo);
            }}
          />
          <Textarea
            type="text"
            name="memo"
            label="memo"
            placeholder="자세한 내용을 적어주세요"
            maxRows={3}
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedTodo.memo}
            onValueChange={(changedInput) => {
              setEditedMemo(changedInput);
            }}
          />
          <Switch
            aria-label="완료 여부"
            color="warning"
            defaultSelected={focusedTodo.is_done}
            onValueChange={editedSetIsDone}
          >
            {editedIsDone ? "완료" : "진행중"}
          </Switch>
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
              editedTitle.trim() === "" ||
              (focusedTodo.title === editedTitle &&
                focusedTodo.is_done === editedIsDone &&
                focusedTodo.memo === editedMemo)
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
