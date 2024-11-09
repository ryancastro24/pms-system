import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Root, { loader as dashboardLoader } from "./routes/root";
import LandingPage from "./routes/LandingPage";
import ErrorPage from "./error-page";
import { action as loginAction } from "./components/LoginForm";
import TrucksComponent, {
  action as trucksAction,
  loader as trucksLoader,
} from "./pages/TrucksComponent";
import DashboardStartingPage from "./components/DashboardStartingPage";
import MechanicsComponent, {
  loader as mechanicsLoader,
  action as mechanicsAction,
} from "./pages/MechanicsComponent";
import SettingsComponent from "./pages/SettingsComponent";
import EditProfileComponent, {
  action as editProfileAction,
} from "./pages/EditProfileComponent";

import LastMaintainancePage, {
  loader as lastmaintainanceLoader,
} from "./pages/LastMaintainancePage";
import { isAuthenticated } from "./utils/auth"; // Import the auth check function
import { action as destroyAction } from "./routes/destroy";
// Loader to protect /dashboard route

// Loader to protect /landing page route
const landingPageLoader = () => {
  if (isAuthenticated()) {
    return redirect("/dashboard"); // Redirect to dashboard if already logged in
  }
  return null; // Proceed if not authenticated
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    action: loginAction,
    loader: landingPageLoader, // Apply the loader to protect landing page
  },
  {
    path: "/dashboard",
    element: <Root />,
    loader: dashboardLoader, // Apply the loader to check authentication
    children: [
      {
        index: true,
        element: <DashboardStartingPage />,
      },
      {
        path: "trucks",
        element: <TrucksComponent />,
        action: trucksAction,
        loader: trucksLoader,
      },

      {
        path: "mechanics",
        element: <MechanicsComponent />,
        loader: mechanicsLoader,
        action: mechanicsAction,
        errorElement: (
          <div>
            <h1>Oops, there was an error! </h1>
          </div>
        ),
        children: [
          {
            path: ":userId/destroy",
            action: destroyAction,
          },
        ],
      },
      {
        path: "editProfile",
        element: <EditProfileComponent />,
        action: editProfileAction,
      },
      {
        path: "settings",
        element: <SettingsComponent />,
      },
    ],
  },
  {
    path: "lastmaintainance/:maintainanceId",
    element: <LastMaintainancePage />,
    loader: lastmaintainanceLoader,
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
