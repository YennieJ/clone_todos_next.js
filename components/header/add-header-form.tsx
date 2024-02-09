import React, { useEffect, useState } from "react";

import {
  Input,
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Checkbox,
} from "@nextui-org/react";

import axiosInstance from "@/data/axiosInstance";

import { getCurrentHourMinuteSecond } from "@/app/utils/fomat-time";
import { alertSuccess, alertFail } from "@/app/utils/alert";

const AddHeaderForm = ({
  onClose,
  fetchHeader,
  isConsented,
  toggleConsent,
}: {
  onClose: () => void;
  fetchHeader: () => Promise<void>;
  isConsented: boolean;
  toggleConsent: () => void;
}) => {
  const [time, setTime] = useState<string>(getCurrentHourMinuteSecond());
  const [description, setDescription] = useState<string>("");

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

  const consent = localStorage.getItem("voiceConsent");

  console.log(consent);

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
        localStorage.setItem("voiceConsent", "true");
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
              // 입력 값에 초를 "00"으로 추가
              setTime(`${changedInput}:00`);
            }}
          />
          <Textarea
            type="text"
            name="header"
            label="description"
            placeholder="루틴을 시작하기 전 듣고싶은 말을 적어주세요."
            isRequired
            maxRows={3}
            variant="bordered"
            labelPlacement="outside"
            onValueChange={(changedInput) => {
              setDescription(changedInput);
            }}
          />
          {!consent && (
            <Checkbox
              isRequired
              isSelected={isConsented}
              onValueChange={toggleConsent}
            >
              음성 안내 동의&nbsp;
              <span className="text-sm text-gray-500 ">
                설정한 시간에 음성으로 안내됩니다.
              </span>
            </Checkbox>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            color="warning"
            variant="flat"
            isDisabled={description.trim() === "" || !isConsented}
          >
            {isAddLoading ? <Spinner color="warning" /> : "추가"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default AddHeaderForm;
