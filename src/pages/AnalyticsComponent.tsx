import { getAllTrucksData } from "@/backend/trucksData";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "@/components/PieChart";
import { useLoaderData } from "react-router-dom";
import { TruckLoaderDataType } from "./TrucksComponent";
export const loader = async () => {
  const trucks = await getAllTrucksData();

  return { trucks };
};
const AnalyticsComponent = () => {
  const { trucks } = useLoaderData() as TruckLoaderDataType;
  return (
    <div className="p-5">
      <div className="grid grid-cols-2 justify-between gap-10">
        <BarChartComponent trucks={trucks} />
        <PieChartComponent trucks={trucks} />
      </div>
    </div>
  );
};

export default AnalyticsComponent;
