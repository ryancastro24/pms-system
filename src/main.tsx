import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import LandingPage from "./routes/LandingPage";
import ErrorPage from "./error-page";
import TrucksComponent from "./pages/TrucksComponent";
import MechanicsComponent from "./pages/MechanicsComponent";
import SettingsComponent from "./pages/SettingsComponent";
import EditProfileComponent from "./pages/EditProfileComponent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "trucks",
        element: <TrucksComponent />,
      },

      {
        path: "mechanics",
        element: <MechanicsComponent />,
      },
      {
        path: "editProfile",
        element: <EditProfileComponent />,
      },
      {
        path: "settings",
        element: <SettingsComponent />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <div className="w-full h-[100vh] ">
        <RouterProvider router={router} />
      </div>
    </NextUIProvider>
  </StrictMode>
);
