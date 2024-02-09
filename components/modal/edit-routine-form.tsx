import React, { useState, FormEvent } from "react";

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

import axiosInstance from "@/data/axiosInstance";

import { Routine } from "@/types";
import { alertFail, alertSuccess } from "@/app/utils/alert";

const EditRoutineForm = ({
  focusedRoutine,
  onClose,
  fetchRoutines,
}: {
  focusedRoutine: Routine;
  onClose: () => void;
  fetchRoutines: () => Promise<void>;
}) => {
  // 수정된 시간,할일,완료,메모 입력
  const [editedTime, setEditedTime] = useState<string>(
    focusedRoutine.selected_at
  );
  const [editedTitle, setEditedTitle] = useState<string>(focusedRoutine.title);
  const [editedIsDone, editedSetIsDone] = useState<boolean>(
    focusedRoutine.is_done
  );
  const [editedMemo, setEditedMemo] = useState<string | undefined>(
    focusedRoutine.memo
  );

  // 업데이트 로딩
  const [isEditLoading, setIsEditLoading] = useState(false);

  // 할일 수정 함수
  const editARoutineHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedRoutine = {
      id: focusedRoutine.id,
      title: editedTitle.trim(),
      memo: editedMemo?.trim(),
      is_done: editedIsDone,
      selected_at: editedTime,
    };

    if (isEditLoading) {
      return;
    }

    setIsEditLoading(true);

    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await axiosInstance.patch(
        `/api/routine/${focusedRoutine.id}`,
        updatedRoutine
      );
      if (response.status === 200) {
        alertSuccess("할일이 수정 되었습니다.");
        fetchRoutines(); // 데이터 새로고침
      } else {
        throw new Error("할일 수정에 실패했습니다.");
      }
    } catch (error: any) {
      error.message === "Request failed with status code 404" &&
        alertFail("할일 수정에 실패했습니다.");
    } finally {
      setIsEditLoading(false);
      onClose();
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
      <form onSubmit={editARoutineHandler}>
        <ModalBody>
          <Input
            type="time"
            name="time"
            label="시간"
            placeholder="시간을 선택하세요"
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedRoutine.selected_at}
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
            defaultValue={focusedRoutine.title}
            onValueChange={(changedInput) => {
              setEditedTitle(changedInput);
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
            defaultValue={focusedRoutine.memo}
            onValueChange={(changedInput) => {
              setEditedMemo(changedInput);
            }}
          />
          <Switch
            aria-label="완료 여부"
            color="warning"
            defaultSelected={focusedRoutine.is_done}
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
              (focusedRoutine.title === editedTitle.trim() &&
                focusedRoutine.is_done === editedIsDone &&
                focusedRoutine.memo === editedMemo?.trim())
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
