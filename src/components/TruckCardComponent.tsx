import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { PiWarningCircleBold } from "react-icons/pi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Select, SelectItem } from "@nextui-org/select";
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
import { Link, Form, useNavigation } from "react-router-dom";
import { SamplePropType } from "../pages/MechanicsComponent";
import { useState } from "react";

type TruckCardPropType = {
  _id: string;
  plate_number: string;
  model: string;
  status: string;
  chassis_number: any;
  vin_number: string;
  type: string;
  person_incharge: {
    _id: string;
    name: string;
  };
  users: SamplePropType[];
};

const TruckCardComponent = ({
  _id,
  plate_number,
  model,
  status,
  person_incharge,
  users,
  chassis_number,
  vin_number,
  type,
}: TruckCardPropType) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <Card className={`w-full h-44 p-2 rounded bg-[#f3efea] relative`}>
        <CardHeader className="flex items-center gap-2">
          <strong>Plate Number:</strong>
          <span className="font-light">{plate_number}</span>
        </CardHeader>

        <CardBody>
          <span className="text-sm">
            <strong>Driver: </strong>
            {person_incharge.name}
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
                : status === "On Hold"
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
                      defaultValue={plate_number}
                      label="Plate Number"
                      name="plate_number"
                    />

                    <Input
                      type="number"
                      defaultValue={chassis_number}
                      label="Chassis Number"
                      name="chassis_number"
                    />

                    <Input
                      type="text"
                      defaultValue={vin_number}
                      label="VIN Number"
                      name="vin_number"
                    />

                    <Input
                      name="model"
                      type="text"
                      label="Model"
                      defaultValue={model}
                    />

                    <Input
                      name="type"
                      type="text"
                      label="Type"
                      defaultValue={type}
                    />
                    <Input name="id" type="hidden" defaultValue={_id} />
                    <Select
                      items={users}
                      placeholder="Person In Charge"
                      name="person_incharge"
                      defaultSelectedKeys={[person_incharge._id]}
                    >
                      {(val) => (
                        <SelectItem key={val._id}>{val.name}</SelectItem>
                      )}
                    </Select>

                    <Select
                      items={[
                        { key: "Available", label: "Available" },
                        { key: "On Hold", label: "On Hold" },
                        { key: "Maintainance", label: "Maintenance" },
                      ]}
                      placeholder="Status"
                      name="status"
                      defaultSelectedKeys={[status]} // Ensure 'status' is the key like "available", "onhold", etc.
                    >
                      {(val) => (
                        <SelectItem key={val.key} value={val.key}>
                          {val.label}
                        </SelectItem>
                      )}
                    </Select>
                  </ModalBody>
                  <ModalFooter className="flex justify-between items-center">
                    <div>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        color="danger"
                        variant="flat"
                        onClick={() => setOpenDeleteModal(true)}
                      >
                        Delete
                      </Button>

                      <Button color="primary" variant="flat" onPress={onClose}>
                        <Link to={`/lastmaintainance/${1}`}>
                          Last Maintainance
                        </Link>
                      </Button>

                      <Button
                        isLoading={
                          navigate.state === "submitting" ? true : false
                        }
                        type="submit"
                        color="primary"
                        onPress={onClose}
                      >
                        Update
                      </Button>
                    </div>
                  </ModalFooter>
                </Form>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal
          size="md"
          isOpen={openDeleteModal}
          onOpenChange={() => setOpenDeleteModal(true)}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Truck Details
                </ModalHeader>

                <Form method="post" action={`/dashboard/trucks/${_id}/destroy`}>
                  <ModalBody>
                    <h2>Are you sure to delete this data?</h2>
                  </ModalBody>

                  <ModalFooter className="flex gap-2 items-center">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => setOpenDeleteModal(false)}
                    >
                      Close
                    </Button>

                    <Button
                      isLoading={navigate.state === "submitting" ? true : false}
                      type="submit"
                      color="danger"
                      variant="flat"
                    >
                      Confirm
                    </Button>
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
