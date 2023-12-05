import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Snowfall from "react-snowfall";

import { BrowserRouter } from 'react-router-dom';
import RouteSettings from './routes/RouteSettings.js';
import CreateAddEditTasks from './pages/managerPage/createAddEditTasksPage/CreateAddEditTasks.js';
import ManagerPageComponent from './pages/managerPage/ManagerPageComponent.js';
import LoginPage from './pages/loginPage/LoginPageComponent.js';
import RegistrationPage from './pages/registrationPage/RegistrationComponent.js';

const token = localStorage.getItem("userToken");

export const axiosOutHeaders = {
    headers: { Authorization: `Bearer ${token}` }
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <div className='route-div'>
            <RouteSettings />
            {/* <ClientPage/> */}
            {/* <LoginPage/> */}
            {/* <RegistrationPage/> */}
            {/* <ManagerPageComponent/>    */}
            {/* <CreateAddEditTasks/> */}
        </div>
    </BrowserRouter>
);
