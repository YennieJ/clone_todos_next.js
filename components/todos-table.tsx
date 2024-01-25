"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Todo } from "@/types";

export default function TodosTable({ todos }: { todos: Todo[] }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>아이디</TableColumn>
        <TableColumn>할일 내용</TableColumn>
        <TableColumn>완료 여부</TableColumn>
        <TableColumn>생성일</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"새로운 루틴을 추가하세요."}>
        {todos &&
          todos.map((aTodo) => (
            <TableRow key={aTodo.id}>
              <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
              <TableCell>{aTodo.title}</TableCell>
              <TableCell>{aTodo.is_done ? "완료" : "아직"}</TableCell>
              <TableCell>{aTodo.created_at}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
