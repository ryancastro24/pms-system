import { Outlet, Link, useNavigation, useNavigate } from "react-router-dom";
import { TbBackhoe } from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { Card } from "@nextui-org/card";
import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { TbLogout } from "react-icons/tb";
import { User } from "@nextui-org/user";
import { isAuthenticated } from "../utils/auth";
import { redirect, useLoaderData } from "react-router-dom";
import { getAllTrucksData } from "../backend/trucksData";
import { IoAnalyticsSharp } from "react-icons/io5";
import ThemeButton from "@/components/ThemButton";
import LoadingComponent from "@/components/LoadingComponent";
import { MdOutlineErrorOutline } from "react-icons/md";

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
  const navigate = useNavigate();

  const { userObj, trucks } = useLoaderData() as any;

  // Ensure trucks is always an array
  const availableTrucks = Array.isArray(trucks)
    ? trucks.filter((val: any) => val.status === "Available").length
    : 0;
  const maintainanceTrucks = Array.isArray(trucks)
    ? trucks.filter((val: any) => val.status === "Maintainance").length
    : 0;
  const onHoldTrucks = Array.isArray(trucks)
    ? trucks.filter((val: any) => val.status === "On Hold").length
    : 0;

  // Ensure loaderData is not null before destructuring
  if (!userObj) {
    return <div>Loading...</div>; // Or handle the case when there's no data
  }

  function logout() {
    // Remove auth token and user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  }

  // Now destructure the properties from loaderData
  return (
    <main className=" w-full h-full flex items-center fixed">
      <div className="bg-[#f3efea] dark:bg-[#27272A] w-[300px]  h-full p-5">
        <div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start gap-3 mb-8">
              <User
                name={userObj?.name}
                description={userObj?.position}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <ThemeButton />
            </div>
            <h1
              onClick={() => setNavlist("dashboard")}
              className="py-2 px-3 rounded bg-[#dcd8d0] font-bold"
            >
              <Link to={"/dashboard"}>Dashboard</Link>
            </h1>
          </div>
          <nav className="w-full py-5">
            <ul className={`w-full flex flex-col items-start gap-3`}>
              <li
                onClick={() => setNavlist("trucks")}
                className={`w-full  ${
                  navlist == "trucks"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0] dark:hover:text-black dark:text-white"
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
                    : "hover:bg-[#dcd8d0] dark:hover:text-black dark:text-white"
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
              <li
                onClick={() => setNavlist("analytics")}
                className={`w-full  ${
                  navlist == "analytics"
                    ? "bg-[#8f5c54] text-white "
                    : "hover:bg-[#dcd8d0] dark:hover:text-black  dark:text-white"
                } p-2 rounded`}
              >
                <Link
                  className="flex items-center gap-2 w-full"
                  to={`analytics`}
                >
                  <span className="text-xl">
                    <IoAnalyticsSharp />
                  </span>{" "}
                  <span className="">Analytics</span>
                </Link>
              </li>

              <li
                onClick={() => setNavlist("issues")}
                className={`w-full  ${
                  navlist == "issues"
                    ? "bg-[#8f5c54] text-white "
                    : "hover:bg-[#dcd8d0] dark:hover:text-black  dark:text-white"
                } p-2 rounded`}
              >
                <Link className="flex items-center gap-2 w-full" to={`issues`}>
                  <span className="text-xl">
                    <MdOutlineErrorOutline />
                  </span>{" "}
                  <span className="">Issues</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-5">
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
                    : "hover:bg-[#dcd8d0] dark:hover:text-black dark:text-white"
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
                onClick={logout}
                className={`w-full flex items-center gap-2 cursor-pointer ${
                  navlist == "logout"
                    ? "bg-[#8f5c54] text-white"
                    : "hover:bg-[#dcd8d0] dark:hover:text-black dark:text-white"
                } p-2 rounded`}
              >
                <span className="text-md">
                  <TbLogout />
                </span>{" "}
                <span className="">Logout</span>
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
              Available
            </span>
            <h2 className="text-6xl font-bold">{availableTrucks}</h2>
          </Card>

          <Card
            className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
            shadow="none"
          >
            <span className="absolute top-3 left-3 text-sm flex items-center gap-1">
              Under Maintenance
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

        {navigation.state === "loading" ? <LoadingComponent /> : <Outlet />}
      </div>
    </main>
  );
}
