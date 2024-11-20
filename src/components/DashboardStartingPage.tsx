import { useState, useMemo } from "react";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { AiOutlineFileAdd } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import {
  addMaintainance,
  updateMaintainance,
} from "../backend/maintainanceData";
import { useLoaderData, Form, ActionFunction } from "react-router-dom";
import { getAllEmployeesData } from "../backend/employeesData";
import { Pagination } from "@nextui-org/pagination";
import { redirect, useNavigation } from "react-router-dom";
import { getMaintainanceData } from "../backend/maintainanceData";
import { getAllTrucksData } from "../backend/trucksData";
import { TrucksPropType } from "../pages/TrucksComponent";
import { DatePicker } from "@nextui-org/date-picker";
import { SamplePropType } from "../pages/MechanicsComponent";

export async function loader() {
  const maintainance = await getMaintainanceData();
  const users = await getAllEmployeesData();
  const trucks = await getAllTrucksData();
  console.log(maintainance);
  return { maintainance, trucks, users };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );
  if (request.method === "POST") {
    const addData = await addMaintainance(data);
    return addData;
  }
  if (request.method === "PUT") {
    const editedData = await updateMaintainance(data);
    return editedData;
  }
  return redirect("/dashboard/mechanics");
};

export type MaintainanceType = {
  _id: string;
  checked_fluid_levels: boolean;
  changed_fluids: boolean;
  verify_tire_pressure: boolean;
  checked_tires: boolean;
  inspect_brakes: boolean;
  checked_air_filters: boolean;
  battery_load_test: boolean;
  inspect_gearbox_and_clutch: boolean;
  check_exterior_lightings: boolean;
  electrical_system_verification: boolean;
  scheduled_date: string;
  remarks: string;
  status: string;
  progress: string;
  person_incharge: {
    name: string;
    _id: string;
  };
  truck_id: {
    status: string;
    plate_number: string;
    chassis_number: string;
    _id: string;
  };
};

export type LoaderDataType = {
  maintainance: MaintainanceType[];
  users: SamplePropType[];
  trucks: TrucksPropType[];
};

const DashboardStartingPage = () => {
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMaintainance, setSelectedMaintainance] =
    useState<MaintainanceType | null>(null);
  const { maintainance, users, trucks } = useLoaderData() as LoaderDataType;

  const mechanicsUsers = users.filter((val) => val.position === "Mechanic");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(maintainance.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return maintainance
      .slice(start, end)
      .filter((val) =>
        val.truck_id.plate_number
          .toLowerCase()
          .includes(searchData.toLowerCase())
      );
  }, [page, maintainance, searchData]);

  const openEditModal = (data: MaintainanceType) => {
    setSelectedMaintainance(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedMaintainance(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModalFunc = (data: MaintainanceType) => {
    setSelectedMaintainance(data);

    setOpenDeleteModal(true);
  };

  const closeDeleteModalFunc = () => {
    setSelectedMaintainance(null);
    setOpenDeleteModal(false);
  };
  return (
    <div className="w-full h-full flex flex-col  gap-4 mt-8">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] ] flex justify-between items-center">
        <h2>Maintainance Updates</h2>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            label="Search Plate Number..."
            className="w-[300px] h-[45px]"
            radius="sm"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <Button
            isIconOnly
            className="text-xl"
            color="primary"
            onPress={onOpen}
          >
            <AiOutlineFileAdd />
          </Button>
          <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <Form method="post" className="w-full">
                <ModalHeader>Add New Maintenance</ModalHeader>
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
                  <Select
                    items={trucks}
                    name="truck_id"
                    label="Select Truck"
                    className="max-w-xs"
                  >
                    {(truck) => (
                      <SelectItem key={truck._id}>
                        {truck.plate_number}
                      </SelectItem>
                    )}
                  </Select>
                  <DatePicker
                    name="scheduled_date"
                    label="Scheduled Date"
                    className="max-w-[284px]"
                  />
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button color="danger" variant="light" onPress={onOpenChange}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={navigation.state === "submitting"}
                    type="submit"
                    color="primary"
                  >
                    Add Maintenance
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="overflow-y-auto h-[300px]">
        <Table
          isHeaderSticky
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{ wrapper: "min-h-[222px]" }}
          isStriped
          aria-label="Employee List Table"
        >
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableColumn>PERSON IN CHARGE</TableColumn>
            <TableColumn>TRUCK PLATE NUMBER</TableColumn>
            <TableColumn>SCHEDULED DATE</TableColumn>
            <TableColumn>REQUEST STATUS</TableColumn>
            <TableColumn>PROGRESS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((val) => (
              <TableRow key={val._id}>
                <TableCell>{val.person_incharge.name}</TableCell>
                <TableCell>{val.truck_id.plate_number}</TableCell>
                <TableCell>{val.scheduled_date}</TableCell>
                <TableCell>
                  <Chip
                    className="font-[900] text-white"
                    color={
                      val.status === "pending"
                        ? "warning"
                        : val.status === "rejected"
                        ? "danger"
                        : "success"
                    }
                  >
                    {val.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  {" "}
                  <Chip
                    className="font-[900] text-white"
                    color={
                      val.progress === "ongoing"
                        ? "warning"
                        : val.progress === "accepted"
                        ? "success"
                        : "danger"
                    }
                  >
                    {val.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly variant="light" className="text-2xl">
                        <CiMenuKebab />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions" variant="flat">
                      <DropdownItem
                        key="edit"
                        onPress={() => openEditModal(val)}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        color="danger"
                        className="text-danger"
                        onPress={() => openDeleteModalFunc(val)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isEditModalOpen && selectedMaintainance && (
        <Modal isOpen={isEditModalOpen} onOpenChange={closeEditModal}>
          <ModalContent>
            <ModalHeader>Edit Maintenance Data</ModalHeader>

            <Form method="PUT">
              <ModalBody>
                <Input
                  type="hidden"
                  name="id"
                  value={selectedMaintainance._id}
                />
                <Select
                  items={mechanicsUsers}
                  name="person_incharge"
                  label="Select Mechanic"
                  defaultSelectedKeys={[
                    selectedMaintainance.person_incharge._id,
                  ]}
                >
                  {(user) => (
                    <SelectItem key={user._id}>{user.name}</SelectItem>
                  )}
                </Select>

                <DatePicker name="scheduled_date" label="Scheduled Date" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeEditModal}>
                  Cancel
                </Button>
                <Button
                  isLoading={navigation.state === "submitting"}
                  type="submit"
                  color="primary"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {openDeleteModal && selectedMaintainance && (
        <Modal isOpen={openDeleteModal} onOpenChange={closeDeleteModalFunc}>
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>

            <ModalBody>
              Are you sure you want to delete this maintenance record?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={closeDeleteModalFunc}
              >
                Cancel
              </Button>
              <Form
                method="post"
                action={`/dashboard/${selectedMaintainance._id}/destroy`}
              >
                <Button
                  isLoading={navigation.state === "submitting"}
                  type="submit"
                  color="danger"
                >
                  Delete
                </Button>
              </Form>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default DashboardStartingPage;
