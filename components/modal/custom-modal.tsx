import { Modal, ModalContent } from "@nextui-org/react";

import { FocusedRoutineType } from "@/types";
import DetailRoutine from "./detail-routine";
import AddRoutineForm from "./add-routine-form";
import EditRoutineForm from "./edit-routine-form";
import DeleteRoutineForm from "./delete-routine-form";

const CustomModal = ({
  currentModalData,
  isOpen,
  onOpenChange,
  fetchRoutines,
}: {
  currentModalData: FocusedRoutineType;
  isOpen: boolean;
  onOpenChange: () => void;
  fetchRoutines: () => Promise<void>;
}) => {
  const getModalContent = (
    modalData: FocusedRoutineType,
    onClose: () => void
  ) => {
    switch (modalData.modalType) {
      case "detailModal":
        return (
          <DetailRoutine
            focusedRoutine={modalData.focusedRoutine!}
            onClose={onClose}
          />
        );
      case "editModal":
        return (
          <EditRoutineForm
            focusedRoutine={modalData.focusedRoutine!}
            onClose={onClose}
            fetchRoutines={fetchRoutines}
          />
        );
      case "deleteModal":
        return (
          <DeleteRoutineForm
            focusedRoutine={modalData.focusedRoutine!}
            onClose={onClose}
            fetchRoutines={fetchRoutines}
          />
        );
      case "addModal":
        return (
          <AddRoutineForm onClose={onClose} fetchRoutines={fetchRoutines} />
        );
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
