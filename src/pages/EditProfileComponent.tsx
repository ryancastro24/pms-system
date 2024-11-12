import { Input } from "@nextui-org/input";
import {
  Form,
  ActionFunction,
  redirect,
  useLoaderData,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalContent,
  ModalFooter,
} from "@nextui-org/modal";
import { useState } from "react";
import { changePassword, getProfile } from "../backend/auth";
import { editEmployeeData } from "../backend/employeesData";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Convert FormData entries to a Record<string, string> by filtering out Files and ensuring strings
  const data: Record<string, string> = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === "string" ? value : "", // Handle only string entries
    ])
  );

  if (request.method === "POST") {
    const updatedProfileData = await editEmployeeData(data);
    return updatedProfileData;
  } else if (request.method === "PUT") {
    const { password, confirmPassword } = data;

    if (!password || !confirmPassword) {
      return { error: "Password and confirm password fields are required." };
    }

    const changePasswordData = await changePassword(password, confirmPassword);
    return changePasswordData;
  }

  console.log(data);

  return redirect("/dashboard/editProfile");
};

export const loader = async () => {
  const myacc = await getProfile();
  console.log(myacc._id);
  return { myacc };
};

type EditProfileType = {
  myacc: {
    _id: string;
    name: string;
    address: string;
    age: string;
    email: string;
    driver_license_number: string;
  };
};
const EditProfileComponent = () => {
  const { myacc } = useLoaderData() as EditProfileType;
  const navigate = useNavigation();
  const actionData = useActionData();
  console.log(actionData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPassworCorrect, setIsPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIndicator, setPasswordIndicator] = useState("");

  const confirmChangePassword = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      const response = await fetch(
        "https://pms-mining-api.onrender.com/api/auth/confirmPassword",
        {
          method: "POST", // Set the request method to POST
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify({ password: password }), // Send data as JSON
        }
      );
      const returnData = await response.json();

      if (returnData.message === "approved") {
        setPasswordIndicator(returnData.message);
        setIsPasswordCorrect(true);
      } else {
        setPasswordIndicator(returnData.message);
      }
    } catch (error) {
      console.error("Error adding the employee data:", error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <h2 className="text-xl font-bold">Edit Profile</h2>

      <Form method="post" className="flex flex-col gap-16">
        <div className="grid grid-cols-3 gap-5 w-full">
          <Input value={myacc._id} type="hidden" name="id" />
          <Input
            defaultValue={myacc.name}
            type="text"
            label="Name"
            name="name"
          />
          <Input
            defaultValue={myacc.email}
            type="email"
            label="Email"
            name="email"
          />
          <Input
            defaultValue={myacc.address}
            type="text"
            label="Address"
            name="address"
          />
          <Input
            defaultValue={myacc.age}
            type="number"
            label="Age"
            name="age"
          />
          <Input
            defaultValue={myacc.driver_license_number}
            type="text"
            label="Liscense Number"
            name="driver_license_number"
          />
          <div className="flex flex-col gap-2">
            <Button
              onPress={onOpen}
              type="button"
              color="success"
              className="text-white"
            >
              {passwordIndicator === "" || passwordIndicator === "rejected"
                ? "Confirm Password"
                : "Change Password"}
            </Button>

            {passwordIndicator === "rejected" ? (
              <h2 className="text-danger text-xs">
                Incorrect Password ,Try Again
              </h2>
            ) : passwordIndicator === "approved" ? (
              <h2 className="text-success text-xs">Password Approved</h2>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Button type="button" color="danger" variant="flat">
            Cancel
          </Button>

          <Button
            isLoading={navigate.state === "submitting" ? true : false}
            type="submit"
            color="primary"
          >
            Update Profile
          </Button>
        </div>
      </Form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {isPassworCorrect ? (
                <Form method="put">
                  <ModalHeader className="flex flex-col gap-1">
                    Change Password
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="password"
                      label="Enter New Password"
                      name="password"
                    />
                    <Input
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Change Password
                    </Button>
                  </ModalFooter>
                </Form>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Confirm Password
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="Enter  Password"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      onClick={confirmChangePassword}
                      color="primary"
                      onPress={onClose}
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfileComponent;
