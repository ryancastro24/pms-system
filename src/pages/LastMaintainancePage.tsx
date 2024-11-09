import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { getMaintainance } from "../backend/maintainanceData";
import { LoaderFunction } from "react-router-dom";

export const loader: LoaderFunction = async ({ params }) => {
  const maintainanceId = params?.maintainanceId;

  if (!maintainanceId) {
    throw new Error("Maintenance ID is required");
  }

  const data = await getMaintainance(maintainanceId);

  console.log(data);
  return data as string; // Adjust `string` to the actual return type of `getMaintainance` if necessary
};

const LastMaintainancePage = () => {
  const sampleMaintainanceData = useLoaderData();

  return (
    <div className="absolute  z-20 w-full h-full grid grid-cols-2 py-10 px-16">
      <div className="flex flex-col justify-between ">
        <h2>
          <Link
            to={"/dashboard"}
            className="flex items-center gap-2 hover:font-bold hover:gap-3"
          >
            <RiArrowGoBackLine /> Back
          </Link>
        </h2>

        <div>
          <h2>
            <strong>Done On:</strong> October 24, 2024
          </h2>
          <h2>
            <strong>Incharge:</strong> Juan Dela Cruz
          </h2>
        </div>

        <div>
          <h2 className="mb-5">
            <strong>Truck Details:</strong>
          </h2>

          <Table
            className="w-[500px]"
            isStriped
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>PROPERTY</TableColumn>
              <TableColumn>VALUE</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="text-xs">
                  <strong>PLATE NUMBER</strong>
                </TableCell>
                <TableCell className="text-xs">JH6542</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="text-xs">
                  <strong>VIN NUMBER</strong>
                </TableCell>
                <TableCell className="text-xs">1231421312312</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="text-xs">
                  <strong>CHASSIS NUMBER</strong>
                </TableCell>
                <TableCell className="text-xs">123se12123</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="text-xs">
                  <strong>ISSUES</strong>
                </TableCell>
                <TableCell className="text-xs">None</TableCell>
              </TableRow>

              <TableRow key="5">
                <TableCell className="text-xs">
                  <strong>TYPE</strong>
                </TableCell>
                <TableCell className="text-xs">Dump Truck</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell className="text-xs">
                  <strong>CHECKED</strong>
                </TableCell>
                <TableCell className="text-xs">YES</TableCell>
              </TableRow>
              <TableRow key="7">
                <TableCell className="text-xs">
                  <strong>PM SCHEDULE</strong>
                </TableCell>
                <TableCell className="text-xs">11/05/2024</TableCell>
              </TableRow>

              <TableRow key="8">
                <TableCell className="text-xs">
                  <strong>PERSON IN CHARGE</strong>
                </TableCell>
                <TableCell className="text-xs">Juan Dela Cruz</TableCell>
              </TableRow>

              <TableRow key="9">
                <TableCell className="text-xs">
                  <strong>STATUS</strong>
                </TableCell>
                <TableCell className="text-xs">Available</TableCell>
              </TableRow>

              <TableRow key="10">
                <TableCell className="text-xs">
                  <strong>DATE DEPLOYED</strong>
                </TableCell>
                <TableCell className="text-xs">04/24/2024</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <Table
          className="w-full"
          isStriped
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn className="bg-[#8f5c54] text-white">
              MAINTAINANCE
            </TableColumn>
            <TableColumn className="bg-[#8f5c54] text-white text-right">
              STATUS
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 1</strong>
              </TableCell>
              <TableCell className="text-xs text-right">JH6542</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 2</strong>
              </TableCell>
              <TableCell className="text-xs text-right">
                1231421312312
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 3</strong>
              </TableCell>
              <TableCell className="text-xs text-right">123se12123</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 4</strong>
              </TableCell>
              <TableCell className="text-xs text-right">None</TableCell>
            </TableRow>

            <TableRow key="5">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 5</strong>
              </TableCell>
              <TableCell className="text-xs text-right">Dump Truck</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 6</strong>
              </TableCell>
              <TableCell className="text-xs text-right">YES</TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 7</strong>
              </TableCell>
              <TableCell className="text-xs text-right">11/05/2024</TableCell>
            </TableRow>

            <TableRow key="8">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 8</strong>
              </TableCell>
              <TableCell className="text-xs text-right">
                Juan Dela Cruz
              </TableCell>
            </TableRow>

            <TableRow key="9">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 9</strong>
              </TableCell>
              <TableCell className="text-xs text-right">Available</TableCell>
            </TableRow>

            <TableRow key="10">
              <TableCell className="text-xs">
                <strong>TASK NUMBER 10</strong>
              </TableCell>
              <TableCell className="text-xs text-right">04/24/2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs">
            <strong>REMARKS</strong>
          </h2>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            repellendus distinctio ipsum. Veniam, velit tempore eum nulla ipsum
            consectetur veritatis!
          </p>
        </div>

        <div className="flex items-center gap-8">
          <Button radius="full" color="primary" className="font-bold">
            LIST OF PMS
          </Button>
          <Button
            radius="full"
            color="success"
            className="text-white font-bold"
          >
            DOWNLOAD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LastMaintainancePage;
