import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "react-router-dom";
const LoginForm = () => {
  return (
    <div className="w-full h-full flex  items-center justify-center p-10 shadow-none ">
      <Card
        className="w-full sm:w-[400px] p-2 rounded bg-[#f3efea]"
        shadow="none"
      >
        <CardHeader className="">PMS System | Login Form</CardHeader>

        <CardBody className="flex flex-col gap-2">
          <Input
            className="bg-[#dcd8d0] rounded"
            radius="sm"
            type="text"
            label="Username"
          />
          <Input
            className="bg-[#dcd8d0] rounded"
            radius="sm"
            type="password"
            label="Password"
          />

          <Button className="rounded h-[50px] bg-[#8f5c54] font-bold text-white">
            Submit
          </Button>
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
