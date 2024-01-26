"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { CustomModalType, FocusedTodoType, Todo } from "@/types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerticalDotsIcon } from "./icons";

export default function TodosTable({ todos }: { todos: Todo[] }) {
  const [todoAddEnable, setTodoAddEnable] = useState<boolean>(false);
  const [aTodoValue, setATodoValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // 할일 추가 함수
  const addATodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (aTodoValue.trim() === "") {
      setError("빈칸을 입력할 수 없습니다.");
      return;
    }

    e.currentTarget.reset();
    // delay
    await new Promise((f) => setTimeout(f, 1000));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`,
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

      // alert 모달창
      toast.success("할일이 추가 되었습니다.");

      router.refresh();
    } catch (error) {
      console.error(error);
      setError("할일 추가에 실패했습니다.");
    }
  };

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

  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>();

  return (
    <>
      {/* alert 컴포넌트 */}
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      />
      {/* 할일 추가 폼 */}
      <form
        onSubmit={addATodoHandler}
        className="flex w-full flex-wrap md:flex-nowrap gap-4"
      >
        <Input
          ref={inputRef}
          type="text"
          label="새로운 할일"
          name="todo"
          errorMessage={error}
          onValueChange={(changedInput) => {
            setATodoValue(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
          onBlur={() => checkFocus()}
        />

        <Button
          className="h-auto"
          color={todoAddEnable ? "warning" : "default"}
          type="submit"
        >
          추가
        </Button>
      </form>

      {/* 할일 목록을 표시하는 테이블 */}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일 내용</TableColumn>
          <TableColumn>완료 여부</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"새로운 루틴을 추가하세요."}>
          {todos &&
            todos.map((aTodo) => (
              <TableRow key={aTodo.id}>
                <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "완료" : "아직"}</TableCell>
                <TableCell>{aTodo.created_at}</TableCell>
                <TableCell>
                  <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon className="text-default-300" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="할일 옵션"
                        onAction={(key) => {
                          onOpen();
                          setCurrentModalData({
                            focusedTodo: aTodo,
                            modalType: key as CustomModalType,
                          });
                        }}
                      >
                        <DropdownItem key="detail">View</DropdownItem>
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete">Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* 상세보기 모달 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentModalData?.modalType}
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
