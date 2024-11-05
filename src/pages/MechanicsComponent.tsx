import { useState, useMemo } from "react";
import { Input } from "@nextui-org/input";
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
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
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
import { useLoaderData, Form, ActionFunction } from "react-router-dom";
import {
  getAllEmployeesData,
  addEmployeeData,
  editEmployeeData,
} from "../backend/employeesData";
import { Pagination } from "@nextui-org/pagination";
import { redirect, useNavigation } from "react-router-dom";
import { nav } from "framer-motion/client";

export async function loader() {
  const users = await getAllEmployeesData();
  return { users };
}

export const action: ActionFunction = async ({ request }) => {
  console.log(request.method);
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

type SamplePropType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export type LoaderDataType = {
  users: SamplePropType[];
};

const MechanicsComponent = () => {
  const navigation = useNavigation();

  console.log(navigation.state);

  const [searchData, setSearchData] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SamplePropType | null>(null);

  const { users } = useLoaderData() as LoaderDataType;

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users
      .slice(start, end)
      .filter((user) =>
        user.name.toLowerCase().includes(searchData.toLowerCase())
      );
  }, [page, users, searchData]);

  const openEditModal = (user: SamplePropType) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] flex justify-between items-center">
        <h2>List of Employees</h2>
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
                      <Input
                        type="text"
                        label="Name"
                        name="sample_name"
                        required
                      />
                      <Input
                        type="text"
                        label="Username"
                        name="sample_username"
                        required
                      />
                      <Input
                        type="email"
                        label="Email"
                        name="sample_email"
                        required
                      />
                      <Input
                        type="number"
                        label="Age"
                        name="sample_age"
                        required
                      />
                      <Input
                        type="text"
                        label="Address"
                        name="sample_address"
                        required
                      />

                      <Input
                        type="text"
                        label="Liscence Number"
                        name="liscence_number"
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
            <TableColumn>NAME</TableColumn>
            <TableColumn>USERNAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>ADDRESS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address.street}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly className="text-2xl" variant="light">
                        <CiMenuKebab />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem
                        key="edit"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </DropdownItem>
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
      {selectedUser && (
        <Modal
          size="2xl"
          isOpen={isEditModalOpen}
          onOpenChange={closeEditModal}
        >
          <ModalContent>
            {(onClose) => (
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
                    defaultValue={selectedUser.address.street}
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
    </div>
  );
};

export default MechanicsComponent;
