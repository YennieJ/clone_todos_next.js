import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Input,
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRoutineForm = ({ onClose }: { onClose: () => void }) => {
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [aTodoValue, setATodoValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  // time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getCurrentTime());
  const router = useRouter();

  const notifySuccessEvent = (meg: string) => toast.success(meg);

  // input에 포커스 체크
  useEffect(() => {
    checkFocus();
  }, [aTodoValue]);

  const checkFocus = () => {
    if (inputRef.current) {
      const isFocused = document.activeElement === inputRef.current;

      if (isFocused && !aTodoValue) {
        setError("할일을 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  // 할일 추가 함수
  const addATodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddLoading(true);

    e.currentTarget.reset();
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`,
        {
          method: "post",
          body: JSON.stringify({ title: aTodoValue }),
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("할일 추가에 실패했습니다.");
      }
      setIsAddLoading(false);
      router.refresh();
      onClose();
      // alert 모달창
      notifySuccessEvent("할일이 추가 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
      <form onSubmit={addATodoHandler}>
        <ModalBody>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="time"
              name="time"
              value={time}
              onValueChange={(changedInput) => {
                setTime(changedInput);
              }}
              placeholder="시간을 선택하세요"
            />

            <Input
              ref={inputRef}
              type="text"
              label="새로운 할일"
              name="todo"
              errorMessage={error}
              onValueChange={(changedInput) => {
                setATodoValue(changedInput);
              }}
              onBlur={() => checkFocus()}
              className="h-20"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            color="warning"
            variant="flat"
            isDisabled={aTodoValue.trim() === ""}
          >
            {isAddLoading ? <Spinner color="warning" /> : "추가"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddRoutineForm;
