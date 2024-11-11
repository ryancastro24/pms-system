import { Outlet, Link, useNavigation } from "react-router-dom";
import { TbBackhoe } from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { Card } from "@nextui-org/card";
import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { SlSettings } from "react-icons/sl";
import { TbLogout } from "react-icons/tb";
import { User } from "@nextui-org/user";
import { isAuthenticated } from "../utils/auth";
import { redirect, useLoaderData } from "react-router-dom";
import { getAllTrucksData } from "../backend/trucksData";

type UserPropType = {
  id?: string;
  name?: string;
  position?: string;
  token?: string;
};
export const loader = async () => {
  if (!isAuthenticated()) {
    return redirect("/"); // Redirect to login if not authenticated
  }

  const user = localStorage.getItem("user");

  const userObj: UserPropType = JSON.parse(user as any);

  const trucks = await getAllTrucksData();

  return { userObj, trucks }; // Proceed if authenticated
};

export default function Root() {
  const [navlist, setNavlist] = useState("");
  const navigation = useNavigation();

  const { userObj, trucks } = useLoaderData() as any;

  const availableTrucks = trucks.filter(
    (val: any) => val.status === "Available"
  ).length;
  const maintainanceTrucks = trucks.filter(
    (val: any) => val.status === "Maintainance"
  ).length;
  const onHoldTrucks = trucks.filter(
    (val: any) => val.status === "On Hold"
  ).length;

  // Ensure loaderData is not null before destructuring
  if (!userObj) {
    return <div>Loading...</div>; // Or handle the case when there's no data
  }

  // Now destructure the properties from loaderData
  return (
    <main className=" w-full h-full flex items-center fixed">
      <div className="bg-[#f3efea] w-[300px]  h-full p-5">
        <div>
          <div className="flex flex-col gap-5 w-full">
            <User
              name={userObj?.name}
              description={userObj?.position}
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <h1
              onClick={() => setNavlist("dashboard")}
              className="py-2 px-3 rounded bg-[#dcd8d0] font-bold"
            >
              <Link to={"/dashboard"}>Dashboard</Link>
            </h1>
          </div>
          <nav className="w-full py-5">
            <ul className={`w-full flex flex-col items-start gap-6`}>
              <li
                onClick={() => setNavlist("trucks")}
                className={`w-full  ${
                  navlist == "trucks"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0]"
                } p-2 rounded`}
              >
                <Link className="flex items-center gap-2 w-full" to={`trucks`}>
                  <span className="text-xl">
                    <TbBackhoe />
                  </span>{" "}
                  <span className="">Trucks List</span>
                </Link>
              </li>
              <li
                onClick={() => setNavlist("mechanics")}
                className={`w-full  ${
                  navlist == "mechanics"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0]"
                } p-2 rounded`}
              >
                <Link
                  className="flex items-center gap-2 w-full"
                  to={`mechanics`}
                >
                  <span className="text-md">
                    <HiOutlineWrenchScrewdriver />
                  </span>{" "}
                  <span className="">Employees List</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16">
          <div>
            <h1 className="py-2 px-3 rounded bg-[#dcd8d0] font-bold">
              Manage Profile
            </h1>
          </div>
          <nav className="w-full py-5">
            <ul className={`w-full flex flex-col items-start gap-6`}>
              <li
                onClick={() => setNavlist("editProfile")}
                className={`w-full  ${
                  navlist == "editProfile"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0]"
                } p-2 rounded`}
              >
                <Link
                  className="flex items-center gap-2 w-full"
                  to={`editProfile`}
                >
                  <span className="text-xl">
                    <LiaUserEditSolid />
                  </span>{" "}
                  <span className="">Update Profile</span>
                </Link>
              </li>
              <li
                onClick={() => setNavlist("settings")}
                className={`w-full  ${
                  navlist == "settings"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0]"
                } p-2 rounded`}
              >
                <Link
                  className="flex items-center gap-2 w-full"
                  to={`settings`}
                >
                  <span className="text-md">
                    <SlSettings />
                  </span>{" "}
                  <span className="">Settings</span>
                </Link>
              </li>

              <li
                onClick={() => setNavlist("settings")}
                className={`w-full  ${
                  navlist == "logout"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0]"
                } p-2 rounded`}
              >
                <Link className="flex items-center gap-2 w-full" to={`logout`}>
                  <span className="text-md">
                    <TbLogout />
                  </span>{" "}
                  <span className="">Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full h-full p-10">
        <div className="grid grid-cols-4 gap-4  ">
          <Card
            className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
            shadow="none"
          >
            <span className="absolute top-3 left-3 text-sm flex items-center gap-1">
              Avaiable
            </span>

            <h2 className="text-6xl font-bold">{availableTrucks}</h2>
          </Card>

          <Card
            className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
            shadow="none"
          >
            <span className="absolute top-3 left-3 text-sm flex items-center gap-1">
              Under Maintainance
            </span>

            <h2 className="text-6xl font-bold">{maintainanceTrucks}</h2>
          </Card>

          <Card
            className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
            shadow="none"
          >
            <span className="absolute top-3 left-3 text-sm flex items-center gap-1">
              On Hold
            </span>

            <h2 className="text-6xl font-bold">{onHoldTrucks}</h2>
          </Card>

          <Card
            className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
            shadow="none"
          >
            <span className="absolute top-3 left-3 text-sm flex items-center gap-1">
              Total Number
            </span>

            <h2 className="text-6xl font-bold">{trucks.length}</h2>
          </Card>
        </div>

        {navigation.state === "loading" ? (
          <div>
            <h1>Loading..</h1>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </main>
  );
}
