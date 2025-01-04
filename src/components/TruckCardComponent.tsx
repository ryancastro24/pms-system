import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { PiWarningCircleBold } from "react-icons/pi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Link, Form, useNavigation } from "react-router-dom";
import { SamplePropType } from "../pages/MechanicsComponent";
import { DatePicker } from "@nextui-org/date-picker";
const apiUrl = import.meta.env.VITE_API_URL;
type TruckCardPropType = {
  _id: string;
  plate_number: string;
  model: string;
  status: string;
  chassis_number: any;
  vin_number: string;
  type: string;
  date_deployed: string;
  person_incharge: {
    _id: string;
    name: string;
  };
  users: SamplePropType[];
  to_maintenance?: boolean | undefined;
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
  date_deployed,
  to_maintenance,
  type,
}: TruckCardPropType) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState("");
  const [openAddMaintenanceModal, setOpenAddMaintenanceModal] = useState(false);

  const mechanicsUsers = users.filter((val) => val.position === "Mechanic");
  useEffect(() => {
    // Check if deployed_date exceeds 4 months
    if (date_deployed && _id) {
      const deployedDate = new Date(date_deployed);
      const currentDate = new Date();
      const monthsDifference =
        currentDate.getMonth() -
        deployedDate.getMonth() +
        12 * (currentDate.getFullYear() - deployedDate.getFullYear());

      if (monthsDifference >= 4) {
        const postData = async () => {
          try {
            const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

            const response = await fetch(
              `${apiUrl}/api/trucks/updateTruckMaintenance/${_id}`,
              {
                method: "PUT", // Set the request method to PUT
                headers: {
                  Authorization: `Bearer ${token}`, // Add any necessary headers
                  "Content-Type": "application/json", // Optional, depending on API requirements
                },
              }
            );

            if (!response.ok) {
              console.error(`Error: ${response.statusText}`);
            } else {
              const responseData = await response.json();
              console.log("Response data:", responseData);
            }
          } catch (error) {
            console.error("Error sending the request:", error);
          }
        };
        postData();
      }
    }
  }, [date_deployed, _id]); // Include dependencies to re-run when they change

  const handleAddMaintenance = (truck_id: string) => {
    setSelectedTruck(truck_id);
    setOpenAddMaintenanceModal(true);
  };

  return (
    <>
      <Card
        className={`w-full h-44 p-2 rounded ${
          to_maintenance ? "bg-green-500" : "bg-[#f3efea]"
        } dark:bg-[#27272A] relative`}
      >
        <CardHeader className="flex items-center gap-2">
          <strong className="dark:text-white">Plate Number:</strong>
          <span className="font-light dark:text-white">{plate_number}</span>
        </CardHeader>

        <CardBody>
          <span className="text-sm dark:text-white">
            <strong>Driver: </strong>
            {person_incharge.name}
          </span>

          <span className="text-sm dark:text-white">
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
            ) : status === "On Hold" ? (
              <PiWarningCircleBold />
            ) : (
              <FaRegCheckCircle />
            )}

            {status}
          </span>

          <Button
            className="text-md hover:bg-[#633f3a] text-white bg-[#8f5c54]"
            isIconOnly
            onPress={onOpen}
          >
            <BsFillInfoCircleFill />
          </Button>

          {to_maintenance && (
            <Button
              color="primary"
              variant="flat"
              onPress={() => handleAddMaintenance(_id)}
              className="ml-2"
            >
              Mark as Done
            </Button>
          )}
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

                      <Button color="danger" variant="flat" onPress={onClose}>
                        <Link to={`/lastmaintainance/${1}`}>Issues</Link>
                      </Button>

                      <Button color="primary" variant="flat" onPress={onClose}>
                        <Link to={`/lastmaintainance/${1}`}>
                          Last Maintenance
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

        <Modal
          size="md"
          isOpen={openAddMaintenanceModal}
          onOpenChange={() => setOpenAddMaintenanceModal(true)}
        >
          <ModalContent>
            <Form method="post" className="w-full">
              <ModalHeader>Add New Maintenance</ModalHeader>
              <input type="hidden" value={selectedTruck} name="truck_id" />
              <ModalBody className="grid grid-cols-2 gap-4 w-full">
                <Select
                  items={mechanicsUsers}
                  name="person_incharge"
                  label="Select Mechanic"
                  className="max-w-xs"
                >
                  {(user) => (
                    <SelectItem key={user._id}>{user.name}</SelectItem>
                  )}
                </Select>

                <DatePicker
                  name="scheduled_date"
                  label="Scheduled Date"
                  className="max-w-[284px]"
                />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => setOpenAddMaintenanceModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  name="intent"
                  value={"add_maintenance"}
                  isLoading={navigate.state === "submitting"}
                  type="submit"
                  color="primary"
                >
                  Add Maintenance
                </Button>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      </Card>
    </>
  );
};

export default TruckCardComponent;
