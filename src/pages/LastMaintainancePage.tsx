import { RiArrowGoBackLine } from "react-icons/ri";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { getSpecificTruckMaintainanceData } from "../backend/maintainanceData";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export const loader: LoaderFunction = async ({ params }) => {
  const truckId = params?.truckId;

  if (!truckId) {
    throw new Error("Maintenance ID is required");
  }

  const maintenanceData = await getSpecificTruckMaintainanceData(truckId);
  console.log(maintenanceData);
  return { maintenanceData };
};

const LastMaintainancePage = () => {
  const { maintenanceData } = useLoaderData() as any;

  const navigate = useNavigate();

  if (maintenanceData.data.truckMaintenance.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full flex-col gap-5">
        <h1 className="text-3xl">No Maintenance Available</h1>
        <Button color="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }
  return (
    <div className="absolute  z-20 w-full h-full grid grid-cols-2 py-10 px-16">
      <div className="flex flex-col gap-10 ">
        <h2>
          <Button
            onPress={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <RiArrowGoBackLine /> Back
          </Button>
        </h2>

        <div>
          <h2 className="dark:text-white">
            <strong>
              {maintenanceData.data.truckMaintenance[0].progress === "completed"
                ? "Done On"
                : "Schedule For PMS"}
              :
            </strong>{" "}
            {maintenanceData.data.truckMaintenance[0].scheduled_date}
          </h2>
          <h2 className="dark:text-white">
            <strong>Incharge:</strong>{" "}
            {maintenanceData.data.truckMaintenance[0].person_incharge.name}
          </h2>
        </div>

        <div>
          <h2 className="mb-3 dark:text-white">
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
                <TableCell className="text-xs dark:text-white">
                  <strong>PLATE NUMBER</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.plate_number}
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="text-xs dark:text-white">
                  <strong>VIN NUMBER</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.vin_number}
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="text-xs dark:text-white">
                  <strong>CHASSIS NUMBER</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.chassis_number}
                </TableCell>
              </TableRow>

              <TableRow key="5">
                <TableCell className="text-xs dark:text-white">
                  <strong>TYPE</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.type}
                </TableCell>
              </TableRow>

              <TableRow key="7">
                <TableCell className="text-xs dark:text-white">
                  <strong>PM SCHEDULE</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.date_deployed}
                </TableCell>
              </TableRow>

              <TableRow key="8">
                <TableCell className="text-xs dark:text-white">
                  <strong>PERSON IN CHARGE</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.person_incharge}
                </TableCell>
              </TableRow>

              <TableRow key="9">
                <TableCell className="text-xs dark:text-white">
                  <strong>STATUS</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.status}
                </TableCell>
              </TableRow>

              <TableRow key="10">
                <TableCell className="text-xs dark:text-white">
                  <strong>DATE DEPLOYED</strong>
                </TableCell>
                <TableCell className="text-xs dark:text-white">
                  {maintenanceData.data.truckDetails.createdAt}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col  gap-10">
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
              <TableCell className="dark:text-white">
                <strong>Battery Load Test</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0].battery_load_test ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="dark:text-white">
                <strong>Change Fluids</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0].changed_fluids ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="dark:text-white">
                <strong>Change Exterior Ligthings</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0]
                    .check_exterior_lightings ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell className="dark:text-white">
                <strong>Checked Air Filters</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0]
                    .checked_air_filters ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>

            <TableRow key="5">
              <TableCell className="dark:text-white">
                <strong>Checked Fluid Levels</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0]
                    .checked_fluid_levels ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell className="dark:text-white">
                <strong>Checked Tires</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0].checked_tires ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell className="dark:text-white">
                <strong>Electrical Systems Verification</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0]
                    .electrical_system_verification ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>

            <TableRow key="8">
              <TableCell className="dark:text-white">
                <strong>Inspect Brakes</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0].inspect_brakes ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>

            <TableRow key="9">
              <TableCell className="dark:text-white">
                <strong>Inspect Gearbox and Clutch</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {" "}
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0]
                    .inspect_gearbox_and_clutch ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>

            <TableRow key="10">
              <TableCell className="dark:text-white">
                <strong>Verify Tire Pressure</strong>
              </TableCell>
              <TableCell className="flex items-end justify-end dark:text-white">
                {maintenanceData.data.truckMaintenance[0].progress ===
                "completed" ? (
                  maintenanceData.data.truckMaintenance[0]
                    .verify_tire_pressure ? (
                    <span className="text-green-500 text-xl text-right">
                      <FaCircleCheck />
                    </span>
                  ) : (
                    <span className="text-red-500 text-xl">
                      <FaCircleXmark />
                    </span>
                  )
                ) : (
                  maintenanceData.data.truckMaintenance[0].progress
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xs dark:text-white">
              <strong>REMARKS</strong>
            </h2>
            <p className="text-sm">
              {!maintenanceData.data.truckMaintenance[0].remarks?.trim()
                ? "NO REMARKS"
                : maintenanceData.data.truckMaintenance[0].remarks}
            </p>
          </div>

          <div className="flex items-center gap-8">
            <Link
              to={`/listOfMaintenance/${maintenanceData.data.truckDetails._id}`}
            >
              <Button color="primary" className="font-bold">
                LIST OF PMS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMaintainancePage;
