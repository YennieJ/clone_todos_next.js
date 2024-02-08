"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/data/axiosInstance";
import { Modal, ModalContent } from "@nextui-org/react";

import {
  useDisclosure,
  Tooltip,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@/components/icons";

import AddHeaderForm from "./add-header-form";
import EditHeaderForm from "./edit-header-form";
import DeleteHeaderForm from "./delete-header-form";
import { FocusHeaderType, Header, HeaderModalType } from "@/types";

const Heaer = () => {
  const [header, setHeader] = useState({ startTime: "", description: "" });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentModalData, setCurrentModalData] = useState<FocusHeaderType>({
    focusedHeader: null,
    modalType: "addHeader",
  });

  useEffect(() => {
    fetchHeader();
  }, []);

  const fetchHeader = async () => {
    try {
      const response = await axiosInstance.get("/api/header");
      if (response.status === 204) {
        setHeader({ startTime: "", description: "" });
      } else {
        setHeader(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch header", error);
    }
  };

  const ModalHandler = (header: Header | null, key: HeaderModalType) => {
    onOpen();
    setCurrentModalData({
      focusedHeader: header,
      modalType: key,
    });
  };

  const getModalContent = (modalData: FocusHeaderType, onClose: () => void) => {
    switch (modalData.modalType) {
      case "addHeader":
        return <AddHeaderForm onClose={onClose} fetchHeader={fetchHeader} />;
      case "editHeader":
        return (
          <EditHeaderForm
            onClose={onClose}
            fetchHeader={fetchHeader}
            focusedHeader={modalData.focusedHeader!}
          />
        );
      case "deleteHeader":
        return <DeleteHeaderForm onClose={onClose} fetchHeader={fetchHeader} />;
      default:
        break;
    }
  };

  return (
    <div className="border">
      {header.description ? (
        <>
          <div className="relative flex justify-end items-center gap-2">
            <Tooltip content="Edit Header">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  ModalHandler(header, "editHeader");
                }}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Header">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  ModalHandler(null, "deleteHeader");
                }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
          <Input
            type="time"
            name="time"
            label="시간"
            isReadOnly
            variant="bordered"
            value={header.startTime}
          />
          <Textarea
            type="text"
            name="header"
            label="머릿말"
            isReadOnly
            variant="bordered"
            value={header.description}
          />
        </>
      ) : (
        <Button
          type="submit"
          color="warning"
          variant="flat"
          onPress={() => ModalHandler(null, "addHeader")}
        >
          머릿말 추가하기
        </Button>
      )}

      <Modal
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => getModalContent(currentModalData, onClose)}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Heaer;
