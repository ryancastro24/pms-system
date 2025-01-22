import { getSpecificTruckMaintainanceData } from "../backend/maintainanceData";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
export const loader: LoaderFunction = async ({ params }) => {
  const truckId = params?.truckId;

  if (!truckId) {
    throw new Error("Maintenance ID is required");
  }

  const maintenanceData = await getSpecificTruckMaintainanceData(truckId);
  console.log(maintenanceData);
  return { maintenanceData };
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Extract the parts of the date
  const options: any = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

const ListOfMaintenance = () => {
  const { maintenanceData } = useLoaderData() as any;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col gap-5">
        <Button
          onPress={() => navigate(-1)}
          className="flex items-center gap-2 w-[100px]"
        >
          <RiArrowGoBackLine /> Back
        </Button>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl dark:text-white">List of Maintenance</h2>
          <span className="text-xs dark:text-white">
            <strong>PLATE NUMBER:</strong>{" "}
            {maintenanceData.data.truckDetails.plate_number}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 mt-10">
        {maintenanceData.data.truckMaintenance.map((val: any) => (
          <>
            <Card
              onClick={onOpen}
              className={`w-full h-full p-2 cursor-pointer ${
                val.progress === "completed" ? "bg-[#D5B990]" : "bg-orange-400"
              } `}
            >
              <CardHeader
                className={`flex items-center gap-2 dark:text-white ${
                  val.progress === "completed" ? "text-black" : "text-white"
                }`}
              >
                <strong>
                  {val.progres === "completed" ? "Done on: " : "Scheduled On: "}
                </strong>{" "}
                {formatDate(val.updatedAt)}
              </CardHeader>

              <CardBody>
                <span
                  className={`text-sm  ${
                    val.progress === "completed" ? "text-black" : "text-white"
                  }`}
                >
                  Person In-Charge: {val.person_incharge.name}
                </span>
              </CardBody>

              <CardFooter className="w-full ">
                <Button onPress={onOpen} color="secondary" className="w-full">
                  View
                </Button>
              </CardFooter>
            </Card>

            <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 dark:text-white">
                      <h1>
                        {val.progress === "completed"
                          ? "Done On:"
                          : "Schedule On:"}{" "}
                        {val.scheduled_date}
                      </h1>

                      <span className="text-sm font-light">
                        Incharge: {val.person_incharge.name}
                      </span>
                    </ModalHeader>
                    <ModalBody>
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
                            <TableCell className="flex items-end justify-end dark:text-white ">
                              {val.progress === "completed" ? (
                                val.battery_load_test ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow key="2">
                            <TableCell className="dark:text-white">
                              <strong>Change Fluids</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.changed_fluids ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow key="3">
                            <TableCell className="dark:text-white">
                              <strong>Change Exterior Ligthings</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.check_exterior_lightings ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow key="4">
                            <TableCell className="dark:text-white">
                              <strong>Checked Air Filters</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.checked_air_filters ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>

                          <TableRow key="5">
                            <TableCell className="dark:text-white">
                              <strong>Checked Fluid Levels</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.checked_fluid_levels ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow key="6">
                            <TableCell className="dark:text-white">
                              <strong>Checked Tires</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.checked_tires ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow key="7">
                            <TableCell className="dark:text-white">
                              <strong>Electrical Systems Verification</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.electrical_system_verification ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>

                          <TableRow key="8">
                            <TableCell className="dark:text-white">
                              <strong>Inspect Brakes</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.inspect_brakes ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>

                          <TableRow key="9">
                            <TableCell className="dark:text-white">
                              <strong>Inspect Gearbox and Clutch</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {" "}
                              {val.progress === "completed" ? (
                                val.inspect_gearbox_and_clutch ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>

                          <TableRow key="10">
                            <TableCell className="dark:text-white">
                              <strong>Verify Tire Pressure</strong>
                            </TableCell>
                            <TableCell className="flex items-end justify-end dark:text-white">
                              {val.progress === "completed" ? (
                                val.verify_tire_pressure ? (
                                  <span className="text-green-500 text-xl text-right">
                                    <FaCircleCheck />
                                  </span>
                                ) : (
                                  <span className="text-red-500 text-xl">
                                    <FaCircleXmark />
                                  </span>
                                )
                              ) : (
                                val.progress
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ))}
      </div>
    </div>
  );
};

export default ListOfMaintenance;
