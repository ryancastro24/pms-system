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
const MechanicsComponent = () => {
  const [searchData, setSearchData] = useState("");
  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8 ">
      <div className="w-full p-3 pl-6 rounded bg-[#dcd8d0] flex justify-between items-center">
        <h2>List of Employees</h2>
        <Input
          type="search"
          label="Search Name..."
          className="w-[300px] h-[45px]"
          radius="sm"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
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
