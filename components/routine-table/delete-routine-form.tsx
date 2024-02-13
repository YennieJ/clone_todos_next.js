import React, { useState, FormEvent } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Textarea,
  Input,
} from "@nextui-org/react";

import axiosInstance from "@/data/axiosInstance";
import { Routine } from "@/types";
import { alertFail, alertSuccess } from "@/app/utils/alert";

interface DeleteRoutinProps {
  focusedRoutine: Routine;
  onClose: () => void;
  fetchRoutines: () => Promise<void>;
}

const DeleteRoutineForm = ({
  focusedRoutine,
  onClose,
  fetchRoutines,
}: DeleteRoutinProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // 할일 삭제 함수
  const deleteARoutineHandler = async (
    e: FormEvent<HTMLFormElement>,
    id: string,
    onClose: () => void
  ) => {
    e.preventDefault();

    if (isDeleteLoading) {
      return;
    }

    setIsDeleteLoading(true);
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await axiosInstance.delete(`/api/routine/${id}`);
      if (response.status === 200) {
        alertSuccess("할일이 삭제 되었습니다.");
        fetchRoutines();
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
          deleteARoutineHandler(e, focusedRoutine.id, onClose);
        }}
      >
        <ModalBody>
          <Input
            type="time"
            name="time"
            label="시간"
            isReadOnly
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedRoutine.selected_at}
          />
          <Input
            type="text"
            name="routine"
            label="할일"
            isReadOnly
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedRoutine.title}
          />
          {focusedRoutine.memo && (
            <Textarea
              type="text"
              name="memo"
              label="memo"
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              defaultValue={focusedRoutine.memo}
            />
          )}
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
