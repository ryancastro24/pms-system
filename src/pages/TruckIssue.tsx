import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { getTruckIssues } from "@/backend/issues";
import { IoReturnUpBack } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
export const loader: LoaderFunction = async ({ params }) => {
  const issues = await getTruckIssues(params.id);

  console.log(issues);
  return { issues };
};

type IssueType = {
  truck_id: string;
  user_id: {
    _id: string;
    name: string;
  };
  id: string;
  title: string;
  status: string;
  proceed_repair: boolean;
};

type IssueArrayType = {
  issues: IssueType[];
};

const TruckIssue = () => {
  const { issues } = useLoaderData() as IssueArrayType;
  const navigate = useNavigate();

  if (!Array.isArray(issues)) {
    return (
      <div className="p-5 w-full h-screen flex flex-col gap-5 relative items-center justify-center">
        <h2 className="text-5xl font-bold">No Issues Available</h2>
        <Button
          onClick={() => navigate(-1)}
          className="flex  items-center justify-center gap-2 cursor-pointer"
          color="primary"
        >
          <span className="text-2xl">
            <IoReturnUpBack />
          </span>
          <span>Back</span>
        </Button>
      </div>
    );
  }
  return (
    <div className="p-5 w-full h-screen flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 cursor-pointer"
          color="primary"
        >
          <span className="text-2xl">
            <IoReturnUpBack />
          </span>
          <span>Back</span>
        </Button>
        <h2 className="text-2xl font-bold">Available Issues</h2>
      </div>

      <div className="w-full grid grid-cols-3 gap-5">
        {issues.map((val) => (
          <div
            className={`w-full h-24 rounded p-4 flex flex-col gap-2 ${
              val.proceed_repair ? "bg-[#D5B990]" : "bg-[#ffebcd]"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{val.title}</h2>
              <Chip color="danger" variant="flat">
                {val.status}
              </Chip>
            </div>
            <h2 className="text-sm">
              <strong>Mechanic In Charge</strong>: {val.user_id.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckIssue;
