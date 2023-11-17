import React from 'react'
import {  Routes, Route } from 'react-router-dom';
import NavbarClients from '../clientPage/navbarClients/NavbarClients.js';
import ClientScreen from '../clientComponents/ClientScreen.js';
import ClientTask from './taskComponents/TaskDescription.js';
import ClientSubtask from './tasksPage/subtaskComponents/SubtaskDescription.js';


export default function ClientPage() {
  return (
    <div>
        <NavbarClients/>
        <Routes>
            <Route path='/' element={<ClientScreen/>}></Route>
            <Route path='/clientScreen' element={<ClientScreen/>}></Route>
            <Route path='/clientTask' element={<ClientTask/>}></Route>
            <Route path='/clientSubtask' element={<ClientSubtask/>}></Route>
        </Routes>
    </div>
  )
}