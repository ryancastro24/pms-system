import { Outlet, Link } from "react-router-dom";
import { TbBackhoe } from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { SlSettings } from "react-icons/sl";
import { TbLogout } from "react-icons/tb";
import { User } from "@nextui-org/user";

export default function Root() {
	const [navlist, setNavlist] = useState("");
	return (
		<main className=" w-full h-full flex items-center fixed">
			<div className="bg-[#f3efea] w-[300px]  h-full p-5">
				<div>
					<div className="flex flex-col gap-5 w-full">
						<User
							name="Jane Doe"
							description="Product Designer"
							avatarProps={{
								src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
							}}
						/>
						<h1 className="py-2 px-3 rounded bg-[#dcd8d0] font-bold">
							Dashboard
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

						<h2 className="text-6xl font-bold">120</h2>
					</Card>

					<Card
						className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
						shadow="none"
					>
						<span className="absolute top-3 left-3 text-sm flex items-center gap-1">
							Under Maintainance
						</span>

						<h2 className="text-6xl font-bold">10</h2>
					</Card>

					<Card
						className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
						shadow="none"
					>
						<span className="absolute top-3 left-3 text-sm flex items-center gap-1">
							On Hold
						</span>

						<h2 className="text-6xl font-bold">32</h2>
					</Card>

					<Card
						className="w-full h-[150px] flex items-center text-white justify-center relative p-2 rounded bg-[#8f5c54]"
						shadow="none"
					>
						<span className="absolute top-3 left-3 text-sm flex items-center gap-1">
							Total Number
						</span>

						<h2 className="text-6xl font-bold">152</h2>
					</Card>
				</div>

				<Outlet />
			</div>
		</main>
	);
}
