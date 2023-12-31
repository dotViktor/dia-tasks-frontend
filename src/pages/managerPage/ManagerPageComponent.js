import React from "react";
import "../managerPage/ManagerPageComponent.css";
import Navbar from "./componentsForAll/Navbar.js";
import { Routes, Route } from "react-router-dom";
import TaskManager from "./tasks/TasksManager.js";
import UsersManager from "./users/UsersManager.js";
import AdminScreen from "../managerComponents/AdminScreen.js";
import CreateAddEditTasks from "./createAddEditTasksPage/CreateAddEditTasks.js";

export default function ManagerPageComponent() {
  return (
    <div className="App">
      <Routes>
        <Route path="/createAddEditTasks" element={<CreateAddEditTasks />} />
        <Route path="/adminScreen" element={<AdminScreen />} />
        <Route path="/" element={<AdminScreen />} />
        <Route path="/tasksManager" element={<TaskManager />} />
        <Route path="/usersManager" element={<UsersManager />} />
      </Routes>
    </div>
  );
}
