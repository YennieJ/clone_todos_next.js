import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = {
  id: string;
  title: string;
  is_done: boolean;
  created_at?: any;
};

export type CustomModalType = "detail" | "edit" | "delete";

export type FocusedTodoType = {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
};

export type setEditTodoStateType = (
  isLoading: boolean | null,
  errorMessage: string | null
) => void;
