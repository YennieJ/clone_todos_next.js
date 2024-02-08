import React, { FormEvent, useState } from "react";

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
import { Header } from "@/types";

const EditHeaderForm = ({
  focusedHeader,
  onClose,
  fetchHeader,
}: {
  focusedHeader: Header;
  onClose: () => void;
  fetchHeader: () => Promise<void>;
}) => {
  const [editedTime, setEditedTime] = useState<string>(focusedHeader.startTime);
  const [editedDescription, setEditedDescription] = useState<string>(
    focusedHeader.description
  );

  // 업데이트 로딩
  const [isEditLoading, setIsEditLoading] = useState(false);
  const editHeaderHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedRoutine = {
      startTime: editedTime,
      description: editedDescription,
    };

    setIsEditLoading(true);

    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await axiosInstance.patch(`/api/header`, updatedRoutine);
      if (response.status === 200) {
        alertSuccess("머릿말이 수정 되었습니다.");
        fetchHeader();
      } else {
        throw new Error("머릿말 수정에 실패했습니다.");
      }
    } catch (error: any) {
      error.message === "Request failed with status code 404" &&
        alertFail("머릿말 수정에 실패했습니다.");
    } finally {
      setIsEditLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <ModalHeader className="flex flex-col gap-1">머릿말 수정</ModalHeader>
      <form onSubmit={editHeaderHandler}>
        <ModalBody>
          <Input
            type="time"
            name="time"
            label="시간"
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedHeader.startTime}
            onValueChange={(changedInput) => {
              setEditedTime(changedInput);
            }}
          />
          <Textarea
            type="text"
            name="header"
            label="header"
            placeholder="루틴을 시작하기 전 듣고싶은 말을 적어주세요."
            maxRows={3}
            variant="bordered"
            labelPlacement="outside"
            defaultValue={focusedHeader.description}
            onValueChange={(changedInput) => {
              setEditedDescription(changedInput);
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
            isDisabled={
              editedDescription.trim() === "" ||
              (focusedHeader.startTime === editedTime &&
                focusedHeader.description === editedDescription.trim())
            }
          >
            {isEditLoading ? <Spinner color="warning" /> : "수정"}
          </Button>
        </ModalFooter>
      </form>
    </div>
  );
};

export default EditHeaderForm;
