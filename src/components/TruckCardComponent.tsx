import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import React from "react";
import { TrucksPropType } from "../pages/TrucksComponent";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { PiWarningCircleBold } from "react-icons/pi";
const TruckCardComponent = ({
  licensePlate,
  model,
  driver,
  status,
}: TrucksPropType) => {
  return (
    <Card
      className={`w-full h-44 p-2 rounded bg-[#f3efea] hover:text-white hover:bg-[#8f5c54] cursor-pointer relative`}
      shadow="none"
    >
      <CardHeader className="flex items-center gap-2">
        <strong>Plate Number:</strong>
        <span className="font-light">{licensePlate}</span>
      </CardHeader>

      <CardBody>
        <span className="text-sm">
          <strong>Driver: </strong>
          {driver}
        </span>

        <span className="text-sm">
          <strong>Model: </strong>
          {model}
        </span>
      </CardBody>

      <span
        className={`px-3 py-1 rounded-full flex items-center gap-1 absolute bottom-3 left-3 text-sm  ${
          status === "Under Maintenance"
            ? "bg-red-500 text-white"
            : status === "On hold"
            ? "bg-orange-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        {status === "Under Maintenance" ? (
          <FiXCircle />
        ) : status === "On hold" ? (
          <PiWarningCircleBold />
        ) : (
          <FaRegCheckCircle />
        )}

        {status}
      </span>
    </Card>
  );
};

export default TruckCardComponent;
