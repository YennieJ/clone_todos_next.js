"use client";

import React, { Key, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Tooltip,
  Checkbox,
} from "@nextui-org/react";
import { DeleteIcon, EyeIcon, EditIcon } from "./icons";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomModal from "./modal/custom-modal";
import AddMenu from "./add-menu";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import { formatTime } from "@/app/utils/fomat-time";
import { isDoneUI } from "@/app/utils/styleUtils";

export default function TodosTable({ todos }: { todos: Todo[] }) {
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: "detail",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const ModalHandler = (todo: Todo | null, key: CustomModalType | Key) => {
    onOpen();
    setCurrentModalData({
      focusedTodo: todo,
      modalType: key,
    });
  };

  // 할일 체크 함수
  const checkTodoHandler = async (todo: Todo, checkIsDone: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${todo.id}`,
        {
          method: "POST",
          body: JSON.stringify({ ...todo, is_done: checkIsDone }),
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("할일 수정에 실패했습니다.");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* 생성,음성 모달 */}
      <AddMenu ModalHandler={ModalHandler} />
      {/* 할일 목록을 표시하는 테이블 */}
      <Table aria-label="Routine Table">
        <TableHeader>
          <TableColumn>완료</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>할일 내용</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="새로운 루틴을 추가하세요.">
          {todos.map((todo) => (
            <TableRow key={todo.id} className={isDoneUI(todo.is_done)}>
              <TableCell>
                <Checkbox
                  color="warning"
                  isSelected={todo.is_done}
                  onValueChange={(checkIsDone) => {
                    checkTodoHandler(todo, checkIsDone);
                  }}
                />
              </TableCell>
              <TableCell>{formatTime(todo.selected_at)}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                  <Tooltip content="Details">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => {
                        ModalHandler(todo, "detail");
                      }}
                    >
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit Routine">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => {
                        ModalHandler(todo, "edit");
                      }}
                    >
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete Routine">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => {
                        ModalHandler(todo, "delete");
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

      {/* 상세,수정,삭제 모달 */}
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
