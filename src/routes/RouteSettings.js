import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPageComponent.js";
import RegistrationComponent from "../pages/registrationPage/RegistrationComponent.js";
import ManagerPageComponent from "../pages/managerComponents/AdminScreen.js";
import ClientTasks from "../pages/clientComponents/ClientTasks.js";

function RouteSettings() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/manager" element={<ManagerPageComponent />} />
      <Route path="/register" element={<RegistrationComponent />} />
      <Route path="/client" element={<ClientTasks />} />
    </Routes>
  );
}
export default RouteSettings;
