import { redirect, ActionFunction } from "react-router-dom";
import { deleteTruckData } from "../backend/trucksData";
export const action: ActionFunction = async ({ params }) => {
  if (params && params.truckId) {
    console.log(params.truckId);
    const deletedData = await deleteTruckData(params.truckId);
    return deletedData;
  }
  return redirect("/");
};
