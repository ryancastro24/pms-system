import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import TruckCardComponent from "../components/TruckCardComponent";

export type TrucksPropType = {
	id: Number;
	licensePlate: String;
	model: String;
	capacity: Number;
	driver: String;
	status: String;
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
		status: "Under Maintenance",
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
		status: "Under Maintenance",
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

const TrucksComponent = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchData, setSearchData] = useState("");
	const itemsPerPage = 6;

	const finalTrucks = trucks.filter((val) =>
		val.licensePlate.toUpperCase().startsWith(searchData.toUpperCase())
	);

	// Calculate the trucks for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentTrucks = finalTrucks.slice(startIndex, endIndex);

	// Calculate the total number of pages
	const totalPages = Math.ceil(trucks.length / itemsPerPage);

	return (
		<div className="w-full h-full flex flex-col gap-4 mt-8">
			<div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] flex justify-between items-center">
				<h2>List of Trucks</h2>
				<Input
					type="search"
					label="Search Plate Number..."
					className="w-[300px] h-[45px]"
					radius="sm"
					value={searchData}
					onChange={(e) => setSearchData(e.target.value)}
				/>
			</div>

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
	);
};

export default TrucksComponent;
