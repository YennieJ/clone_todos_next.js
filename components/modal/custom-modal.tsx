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
}: {
  currentModalData: FocusedTodoType;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const getModalContent = (modalData: FocusedTodoType, onClose: () => void) => {
    switch (modalData.modalType) {
      case "detail":
        return (
          <DetailRoutine
            focusedTodo={modalData.focusedTodo!}
            onClose={onClose}
          />
        );
      case "edit":
        return (
          <EditRoutineForm
            focusedTodo={modalData.focusedTodo!}
            onClose={onClose}
          />
        );
      case "delete":
        return (
          <DeleteRoutineForm
            focusedTodo={modalData.focusedTodo!}
            onClose={onClose}
          />
        );
      case "addTodo":
        return <AddRoutineForm onClose={onClose} />;
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
