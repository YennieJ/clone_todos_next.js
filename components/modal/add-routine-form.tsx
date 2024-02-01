import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";

import { getCurrentTime } from "@/app/utils/fomat-time";
import { alertSuccess } from "@/app/utils/alert-success";

const AddRoutineForm = ({ onClose }: { onClose: () => void }) => {
  // 할일 입력
  const [time, setTime] = useState<string>(getCurrentTime());
  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  // 업데이트 로딩
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

  const router = useRouter();

  // 할일 추가 함수
  const addATodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`;

    const newTodo = {
      title,
      memo,
      selected_at: time,
    };

    setIsAddLoading(true);

    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await fetch(apiUrl, {
        method: "post",
        body: JSON.stringify(newTodo),
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("할일 추가에 실패했습니다.");
      }
      onClose();
      router.refresh();
      alertSuccess("할일이 추가 되었습니다.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddLoading(false);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">새로운 할일</ModalHeader>
      <form onSubmit={addATodoHandler}>
        <ModalBody>
          <Input
            type="time"
            name="time"
            label="시간"
            placeholder="시간을 선택하세요"
            variant="bordered"
            labelPlacement="outside"
            value={time}
            onValueChange={(changedInput) => {
              setTime(changedInput);
            }}
          />

          <Input
            type="text"
            name="new-title"
            label="새로운 할일"
            placeholder="할일을 입력해주세요."
            maxLength={30}
            autoFocus
            isRequired
            variant="bordered"
            labelPlacement="outside"
            onValueChange={(changedInput) => {
              setTitle(changedInput);
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
            onValueChange={(changedInput) => {
              setMemo(changedInput);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            color="warning"
            variant="flat"
            isDisabled={title.trim() === ""}
          >
            {isAddLoading ? <Spinner color="warning" /> : "추가"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddRoutineForm;
