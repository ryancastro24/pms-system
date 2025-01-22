import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./components/ThemeProvider";
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
import DashboardStartingPage, {
  loader as startinPageLoader,
  action as staringPageAction,
} from "./components/DashboardStartingPage";
import MechanicsComponent, {
  loader as mechanicsLoader,
  action as mechanicsAction,
} from "./pages/MechanicsComponent";
import SettingsComponent from "./pages/SettingsComponent";
import EditProfileComponent, {
  action as editProfileAction,
  loader as editProfileLoader,
} from "./pages/EditProfileComponent";
import { action as destroyMaintainance } from "./routes/destroyMaintainance";
import LastMaintainancePage, {
  loader as LastMaintainancePageLoader,
} from "./pages/LastMaintainancePage";
import { isAuthenticated } from "./utils/auth"; // Import the auth check function
import { action as destroyAction } from "./routes/destroy";
import { action as destroyActionTruck } from "./routes/detroyTrucks";
import IssuesComponent, {
  loader as issuesLoader,
  action as issuesAction,
} from "./pages/IssuesComponent";
import AnalyticsComponent, {
  loader as analyticsLoader,
} from "./pages/AnalyticsComponent";
import ListOfMaintenance, {
  loader as ListOfMaintenanceLoader,
} from "./pages/ListOfMaintenance";
import TruckIssue, { loader as truckIssueLoader } from "./pages/TruckIssue";
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
        path: "/dashboard",
        element: <DashboardStartingPage />,
        loader: startinPageLoader,
        action: staringPageAction,
        children: [
          {
            path: ":maintainanceId/destroy",
            action: destroyMaintainance,
          },
        ],
      },

      {
        path: "trucks",
        element: <TrucksComponent />,
        action: trucksAction,
        loader: trucksLoader,
        children: [
          {
            path: ":truckId/destroy",
            action: destroyActionTruck,
          },
        ],
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
        path: "analytics",
        element: <AnalyticsComponent />,
        loader: analyticsLoader,
      },

      {
        path: "editProfile",
        element: <EditProfileComponent />,
        action: editProfileAction,
        loader: editProfileLoader,
      },
      {
        path: "settings",
        element: <SettingsComponent />,
      },
      {
        path: "issues",
        element: <IssuesComponent />,
        loader: issuesLoader,
        action: issuesAction,
      },
    ],
  },
  {
    path: "lastmaintainance/:truckId",
    element: <LastMaintainancePage />,
    loader: LastMaintainancePageLoader,
  },

  {
    path: "truckissue/:id",
    element: <TruckIssue />,
    loader: truckIssueLoader,
  },

  {
    path: "listOfMaintenance/:truckId",
    element: <ListOfMaintenance />,
    loader: ListOfMaintenanceLoader,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="w-full h-[100vh] dark:bg-[#434343]">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </NextUIProvider>
  </StrictMode>
);
