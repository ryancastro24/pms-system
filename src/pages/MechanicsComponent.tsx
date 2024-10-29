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
import { getAllEmployeesData } from "../backend/getEmployeesData";
import { Pagination } from "@nextui-org/pagination";
import { redirect, useNavigate } from "react-router-dom";

export async function loader() {
  const users = await getAllEmployeesData();
  return { users };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );

  console.log(data);
  return redirect("/dashboard/mechanics");
};

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

type LoaderDataType = {
  users: SamplePropType[];
};

const MechanicsComponent = () => {
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

  const navigate = useNavigate();

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
                        label="Gender"
                        name="sample_gender"
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
                      <Button type="submit" color="primary">
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
              <>
                <ModalHeader>Edit Employee</ModalHeader>
                <ModalBody>
                  <Form method="post" className="grid grid-cols-2 gap-4">
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
                  </Form>
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
                    Save Changes
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default MechanicsComponent;
