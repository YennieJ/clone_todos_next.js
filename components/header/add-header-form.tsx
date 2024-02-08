import React, { useState } from "react";

import {
  Input,
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";

import axiosInstance from "@/data/axiosInstance";

import { getCurrentTime } from "@/app/utils/fomat-time";
import { alertSuccess, alertFail } from "@/app/utils/alert";

const AddHeaderForm = ({
  onClose,
  fetchHeader,
}: {
  onClose: () => void;
  fetchHeader: () => Promise<void>;
}) => {
  const [time, setTime] = useState<string>(getCurrentTime());
  const [description, setDescription] = useState<string>("");

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

  const addHeaderHandler = async (e: any) => {
    e.preventDefault();

    setIsAddLoading(true);

    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await axiosInstance.post("/api/header", {
        startTime: time,
        description: description.trim(),
      });

      if (response.status === 201) {
        alertSuccess("머릿말이 추가 되었습니다.");
        fetchHeader();
      } else {
        throw new Error("머릿말 추가에 실패했습니다.");
      }
    } catch (error: any) {
      error.message === "Request failed with status code 404" &&
        alertFail("머릿말 추가에 실패했습니다.");
    } finally {
      setIsAddLoading(false);
      onClose();
    }
  };
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">머릿말 추가</ModalHeader>
      <form onSubmit={addHeaderHandler}>
        <ModalBody>
          <Input
            type="time"
            name="time"
            label="시간"
            variant="bordered"
            labelPlacement="outside"
            value={time}
            onValueChange={(changedInput) => {
              setTime(changedInput);
            }}
          />

          <Textarea
            type="text"
            name="header"
            label="description"
            placeholder="루틴을 시작하기 전 듣고싶은 말을 적어주세요."
            maxRows={3}
            variant="bordered"
            labelPlacement="outside"
            onValueChange={(changedInput) => {
              setDescription(changedInput);
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
            isDisabled={description.trim() === ""}
          >
            {isAddLoading ? <Spinner color="warning" /> : "추가"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddHeaderForm;
