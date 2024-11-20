import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import TruckCardComponent from "../components/TruckCardComponent";
import { Select, SelectItem } from "@nextui-org/select";
import { IoAdd } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import {
  Form,
  ActionFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { getAllEmployeesData } from "../backend/employeesData";
import { LoaderDataType } from "./MechanicsComponent";
import { useNavigation } from "react-router-dom";
import {
  getAllTrucksData,
  addNewTruck,
  updateTruckData,
} from "../backend/trucksData";

export type TrucksPropType = {
  _id: string;
  plate_number: string;
  model: string;
  type: string;
  chassis_number: number;
  vin_number: string;
  status: string;
  person_incharge: {
    name: string;
    _id: string;
  };
  date_deployed: string;
};

export type TruckLoaderDataType = {
  trucks: TrucksPropType[];
};

const truckStatus = [
  { key: "available", label: "Available" },
  { key: "onhold", label: "On Hold" },
  { key: "maintainance", label: "Maintainance" },
];

export async function loader() {
  const users = await getAllEmployeesData();
  const trucks = await getAllTrucksData();

  return { users, trucks };
}

export const action: ActionFunction = async ({ request }) => {
  console.log(request.method);

  if (request.method === "POST") {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    const truckData = await addNewTruck(data);
    console.log(truckData);
    return redirect("/dashboard/trucks");
  } else if (request.method === "PUT") {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    const updatedData = await updateTruckData(data.id, data);
    console.log(updatedData);
    return redirect("/dashboard/trucks");
  }
};

const TrucksComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const { users } = useLoaderData() as LoaderDataType;
  const { trucks } = useLoaderData() as TruckLoaderDataType;
  console.log(trucks);

  const itemsPerPage = 6;
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch = truck.plate_number
      .toUpperCase()
      .startsWith(searchData.toUpperCase());
    const matchesStatus = selectedStatus
      ? truck.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  // Calculate the trucks for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTrucks = filteredTrucks.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(trucks.length / itemsPerPage);

  const navigate = useNavigation();

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] dark:bg-[#222121] flex justify-between items-center">
        <h2 className="dark:text-white">List of Trucks</h2>

        <div className="flex items-center gap-5">
          <Select
            items={truckStatus}
            placeholder="Select Status"
            className="w-[300px] dark:bg-[#222121] dark:hover:bg-[#222121]"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {(val) => (
              <SelectItem className="dark:text-white" key={val.label}>
                {val.label}
              </SelectItem>
            )}
          </Select>

          <Input
            type="search"
            className="w-[200px] h-[40px]"
            radius="sm"
            value={searchData}
            placeholder="Search Plate Number..."
            onChange={(e) => setSearchData(e.target.value)}
          />
          <Button
            isIconOnly
            onPress={onOpen}
            color="primary"
            className="text-2xl font-bold"
          >
            <IoAdd />
          </Button>

          <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add New Truck
                  </ModalHeader>

                  <Form method="post">
                    <ModalBody className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="Plate Number"
                        name="plate_number"
                      />
                      <Input type="text" label="VIN Number" name="vin_number" />
                      <Input
                        type="text"
                        label="Chassis Number"
                        name="chassis_number"
                      />
                      <Input type="text" label="Model" name="model" />
                      <Input type="text" label="Type" name="type" />
                      <Select
                        items={users}
                        placeholder="Person In Charge"
                        name="person_incharge"
                      >
                        {(val) => (
                          <SelectItem key={val._id}>{val.name}</SelectItem>
                        )}
                      </Select>

                      <Select
                        items={[
                          { key: "Available", label: "Available" },
                          { key: "On Hold", label: "On Hold" },
                          { key: "Maintainance", label: "Maintainance" },
                        ]}
                        placeholder="Status"
                        name="status"
                      >
                        {(val) => (
                          <SelectItem key={val.key}>{val.label}</SelectItem>
                        )}
                      </Select>

                      <DatePicker
                        label="Date Deployed"
                        className="max-w-[284px]"
                        name="date_deployed"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        isLoading={
                          navigate.state === "submitting" ? true : false
                        }
                        type="submit"
                        color="primary"
                        onPress={onClose}
                      >
                        Add Truck
                      </Button>
                    </ModalFooter>
                  </Form>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className=" h-[300px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-500 scrollbar-track-gray-300 hover:scrollbar-thumb-gray-700">
        <div className="grid grid-cols-3 gap-5">
          {currentTrucks.map((val) => (
            <TruckCardComponent users={users} key={val._id} {...val} />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            classNames={{
              cursor: "bg-[#8f5c54]",
            }}
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default TrucksComponent;
