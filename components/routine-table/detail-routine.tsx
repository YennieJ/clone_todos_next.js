import React from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
} from "@nextui-org/react";

import { Routine } from "@/types";

interface DetailRoutineProps {
  focusedRoutine: Routine;
  onClose: () => void;
}

const DetailRoutine = ({ focusedRoutine, onClose }: DetailRoutineProps) => {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {`${focusedRoutine.is_done ? "완료된" : "진행중인"} 할일 상세`}
      </ModalHeader>
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
        <Button color="default" onPress={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </>
  );
};

export default DetailRoutine;
