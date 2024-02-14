import React, { FormEvent, useState } from "react";
import {
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import axiosInstance from "@/data/axiosInstance";
import { alertSuccess, alertFail } from "@/app/utils/alert";

interface DeletedHeaderFormProps {
  onClose: () => void;
  fetchHeader: () => Promise<void>;
}

const DeleteHeaderForm = ({ onClose, fetchHeader }: DeletedHeaderFormProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteHeaderHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDeleteLoading) {
      return;
    }
    setIsDeleteLoading(true);
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await axiosInstance.delete(`/api/header`);
      if (response.status === 204) {
        alertSuccess("머릿말이 삭제 되었습니다.");
        fetchHeader();
      } else {
        throw new Error("머릿말 삭제에 실패했습니다.");
      }
    } catch (error: any) {
      error.message === "Request failed with status code 404" &&
        alertFail("머릿말 추가에 실패했습니다.");
    } finally {
      setIsDeleteLoading(false);
      onClose();
    }
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">머릿말 삭제</ModalHeader>
      <form onSubmit={deleteHeaderHandler}>
        <ModalBody>머릿말을 삭제하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
          <Button type="submit" color="warning" variant="flat">
            {isDeleteLoading ? <Spinner color="warning" /> : "삭제"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export default DeleteHeaderForm;
