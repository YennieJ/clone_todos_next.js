import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = {
  id: string;
  title: string;
  memo?: string;
  is_done: boolean;
  selected_at: any;
};

export type CustomModalType = "detail" | "edit" | "delete" | "addTodo";

export type FocusedTodoType = {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
};
