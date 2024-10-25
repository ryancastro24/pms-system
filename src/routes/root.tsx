import { Outlet, Link } from "react-router-dom";
import { TbBackhoe } from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useState } from "react";
export default function Root() {
	const [navlist, setNavlist] = useState("");
	return (
		<main className=" w-full h-full flex items-center">
			<div className="bg-[#f3efea] w-[300px]  h-full p-5">
				<div>
					<h1 className="py-2 px-3 rounded bg-[#dcd8d0] font-bold">
						Dashboard
					</h1>
				</div>
				<nav className="w-full py-5">
					<ul className={`w-full flex flex-col items-start gap-6`}>
						<li
							onClick={() => setNavlist("trucks")}
							className={`w-full ${
								navlist == "trucks" ? "bg-[#8f5c54] text-white" : ""
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
							className={`w-full ${
								navlist == "mechanics" ? "bg-[#8f5c54] text-white" : ""
							} p-2 rounded`}
						>
							<Link className="flex items-center gap-2 w-full" to={`mechanics`}>
								<span className="text-md">
									<HiOutlineWrenchScrewdriver />
								</span>{" "}
								<span className="">Mechanics List</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="w-full h-full p-10">
				<div className="grid grid-cols-4 gap-4  ">
					<Card
						className="w-full h-[150px] rounded bg-[#8f5c54]"
						shadow="none"
					></Card>

					<Card
						className="w-full h-[150px] rounded bg-[#8f5c54]"
						shadow="none"
					></Card>

					<Card
						className="w-full h-[150px] rounded bg-[#8f5c54]"
						shadow="none"
					></Card>

					<Card
						className="w-full h-[150px] rounded bg-[#8f5c54]"
						shadow="none"
					></Card>
				</div>

				<Outlet />
			</div>
		</main>
	);
}
