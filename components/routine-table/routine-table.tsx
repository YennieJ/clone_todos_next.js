"use client";

import React, { Key, useEffect, useState } from "react";
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
  Spinner,
  Skeleton,
} from "@nextui-org/react";
import { DeleteIcon, EyeIcon, EditIcon, PlusIcon } from "@/components/icons";

import axiosInstance from "@/data/axiosInstance";
import { Routine, FocusedRoutineType, CustomModalType } from "@/types";
import { formatTime } from "@/app/utils/format-time";
import { isDoneUI } from "@/app/utils/styleUtils";
import RoutineModal from "./routine-modal";

const RoutineTable = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [currentModalData, setCurrentModalData] = useState<FocusedRoutineType>({
    focusedRoutine: null,
    modalType: "detail",
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [checkedId, setCheckedId] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    setIsDataLoaded(true);
    try {
      const response = await axiosInstance.get("/api/routine");
      setRoutines(response.data.data);
    } catch (error) {
      console.error("Failed to fetch routines", error);
    } finally {
      setIsDataLoaded(false);
    }
  };

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

  const checkRoutineHandler = async (
    checkedRoutine: Routine,
    checkIsDone: boolean
  ) => {
    setCheckedId(checkedRoutine.id);

    const updateRoutine = {
      ...checkedRoutine,
      is_done: checkIsDone,
    };

    try {
      const response = await axiosInstance.patch(
        `/api/routine/${checkedRoutine.id}`,
        updateRoutine
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
    } catch (error) {
      console.error("Failed to update routine", error);
    } finally {
      setCheckedId("");
    }
  };

  return (
    <>
      {isDataLoaded ? (
        <div className="p-4 mt-10 flex flex-col justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small">
          <Skeleton className="rounded-lg ">
            <div className="h-36 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      ) : (
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
          <Table aria-label="routine Table">
            <TableHeader>
              <TableColumn>완료</TableColumn>
              <TableColumn>생성일</TableColumn>
              <TableColumn>할일 내용</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="새로운 루틴을 추가하세요.">
              {routines.map((routine) => (
                <TableRow
                  key={routine.id}
                  className={isDoneUI(routine.is_done!)}
                >
                  <TableCell>
                    {checkedId === routine.id ? (
                      <Spinner
                        size="sm"
                        color="warning"
                        className="align-top"
                      />
                    ) : (
                      <Checkbox
                        className="align-top"
                        color="warning"
                        isSelected={routine.is_done}
                        onValueChange={(checkIsDone) => {
                          checkRoutineHandler(routine, checkIsDone);
                        }}
                      />
                    )}
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
        </div>
      )}

      <RoutineModal
        currentModalData={currentModalData}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        fetchRoutines={fetchRoutines}
      />
    </>
  );
};

export default RoutineTable;
