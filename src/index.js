import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteSettings from "./routes/RouteSettings";
import UsersManager from "./pages/managerPage/users/UsersManager";
import TasksManager from "./pages/managerPage/tasks/TasksManager";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersManager />,
    /*element: <TasksManager />,*/
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
