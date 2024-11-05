import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { TrucksPropType } from "../pages/TrucksComponent";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { PiWarningCircleBold } from "react-icons/pi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link, Form } from "react-router-dom";
const TruckCardComponent = ({
  licensePlate,
  model,
  driver,
  status,
}: TrucksPropType) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card className={`w-full h-44 p-2 rounded bg-[#f3efea] relative`}>
        <CardHeader className="flex items-center gap-2">
          <strong>Plate Number:</strong>
          <span className="font-light">{licensePlate}</span>
        </CardHeader>

        <CardBody>
          <span className="text-sm">
            <strong>Driver: </strong>
            {driver}
          </span>

          <span className="text-sm">
            <strong>Model: </strong>
            {model}
          </span>
        </CardBody>

        <div className="absolute bottom-3 flex justify-between items-center w-full">
          <span
            className={`px-3 py-1 rounded-full flex items-center gap-1  text-sm  ${
              status === "Maintainance"
                ? "bg-red-500 text-white"
                : status === "On hold"
                ? "bg-orange-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {status === "Maintainance" ? (
              <FiXCircle />
            ) : status === "On hold" ? (
              <PiWarningCircleBold />
            ) : (
              <FaRegCheckCircle />
            )}

            {status}
          </span>

          <Button
            className="text-md  hover:bg-[#633f3a] text-white bg-[#8f5c54]"
            isIconOnly
            onPress={onOpen}
          >
            <BsFillInfoCircleFill />
          </Button>
        </div>

        <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Truck Details
                </ModalHeader>

                <Form method="PUT">
                  <ModalBody className="grid grid-cols-2">
                    <Input
                      type="text"
                      defaultValue={licensePlate}
                      label="Plate Number"
                      name="plate_number"
                    />
                    <Input
                      name="model"
                      type="text"
                      label="Model"
                      defaultValue={model}
                    />

                    <Input
                      name="driver"
                      type="text"
                      label="Driver"
                      defaultValue={driver}
                    />
                    <Input name="status" type="text" label="Plate Number" />
                    <Input name="" type="text" label="Plate Number" />
                  </ModalBody>
                  <ModalFooter className="flex justify-between items-center">
                    <div>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Delete
                      </Button>

                      <Button color="primary" variant="flat" onPress={onClose}>
                        <Link to={`/lastmaintainance/${1}`}>
                          Last Maintainance
                        </Link>
                      </Button>

                      <Button type="submit" color="primary" onPress={onClose}>
                        Update
                      </Button>
                    </div>
                  </ModalFooter>
                </Form>
              </>
            )}
          </ModalContent>
        </Modal>
      </Card>
    </>
  );
};

export default TruckCardComponent;
