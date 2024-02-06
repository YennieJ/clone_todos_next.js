import { Key, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = {
  id: string;
  title: string;
  memo?: string;
  is_done: boolean;
  selected_at: string;
};

export type CustomModalType =
  | "detailModal"
  | "editModal"
  | "deleteModal"
  | "addModal"
  | Key;

export type FocusedTodoType = {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
};
