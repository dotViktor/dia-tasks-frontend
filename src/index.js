import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import RouteSettings from './routes/RouteSettings.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <RouteSettings/> 
        {/* <LoginPage/> */}
      {/* <ManagerPageComponent/> */}
    </BrowserRouter>
);
