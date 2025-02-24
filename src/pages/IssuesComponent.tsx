import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import { getAllIssues, updateIssueRepair } from "@/backend/issues";
import { useLoaderData, Form, ActionFunction } from "react-router-dom";
import { useMemo, useState } from "react";

// Define IssueType and LoaderData types
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

// Action function to handle form submission
export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    const returnData = await updateIssueRepair(data.id as string);
    return returnData;
  } catch (error) {
    console.error("Error updating issue repair:", error);
    throw new Error("Failed to update issue repair.");
  }
};

// Loader function to fetch issues
export const loader = async (): Promise<LoaderData> => {
  try {
    const issues = await getAllIssues();
    return { issues };
  } catch (error) {
    console.error("Error fetching issues:", error);
    return { issues: [] }; // Return empty array in case of error
  }
};

const IssuesComponent = () => {
  const { issues } = useLoaderData() as LoaderData; // Correct type assertion
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  if (!Array.isArray(issues) || issues.length === 0) {
    return (
      <div className="flex items-center p-24 justify-center">
        <h1>No Issues Available</h1>
      </div>
    );
  }

  // Calculate paginated issues
  const paginatedIssues = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return issues.slice(start, end);
  }, [page, issues]);

  const totalPages = Math.ceil(issues.length / rowsPerPage);

  return (
    <div className="w-full flex flex-col gap-3 py-5">
      <h2 className="dark:text-white">Issues Component</h2>

      <Table
        isStriped
        aria-label="Issues Datatable"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>TRUCK PLATE NUMBER</TableColumn>
          <TableColumn>MECHANIC</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Issues Available"}>
          {paginatedIssues.map((issue) => (
            <TableRow key={issue._id}>
              <TableCell className="dark:text-white">{issue.title}</TableCell>
              <TableCell className="dark:text-white">{issue.status}</TableCell>
              <TableCell className="dark:text-white">
                {issue.truck_id.plate_number}
              </TableCell>
              <TableCell className="dark:text-white">
                {issue.user_id.name}
              </TableCell>
              <TableCell className="dark:text-white">
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssuesComponent;
