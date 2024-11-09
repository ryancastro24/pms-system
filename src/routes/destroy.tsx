import { redirect, ActionFunction } from "react-router-dom";
import { deleteEmployeeData } from "../backend/employeesData";
export const action: ActionFunction = async ({ params }) => {
  if (params && params.userId) {
    console.log(params.userId);
    const data = await deleteEmployeeData(params.userId);

    return data;
  }
  return redirect("/");
};
