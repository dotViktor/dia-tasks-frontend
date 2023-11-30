import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPageComponent.js";
import RegistrationComponent from "../pages/registrationPage/RegistrationComponent.js";
import AdminScreen from "../pages/managerPage/ManagerPageComponent.js";
import CreateAddEditTasks from "../pages/managerPage/createAddEditTasksPage/CreateAddEditTasks.js";
import TaskManager from "../pages/managerPage/tasks/TasksManager.js";
import UsersManager from "../pages/managerPage/users/UsersManager.js";
import ClientScreen from "../pages/clientComponents/ClientScreen.js";
import ClientTasks from "../pages/clientPage/taskComponents/TaskDescription.js";
import ClientSubtasks from "../pages/clientPage/tasksPage/subtaskComponents/SubtaskDescription.js";
import RouteProtector from "./RouteProtector.js";

function RouteSettings() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationComponent />} />
        {/* --------------------------------------------------------------------------------- */}
        <Route element={<RouteProtector allowedRole={"admin"} />}>
          <Route path="/adminScreen/*" element={<AdminScreen />} />
          <Route
            path="/createAddEditTasks"
            element={<CreateAddEditTasks />}
          ></Route>
          <Route path="/tasksManager" element={<TaskManager />}></Route>
          <Route path="/usersManager" element={<UsersManager />}></Route>
        </Route>

        {/* --------------------------------------------------------------------------------- */}
        <Route element={<RouteProtector allowedRole={"client"} />}>
          <Route path="/clientScreen" element={<ClientScreen />} />
          <Route path="/clientTasks" element={<ClientTasks />} />
        </Route>

        <Route
          path={`/clientScreen/clientTask/:taskId`}
          element={<ClientTasks />}
        ></Route>
        <Route
          path={`/clientScreen/clientTask/:taskId/:subtaskId`}
          element={<ClientSubtasks />}
        ></Route>
        {/* /clientScreen/clientTask/z${task.id}/${subtask.id} */}
      </Routes>
    </div>
  );
}
export default RouteSettings;
