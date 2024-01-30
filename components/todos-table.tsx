"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Tooltip,
  Checkbox,
} from "@nextui-org/react";

import { CustomModalType, FocusedTodoType, Todo } from "@/types";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteIcon, EyeIcon, EditIcon } from "./icons";

import CustomModal from "./modal/custom-modal";

export default function TodosTable({ todos }: { todos: Todo[] }) {
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: "detail",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const isDoneUI = (isDone: boolean) =>
    isDone ? "line-through text-gray-900/50 dark:text-white/40" : "";

  // 할일 체크 함수
  const checkTodoHandler = async (aTodo: Todo, checkIsDone: boolean) => {
    isDoneUI(checkIsDone);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${aTodo.id}`,
        {
          method: "post",
          body: JSON.stringify({ title: aTodo.title, is_done: checkIsDone }),
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("할일 수정에 실패했습니다.");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  // temp 시간표시
  function formatTimeWithoutDate(dateTimeString: string) {
    const dateTime = new Date(dateTimeString);

    // 오전/오후 계산
    const period = dateTime.getHours() < 12 ? "오전" : "오후";

    // 12시간제로 변환
    const hours = dateTime.getHours() % 12 || 12;

    // 분과 초를 두 자리 숫자로 변환
    const minutes = ("0" + dateTime.getMinutes()).slice(-2);
    const seconds = ("0" + dateTime.getSeconds()).slice(-2);

    // 변환된 문자열 반환
    return `${period} ${hours}:${minutes}:${seconds}`;
  }

  const RoutineTable = () => {
    return (
      <Table hideHeader aria-label="Routine Table">
        <TableHeader>
          <TableColumn>checkBox</TableColumn>

          {/* <TableColumn>아이디</TableColumn> */}
          {/* <TableColumn>완료 여부</TableColumn> */}
          <TableColumn>생성일</TableColumn>
          <TableColumn>할일 내용</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"새로운 루틴을 추가하세요."}>
          {todos &&
            todos.map((aTodo) => (
              <TableRow key={aTodo.id} className={isDoneUI(aTodo.is_done)}>
                <TableCell>
                  <Checkbox
                    defaultSelected={aTodo.is_done}
                    onValueChange={(checkIsDone) => {
                      checkTodoHandler(aTodo, checkIsDone);
                    }}
                  />
                  {/* {isCheckLoading ? (
                    <Spinner color="warning" />
                  ) : (
                    <Checkbox
                      defaultSelected={aTodo.is_done}
                      onValueChange={(checkIsDone) => {
                        checkTodoHandler(aTodo, checkIsDone);
                      }}
                    ></Checkbox>
                  )} */}
                </TableCell>
                {/* <TableCell>{aTodo.id.slice(0, 4)}</TableCell> */}
                {/* <TableCell>{aTodo.is_done ? "완료" : "아직"}</TableCell> */}
                <TableCell>{formatTimeWithoutDate(aTodo.created_at)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>
                  <div className="relative flex justify-end items-center gap-2">
                    <Tooltip content="Details">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => {
                          onOpen();
                          setCurrentModalData({
                            focusedTodo: aTodo,
                            modalType: "detail" as CustomModalType,
                          });
                        }}
                      >
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip content="Edit Routine">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => {
                          onOpen();
                          setCurrentModalData({
                            focusedTodo: aTodo,
                            modalType: "edit" as CustomModalType,
                          });
                        }}
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete Routine">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => {
                          onOpen();
                          setCurrentModalData({
                            focusedTodo: aTodo,
                            modalType: "delete" as CustomModalType,
                          });
                        }}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <DeleteIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="할일 옵션"
          onAction={(key) => {
            onOpen();
            setCurrentModalData({
              focusedTodo: null,
              modalType: key as CustomModalType,
            });
          }}
        >
          <DropdownItem key="addTodo">루팅 추가</DropdownItem>
          <DropdownItem key="createNew">루팅 추가</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* 할일 목록을 표시하는 테이블 */}
      {RoutineTable()}
      {/* 상세보기 모달 */}
      <CustomModal
        currentModalData={currentModalData}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      {/* alert 컴포넌트 */}
      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      />
    </>
  );
}
