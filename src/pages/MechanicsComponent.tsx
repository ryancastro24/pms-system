import { useState } from "react";
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
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/modal";
const MechanicsComponent = () => {
	const [searchData, setSearchData] = useState("");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div className="w-full h-full flex flex-col gap-4 mt-8 ">
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
									<ModalBody className="grid grid-cols-2">
										<Input type="text" label="Name" />
										<Input type="text" label="Name" />
										<Input type="text" label="Name" />
										<Input type="text" label="Name" />
										<Input type="text" label="Name" />
										<Input type="text" label="Name" />
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Canccel
										</Button>
										<Button color="primary" onPress={onClose}>
											Add Employee
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</div>
			<Table aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>ROLE</TableColumn>
					<TableColumn>STATUS</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>Tony Reichert</TableCell>
						<TableCell>CEO</TableCell>
						<TableCell>Active</TableCell>
					</TableRow>
					<TableRow key="2">
						<TableCell>Zoey Lang</TableCell>
						<TableCell>Technical Lead</TableCell>
						<TableCell>Paused</TableCell>
					</TableRow>
					<TableRow key="3">
						<TableCell>Jane Fisher</TableCell>
						<TableCell>Senior Developer</TableCell>
						<TableCell>Active</TableCell>
					</TableRow>
					<TableRow key="4">
						<TableCell>William Howard</TableCell>
						<TableCell>Community Manager</TableCell>
						<TableCell>Vacation</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default MechanicsComponent;
