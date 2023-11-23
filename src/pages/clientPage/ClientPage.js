import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ClientScreen from '../clientComponents/ClientScreen.js';
import ClientSubtask from './tasksPage/subtaskComponents/SubtaskDescription.js';
import ClientTask from '../clientPage/taskComponents/TaskDescription.js';
export default function ClientPage() {
  return (
    <div>
      {/* <Routes>
        <Route path='/' element={<ClientScreen />}></Route>
        <Route path='/clientScreen' element={<ClientScreen />}></Route>
        <Route path={`/clientScreen/clientTask/:id`} element={<ClientTask />}></Route>
        <Route path='/clientSubtask' element={<ClientSubtask />}></Route>
      </Routes> */}
    </div>
  )
}
// {`clientTask/?id=${task.id}`}