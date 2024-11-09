import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Button } from "@nextui-org/button";
import { SamplePropType } from "../pages/MechanicsComponent";
type PropsPropType = {
  user: SamplePropType | null;
  closeDetailsModalFunc: () => void;
  openDetailsModal: boolean;
};
const UserDetailsModal = ({
  user,
  closeDetailsModalFunc,
  openDetailsModal,
}: PropsPropType) => {
  return (
    <Modal
      size="xl"
      isOpen={openDetailsModal}
      onOpenChange={closeDetailsModalFunc}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>User Details</ModalHeader>
            <ModalBody className="grid grid-cols-2 gap-4">
              <span className="text-sm">
                <strong>NAME: </strong> {user?.name}
              </span>
              <span className="text-sm">
                <strong>AGE: </strong> {user?.age}
              </span>
              <span className="text-sm">
                <strong>ADDRESS: </strong> {user?.address}
              </span>

              <span className="text-sm">
                <strong>GENDER: </strong> {user?.gender}
              </span>
              <span className="text-sm">
                <strong>LISCENCE NUMBER: </strong> {user?.driver_license_number}
              </span>

              <span className="text-sm">
                <strong>POSITION: </strong> {user?.position}
              </span>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={closeDetailsModalFunc}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;
