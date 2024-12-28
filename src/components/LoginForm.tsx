import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Link,
  Form,
  ActionFunction,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { login } from "../backend/auth";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    const username =
      data.username instanceof File ? "" : (data.username as string);
    const password =
      data.password instanceof File ? "" : (data.password as string);

    const loginData = await login(username, password);

    if (loginData && loginData.token) {
      // Store the token and user data in localStorage
      localStorage.setItem("authToken", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData));

      return redirect("/dashboard");
    } else {
      return loginData;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message); // Now TypeScript knows error is an instance of Error
    } else {
      console.log("An unknown error occurred");
    }
  }
};

const LoginForm = () => {
  const actionData = useActionData() as { error: string };
  const navigation = useNavigation();

  console.log(actionData);
  return (
    <div className="w-full h-full flex  items-center justify-center p-10 shadow-none">
      <Card
        className="w-full sm:w-[400px] p-2 rounded bg-[#f3efea]"
        shadow="none"
      >
        <CardHeader className="">PMS System | Login Form</CardHeader>

        <CardBody className="flex flex-col gap-2">
          <Form method="post" className="flex flex-col gap-2">
            <Input
              className="bg-[#dcd8d0] rounded"
              radius="sm"
              type="text"
              label="Username"
              name="username"
            />
            <Input
              className="bg-[#dcd8d0] rounded"
              radius="sm"
              type="password"
              label="Password"
              name="password"
            />

            {actionData && (
              <h2 className="text-sm text-red-500">
                {actionData.error} <i>please try again</i>
              </h2>
            )}

            <Button
              isLoading={navigation.state === "submitting" ? true : false}
              type="submit"
              className="rounded h-[50px] bg-[#8f5c54] font-bold text-white"
            >
              Submit
            </Button>
          </Form>
        </CardBody>

        <CardFooter>
          <h2 className="text-[#253331]">
            Forgot Password?{" "}
            <Link className="text-blue-500" to={"/password-recovery"}>
              recover
            </Link>
          </h2>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
