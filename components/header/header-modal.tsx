import { Modal, ModalContent } from "@nextui-org/react";

import AddHeaderForm from "./add-header-form";
import EditHeaderForm from "./edit-header-form";
import DeleteHeaderForm from "./delete-header-form";
import { FocusHeaderType } from "@/types";

interface HeaderModalProps {
  currentModalData: FocusHeaderType;
  isOpen: boolean;
  onOpenChange: () => void;
  fetchHeader: () => Promise<void>;
  isConsented: boolean;
  toggleConsent: () => void;
}

const HeaderModal = ({
  currentModalData,
  isOpen,
  onOpenChange,
  fetchHeader,
  isConsented,
  toggleConsent,
}: HeaderModalProps) => {
  const renderModalContent = (
    modalData: FocusHeaderType,
    onClose: () => void
  ) => {
    switch (modalData.modalType) {
      case "addHeader":
        return (
          <AddHeaderForm
            onClose={onClose}
            fetchHeader={fetchHeader}
            isConsented={isConsented}
            toggleConsent={toggleConsent}
          />
        );
      case "editHeader":
        return (
          <EditHeaderForm
            onClose={onClose}
            fetchHeader={fetchHeader}
            focusedHeader={modalData.focusedHeader!}
          />
        );
      case "deleteHeader":
        return <DeleteHeaderForm onClose={onClose} fetchHeader={fetchHeader} />;
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
        {(onClose) => renderModalContent(currentModalData, onClose)}
      </ModalContent>
    </Modal>
  );
};

export default HeaderModal;
