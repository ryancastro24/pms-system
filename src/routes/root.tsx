import { Outlet, Link } from "react-router-dom";
import { TbBackhoe } from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
export default function Root() {
  return (
    <main className=" w-full h-full flex items-center">
      <div className="bg-[#f3efea] w-[300px] h-full p-5">
        <div>
          <h1 className="py-2 px-3 rounded bg-[#dcd8d0] font-bold">
            Dashboard
          </h1>
        </div>
        <nav className="w-full py-5">
          <ul className="w-full flex flex-col items-start gap-6">
            <li className="w-full">
              <Link className="flex items-center gap-2 w-full" to={`trucks`}>
                <span className="text-xl">
                  <TbBackhoe />
                </span>{" "}
                <span className="">Trucks List</span>
              </Link>
            </li>
            <li className="w-full">
              <Link className="flex items-center gap-2 w-full" to={`trucks`}>
                <span className="text-md">
                  <HiOutlineWrenchScrewdriver />
                </span>{" "}
                <span className="">Mecchanics List</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full h-full p-10">
        <Outlet />
      </div>
    </main>
  );
}
