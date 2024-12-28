import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react"; // Ensure Button is properly imported
import { getAllIssues } from "@/backend/issues";
import { useLoaderData } from "react-router-dom";
import { Form, ActionFunction } from "react-router-dom";
import { updateIssueRepair } from "@/backend/issues";
type IssueType = {
  _id: string;
  title: string;
  status: string;
  proceed_repair: boolean;
  truck_id: {
    plate_number: string;
  };
  user_id: {
    name: string;
  };
};

type LoaderData = {
  issues: IssueType[];
};

export const action: ActionFunction = async ({ request }) => {
  console.log(request.method);

  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );

  const returnData = await updateIssueRepair(data.id);
  return returnData;
};

export const loader = async (): Promise<LoaderData> => {
  const issues = await getAllIssues(); // Ensure this returns data in the expected format
  console.log(issues);
  return { issues };
};

const IssuesComponent = () => {
  const { issues } = useLoaderData() as LoaderData; // Correct type assertion

  return (
    <div className="w-full flex flex-col gap-3 py-5">
      <h2>Issues Component</h2>

      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>TRUCK PLATE NUMBER</TableColumn>
          <TableColumn>MECHANIC</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Issues Available"}>
          {Array.isArray(issues)
            ? issues.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.status}</TableCell>
                  <TableCell>{issue.truck_id.plate_number}</TableCell>
                  <TableCell>{issue.user_id.name}</TableCell>
                  <TableCell>
                    {issue.proceed_repair ? (
                      <Button size="sm" color="primary">
                        View
                      </Button>
                    ) : (
                      <Form method="POST">
                        <input type="hidden" name="id" value={issue._id} />
                        <Button
                          type="submit"
                          size="sm"
                          color="success"
                          className="text-white"
                        >
                          Approve
                        </Button>
                      </Form>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssuesComponent;
