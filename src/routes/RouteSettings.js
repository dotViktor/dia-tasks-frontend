import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginPage from "../pages/loginPage/LoginPageComponent.js";
import RegistrationComponent from "../pages/registrationPage/RegistrationComponent.js";
import ManagerPageComponent from '../pages/managerComponents/AdminScreen.js';
import ClientScreen from '../pages/clientComponents/ClientScreen.js';

function RouteSettings() {
    return (
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/manager" element={<ManagerPageComponent />} />
            <Route path="/register" element={<RegistrationComponent />} />
            <Route path="/client" element={<ClientScreen />} />
        </Routes>
    );
}
export default RouteSettings;

