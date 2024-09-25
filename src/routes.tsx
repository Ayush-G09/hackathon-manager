import { createBrowserRouter } from "react-router-dom";
import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";
import Hackathon from "./views/Hackathon";
import HackathonDetails from "./views/HackathonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: "create",
        element: <Hackathon />,
      },
      {
        path: "view/:hackathonId",
        element: <HackathonDetails />,
      },
      {
        path: "edit/:hackathonId",
        element: <Hackathon />,
      },
    ],
  },
]);
