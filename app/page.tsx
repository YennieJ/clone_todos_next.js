"use client";

import { Key, useEffect, useState } from "react";
import axiosInstance from "@/data/axiosInstance";
import { CustomModalType, FocusedRoutineType, Routine } from "@/types";

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
  Button,
} from "@nextui-org/react";
import { DeleteIcon, EyeIcon, EditIcon, PlusIcon } from "@/components/icons";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomModal from "@/components/modal/custom-modal";
import Header from "@/components/header/header";

import { title } from "@/components/primitives";
import { formatTime } from "@/app/utils/fomat-time";
import { isDoneUI } from "@/app/utils/styleUtils";

export default function Home() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [currentModalData, setCurrentModalData] = useState<FocusedRoutineType>({
    focusedRoutine: null,
    modalType: "detail",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // modalHandler
  const modalHandler = (
    routine: Routine | null,
    key: CustomModalType | Key
  ) => {
    onOpen();
    setCurrentModalData({
      focusedRoutine: routine,
      modalType: key,
    });
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await axiosInstance.get("/api/routine");
      setRoutines(response.data.data);
    } catch (error) {
      console.error("Failed to fetch routines", error);
    }
  };

  const checkRoutineHandler = async (
    checkedRoutine: Routine,
    checkIsDone: boolean
  ) => {
    const response = await axiosInstance.patch(
      `/api/routine/${checkedRoutine.id}`,
      checkedRoutine
    );

    if (response.status === 200) {
      setRoutines((prevRoutines) =>
        prevRoutines.map((routine) =>
          routine.id === checkedRoutine.id
            ? { ...routine, is_done: checkIsDone }
            : routine
        )
      );
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 mb-8">
      {/* <div className="inline-block max-w-lg text-center justify-center"> */}
      <div className="flex flex-col text-center sm:w-96">
        <h1 className={`${title()} mb-10`}>My Routine</h1>
        <Header />
        <div>
          <div className="text-right mb-2">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => modalHandler(null, "addModal")}
            >
              <PlusIcon />
            </Button>
          </div>
          {/* 할일 목록을 표시하는 테이블 */}
          <Table aria-label="routine Table" className="">
            <TableHeader>
              <TableColumn>완료</TableColumn>
              <TableColumn>생성일</TableColumn>
              <TableColumn>할일 내용</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="새로운 루틴을 추가하세요.">
              {routines!.map((routine) => (
                <TableRow
                  key={routine.id}
                  className={isDoneUI(routine.is_done!)}
                >
                  <TableCell>
                    <Checkbox
                      color="warning"
                      isSelected={routine.is_done}
                      onValueChange={(checkIsDone) => {
                        checkRoutineHandler(routine, checkIsDone);
                      }}
                    />
                  </TableCell>
                  <TableCell>{formatTime(routine.selected_at)}</TableCell>
                  <TableCell>{routine.title}</TableCell>
                  <TableCell>
                    <div className="relative flex justify-end items-center gap-2">
                      <Tooltip content="Details">
                        <span
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          onClick={() => {
                            modalHandler(routine, "detailModal");
                          }}
                        >
                          <EyeIcon />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit Routine">
                        <span
                          className="text-lg text-default-400 cursor-pointer active:opacity-50"
                          onClick={() => {
                            modalHandler(routine, "editModal");
                          }}
                        >
                          <EditIcon />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete Routine">
                        <span
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => {
                            modalHandler(routine, "deleteModal");
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
            fetchRoutines={fetchRoutines}
          />
          {/* alert 컴포넌트 */}
          <ToastContainer
            theme="dark"
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            autoClose={2000}
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
