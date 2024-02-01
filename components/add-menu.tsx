import React, { Key } from "react";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { PlusIcon } from "./icons";
import { Todo } from "@/types";
const AddMenu = ({
  ModalHandler,
}: {
  ModalHandler: (todo: Todo | null, key: Key) => void;
}) => {
  return (
    <div className="text-right">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <PlusIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="할일 옵션"
          onAction={(key) => {
            ModalHandler(null, key);
          }}
        >
          <DropdownItem key="addTodo">루팅 추가</DropdownItem>
          <DropdownItem key="createNew">루팅 추가</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AddMenu;