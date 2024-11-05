import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import TruckCardComponent from "../components/TruckCardComponent";
import { Select, SelectItem } from "@nextui-org/select";
import { IoAdd } from "react-icons/io5";
import { Button } from "@nextui-org/button";
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
import { Link } from "react-router-dom";

export type TrucksPropType = {
  id: number;
  licensePlate: string;
  model: string;
  capacity: number;
  driver: string;
  status: string;
};

const trucks = [
  {
    id: 1,
    licensePlate: "ABC1234",
    model: "Ford F-150",
    capacity: 5000,
    driver: "John Doe",
    status: "Available",
  },
  {
    id: 2,
    licensePlate: "XYZ5678",
    model: "Chevrolet Silverado",
    capacity: 4500,
    driver: "Jane Smith",
    status: "On hold",
  },
  {
    id: 3,
    licensePlate: "LMN2345",
    model: "Ram 1500",
    capacity: 5200,
    driver: "Mike Johnson",
    status: "Maintainance",
  },
  {
    id: 4,
    licensePlate: "JKL8901",
    model: "GMC Sierra",
    capacity: 4800,
    driver: "Sara Davis",
    status: "Available",
  },
  {
    id: 5,
    licensePlate: "QRS2345",
    model: "Toyota Tundra",
    capacity: 5000,
    driver: "Chris Wilson",
    status: "On hold",
  },
  {
    id: 6,
    licensePlate: "TUV6789",
    model: "Nissan Titan",
    capacity: 4500,
    driver: "Emily Brown",
    status: "On hold",
  },
  {
    id: 7,
    licensePlate: "GHI3456",
    model: "Honda Ridgeline",
    capacity: 4000,
    driver: "Daniel Lee",
    status: "Maintainance",
  },
  {
    id: 8,
    licensePlate: "DEF7890",
    model: "Ford Ranger",
    capacity: 4200,
    driver: "Linda Martinez",
    status: "Available",
  },
  {
    id: 9,
    licensePlate: "OPQ1234",
    model: "Chevrolet Colorado",
    capacity: 4300,
    driver: "Matthew Taylor",
    status: "Available",
  },
  {
    id: 10,
    licensePlate: "WXY4567",
    model: "Toyota Tacoma",
    capacity: 4100,
    driver: "Sophia Anderson",
    status: "On hold",
  },
];

const truckStatus = [
  { key: "available", label: "Available" },
  { key: "onhold", label: "On Hold" },
  { key: "maintainance", label: "Maintainance" },
];

export async function loader() {
  const users = await getAllEmployeesData();

  return { users };
}

export const action: ActionFunction = async ({ request }) => {
  console.log(request.method);

  if (request.method === "POST") {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );
    console.log(data);
    return redirect("/dashboard/trucks");
  } else if (request.method === "PUT") {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );
    console.log(data);
    return redirect("/dashboard/trucks");
  }
};

const TrucksComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const { users } = useLoaderData() as LoaderDataType;

  const itemsPerPage = 6;
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch = truck.licensePlate
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

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] flex justify-between items-center">
        <h2>List of Trucks</h2>

        <div className="flex items-center gap-5">
          <Select
            items={truckStatus}
            placeholder="Select Status"
            className="w-[300px]"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {(val) => <SelectItem key={val.label}>{val.label}</SelectItem>}
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
                        name="person_in_charge"
                      >
                        {(val) => (
                          <SelectItem key={val.id}>{val.name}</SelectItem>
                        )}
                      </Select>

                      <Input type="text" label="Status" name="status" />
                      <Input
                        type="text"
                        label="Date Deployed"
                        name="date_deployed"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit" color="primary" onPress={onClose}>
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
            <TruckCardComponent key={val.id} {...val} />
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
