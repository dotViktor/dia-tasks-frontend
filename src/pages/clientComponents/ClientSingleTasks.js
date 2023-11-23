import React from "react";
import './ClientSingleTask.css';
import { Route, Routes, Link } from "react-router-dom";
import ClientTasks from '../clientPage/taskComponents/TaskDescription';


const ClientSingleTask = ({ task }) => {

  return (
    <div className="task-box">
      
      <h3>{task.title}</h3>
        {task.isComplete == "1" ? 
        <div className="icon-container">
          <i className="fa-regular fa-circle-check"></i>
        </div> 
        : 
        <div className="icon-container">
          <i className="fa-regular fa-circle"></i>
        </div>}
    </div>
  );
};
export default ClientSingleTask;
