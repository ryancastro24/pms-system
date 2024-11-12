import { redirect, ActionFunction } from "react-router-dom";
import { deleteMaintainance } from "../backend/maintainanceData";
export const action: ActionFunction = async ({ params }) => {
  if (params && params.maintainanceId) {
    await deleteMaintainance(params.maintainanceId);
  }
  return redirect("/");
};
