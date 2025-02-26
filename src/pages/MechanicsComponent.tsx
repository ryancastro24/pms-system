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
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect } from "react";
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
} from "@nextui-org/modal";

import { useLoaderData, Form, ActionFunction } from "react-router-dom";

import {
  getAllEmployeesData,
  addEmployeeData,
  editEmployeeData,
} from "../backend/employeesData";
import { Pagination } from "@nextui-org/pagination";
import { redirect, useNavigation, useFetcher } from "react-router-dom";
import { addToast } from "@heroui/toast";
import { cn } from "@nextui-org/theme";
export async function loader() {
  const users = await getAllEmployeesData();
  return { users };
}

export const action: ActionFunction = async ({ request }) => {
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

export type SamplePropType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  position: string;
  age: number;
  gender: string;
  driver_license_number: string;
};

export type LoaderDataType = {
  users: SamplePropType[];
};

const MechanicsComponent = () => {
  const navigation = useNavigation();
  const fetcher = useFetcher();

  const [searchData, setSearchData] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  const openDeteleModalFunc = (user: SamplePropType) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const closeDeteleModalFunc = () => {
    setSelectedUser(null);
    setOpenDeleteModal(false);
  };

  const openEditModal = (user: SamplePropType) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (fetcher.data && fetcher.data.error === undefined) {
      setOpenAddModal(false);
    }
  }, [fetcher.data]);

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] dark:bg-[#222121] flex justify-between items-center">
        <h2 className="dark:text-white">List of Employees</h2>
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
            onPress={() => setOpenAddModal(true)}
          >
            <GoPersonAdd />
          </Button>
          <Modal
            size="2xl"
            isOpen={openAddModal}
            onOpenChange={setOpenAddModal}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 dark:text-white">
                    Add New Employee
                  </ModalHeader>
                  <fetcher.Form method="post" className="w-full">
                    <ModalBody className="grid grid-cols-2 gap-4 w-full">
                      <Input type="text" label="Name" name="name" required />
                      <Input
                        type="text"
                        label="Username"
                        name="username"
                        errorMessage="Username already exists"
                        isInvalid={
                          fetcher.data?.error === "Username already exists"
                        }
                        required
                      />
                      <Input
                        errorMessage="Email already exists"
                        isInvalid={
                          fetcher.data?.error === "Email already exists"
                        }
                        type="email"
                        label="Email"
                        name="email"
                        required
                      />
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
                        required
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
                        required
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
                        Close
                      </Button>
                      <Button
                        isLoading={fetcher.state === "submitting"}
                        type="submit"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </fetcher.Form>
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
            <TableColumn>POSITION</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="dark:text-white">{user.name}</TableCell>
                <TableCell className="dark:text-white">
                  {user.username}
                </TableCell>
                <TableCell className="dark:text-white">{user.email}</TableCell>
                <TableCell className="dark:text-white">
                  {user.address}
                </TableCell>
                <TableCell className="dark:text-white">
                  {user.position}
                </TableCell>
                <TableCell className="dark:text-white">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly className="text-2xl" variant="light">
                        <CiMenuKebab />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem
                        className="dark:text-white"
                        key="edit"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </DropdownItem>

                      <DropdownItem
                        key="delete"
                        color="danger"
                        className="text-danger "
                        onClick={() => openDeteleModalFunc(user)}
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
            {() => (
              <Form method="put">
                <ModalHeader className="dark:text-white">
                  Edit Employee
                </ModalHeader>
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
                  <Button
                    isLoading={navigation.state === "submitting"}
                    color="primary"
                    type="submit"
                  >
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
              <ModalHeader className="dark:text-white">
                Are you sure Delete User Details
              </ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4"></ModalBody>

              <Form
                method="post"
                action={`/dashboard/mechanics/${selectedUser?._id}/destroy`}
              >
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
    </div>
  );
};

export default MechanicsComponent;
