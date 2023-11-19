import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import RouteSettings from './routes/RouteSettings.js';
import CreateAddEditTasks from './pages/managerPage/createAddEditTasksPage/CreateAddEditTasks.js';
import ManagerPageComponent from './pages/managerPage/ManagerPageComponent.js';
import LoginPage from './pages/loginPage/LoginPageComponent.js';
import RegistrationPage from './pages/registrationPage/RegistrationComponent.js';
import ClientPage from './pages/clientPage/ClientPage.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/* <RouteSettings/> */}
        <ClientPage/>
        {/* <LoginPage/> */}
        {/* <RegistrationPage/> */}
        {/* <ManagerPageComponent/>    */}
      {/* <CreateAddEditTasks/> */}
    </BrowserRouter>
);
