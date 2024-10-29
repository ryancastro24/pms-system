import { Input } from "@nextui-org/input";
import { Form, ActionFunction, redirect } from "react-router-dom";
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
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );

  console.log(data);

  return redirect("/dashboard/editProfile");
};

const EditProfileComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPassworCorrect, setIsPasswordCorrect] = useState(false);
  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <h2 className="text-xl font-bold">Edit Profile</h2>

      <Form method="post" className="flex flex-col gap-16">
        <div className="grid grid-cols-3 gap-5 w-full">
          <Input
            defaultValue={"samle default data"}
            type="text"
            label="Name"
            name="name"
          />
          <Input
            defaultValue={"sample@email.com"}
            type="email"
            label="Email"
            name="email"
          />
          <Input
            defaultValue={"samle default data"}
            type="text"
            label="Address"
            name="address"
          />
          <Input defaultValue={"22"} type="number" label="Age" name="age" />
          <Input
            defaultValue={"samle default data"}
            type="text"
            label="Liscense Number"
            name="liscene_number"
          />

          <Button
            onPress={onOpen}
            type="button"
            color="success"
            className="text-white"
          >
            Change Password
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <Button type="button" color="danger" variant="flat">
            Cancel
          </Button>

          <Button type="submit" color="primary">
            Update Profile
          </Button>
        </div>
      </Form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {isPassworCorrect ? (
                <Form method="post">
                  <ModalHeader className="flex flex-col gap-1">
                    Change Password
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="password"
                      label="Enter New Password"
                      name="new_password"
                    />
                    <Input
                      value={"new password"}
                      type="password"
                      label="Confirm Password"
                      name="confirm_password"
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
                <Form method="post">
                  <ModalHeader className="flex flex-col gap-1">
                    Change Password
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="password"
                      label="Enter  Password"
                      name="password"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Submit
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfileComponent;
