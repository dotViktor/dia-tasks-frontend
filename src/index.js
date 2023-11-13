import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ManagerPageComponent from "./pages/managerPage/ManagerPageComponent.js";
import LoginPage from './pages/loginPage/LoginPage.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginPage/>
      {/* <ManagerPageComponent/> */}
    </BrowserRouter>
  </React.StrictMode>
);
