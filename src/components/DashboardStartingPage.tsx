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
import { GoPersonAdd } from "react-icons/go";
import { Button } from "@nextui-org/button";
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
import UserDetailsModal from "../components/UserDetailsModal";
import { useLoaderData, Form, ActionFunction } from "react-router-dom";
import {
  getAllEmployeesData,
  addEmployeeData,
  editEmployeeData,
} from "../backend/employeesData";
import { Pagination } from "@nextui-org/pagination";
import { redirect, useNavigation } from "react-router-dom";
import { getMaintainanceData } from "../backend/maintainanceData";

export async function loader() {
  const maintainance = await getMaintainanceData();
  return { maintainance };
}

export const action: ActionFunction = async ({ request }) => {
  console.log(request.method);
  console.log(request);
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );
  if (request.method === "POST") {
    const addData = await addEmployeeData(data);

    return addData;
  }
  if (request.method === "PUT") {
    const editData = await editEmployeeData(data);

    return editData;
  }
  return redirect("/dashboard/mechanics");
};

interface Position {
  posId: number;
  value: string;
}

const positions: Position[] = [
  { posId: 1, value: "Mechanic" },
  { posId: 2, value: "Driver" },
  { posId: 3, value: "Checker" },
  { posId: 4, value: "Supervisor" },
];

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
  };
  truck_id: {
    status: string;
    plate_number: string;
    chassis_number: string;
  };
};

export type TruckPropType = {};

export type LoaderDataType = {
  maintainance: MaintainanceType[];
};

const DashboardStartingPage = () => {
  const navigation = useNavigation();

  console.log(navigation.state);

  const [searchData, setSearchData] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const { maintainance } = useLoaderData() as LoaderDataType;

  console.log(maintainance);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(maintainance.length / rowsPerPage);

  // const items = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return maintainance
  //     .slice(start, end)
  //     .filter((user) =>
  //       user.person_incharge.name
  //         .toLowerCase()
  //         .includes(searchData.toLowerCase())
  //     );
  // }, [page, maintainance, searchData]);

  // const openDeteleModalFunc = (user: MaintainanceType) => {
  //   setSelectedUser(user);
  //   setOpenDeleteModal(true);
  // };

  // const closeDeteleModalFunc = () => {
  //   setSelectedUser(null);
  //   setOpenDeleteModal(false);
  // };

  // const openEditModal = (user: SamplePropType) => {
  //   setSelectedUser(user);
  //   setIsEditModalOpen(true);
  // };

  // const closeEditModal = () => {
  //   setSelectedUser(null);
  //   setIsEditModalOpen(false);
  // };

  // const openDetailsModalFunc = (user: SamplePropType) => {
  //   setUserDetails(user);
  //   setOpenDetailsModal(true);
  // };

  // const closeDetailsModalFunc = () => {
  //   setUserDetails(null);
  //   setOpenDetailsModal(false);
  // };
  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] flex justify-between items-center">
        <h2>Maintainance Updates</h2>
        <div className="flex items-center gap-2">
          <Input
            type="search"
            label="Search Name..."
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
            <GoPersonAdd />
          </Button>
          <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add New Employee
                  </ModalHeader>
                  <Form method="post" className="w-full">
                    <ModalBody className="grid grid-cols-2 gap-4 w-full">
                      <Input type="text" label="Name" name="name" required />
                      <Input
                        type="text"
                        label="Username"
                        name="username"
                        required
                      />
                      <Input type="email" label="Email" name="email" required />
                      <Input type="number" label="Age" name="age" required />
                      <Input
                        type="text"
                        label="Address"
                        name="address"
                        required
                      />

                      <Input
                        type="text"
                        label="Password"
                        name="password"
                        required
                      />

                      <Input
                        type="text"
                        label="Liscence Number"
                        name="driver_license_number"
                        required
                      />

                      <Select
                        items={positions}
                        name="position"
                        label="Select Position"
                        className="max-w-xs"
                      >
                        {(position) => (
                          <SelectItem key={position.value}>
                            {position.value}
                          </SelectItem>
                        )}
                      </Select>

                      <Select
                        items={[
                          { key: "male", label: "Male" },
                          { key: "female", label: "Female" },
                        ]}
                        name="gender"
                        label="Select Gender"
                        className="max-w-xs"
                      >
                        {(gender) => (
                          <SelectItem key={gender.key}>
                            {gender.label}
                          </SelectItem>
                        )}
                      </Select>
                    </ModalBody>
                    <ModalFooter className="w-full">
                      <Button
                        type="button"
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        isLoading={
                          navigation.state === "submitting" ? true : false
                        }
                        type="submit"
                        color="primary"
                      >
                        Add Employee
                      </Button>
                    </ModalFooter>
                  </Form>
                </>
              )}
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
          classNames={{
            wrapper: "min-h-[222px]",
          }}
          isStriped
          aria-label="Employee List Table"
        >
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableColumn>PERSON IN CHARGE</TableColumn>
            <TableColumn>TRUCK PLATE NUMBER</TableColumn>
            <TableColumn>TRUCK CHASSIS NUMBER</TableColumn>
            <TableColumn>REQUEST STATUS</TableColumn>
            <TableColumn>PROGRESS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {maintainance.map((val) => (
              <TableRow key={val._id}>
                <TableCell>{val.person_incharge.name}</TableCell>
                <TableCell>{val.truck_id.plate_number}</TableCell>
                <TableCell>{val.truck_id.chassis_number}</TableCell>
                <TableCell>
                  <Chip
                    className={`font-bold text-white `}
                    color={
                      val.status === "accepted"
                        ? "success"
                        : val.status === "rejected"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {val.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    className={`font-bold text-white `}
                    color={
                      val.progress === "done"
                        ? "success"
                        : val.status === "failed"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {val.progress}
                  </Chip>
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly className="text-2xl" variant="light">
                        <CiMenuKebab />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem key="details">Details</DropdownItem>
                      <DropdownItem key="edit">Edit</DropdownItem>

                      <DropdownItem
                        key="delete"
                        color="danger"
                        className="text-danger"
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

      {/* Edit Modal */}
      {/* {selectedUser && (
        <Modal
          size="2xl"
          isOpen={isEditModalOpen}
          onOpenChange={closeEditModal}
        >
          <ModalContent>
            {() => (
              <Form method="put">
                <ModalHeader>Edit Employee</ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    defaultValue={selectedUser.name}
                    required
                  />
                  <Input
                    type="text"
                    label="Username"
                    name="username"
                    defaultValue={selectedUser.username}
                    required
                  />
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    defaultValue={selectedUser.email}
                    required
                  />
                  <Input
                    type="text"
                    label="Address"
                    name="address"
                    defaultValue={selectedUser.address}
                    required
                  />

                  <Input
                    type="hidden"
                    name="id"
                    defaultValue={selectedUser._id}
                    required
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={closeEditModal}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Update Profile
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </ModalContent>
        </Modal>
      )}

      <Modal
        size="sm"
        isOpen={openDeleteModal}
        onOpenChange={() => setOpenDeleteModal(false)}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Are you sure Delete User Details</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4"></ModalBody>

              <Form
                method="post"
                action={`/dashboard/mechanics/${selectedUser?._id}/destroy`}
              >
                <Input type="hidden" />
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => closeDeteleModalFunc()}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={navigation.state === "submitting" ? true : false}
                    color="danger"
                    type="submit"
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>

      <UserDetailsModal
        user={userDetails}
        closeDetailsModalFunc={closeDetailsModalFunc}
        openDetailsModal={openDetailsModal}
      /> */}
    </div>
  );
};

export default DashboardStartingPage;
