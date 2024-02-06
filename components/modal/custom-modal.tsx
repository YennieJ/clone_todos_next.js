import { Modal, ModalContent } from "@nextui-org/react";

import { FocusedTodoType } from "@/types";
import DetailRoutine from "./detail-routine";
import AddRoutineForm from "./add-routine-form";
import EditRoutineForm from "./edit-routine-form";
import DeleteRoutineForm from "./delete-routine-form";

const CustomModal = ({
  currentModalData,
  isOpen,
  onOpenChange,
  fetchTodos,
}: {
  currentModalData: FocusedTodoType;
  isOpen: boolean;
  onOpenChange: () => void;
  fetchTodos: () => Promise<void>;
}) => {
  const getModalContent = (modalData: FocusedTodoType, onClose: () => void) => {
    switch (modalData.modalType) {
      case "detailModal":
        return (
          <DetailRoutine
            focusedTodo={modalData.focusedTodo!}
            onClose={onClose}
          />
        );
      case "editModal":
        return (
          <EditRoutineForm
            focusedTodo={modalData.focusedTodo!}
            onClose={onClose}
            fetchTodos={fetchTodos}
          />
        );
      case "deleteModal":
        return (
          <DeleteRoutineForm
            focusedTodo={modalData.focusedTodo!}
            onClose={onClose}
            fetchTodos={fetchTodos}
          />
        );
      case "addModal":
        return <AddRoutineForm onClose={onClose} fetchTodos={fetchTodos} />;
      default:
        break;
    }
  };

  return (
    <Modal
      placement="center"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => getModalContent(currentModalData, onClose)}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
