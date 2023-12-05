import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../componentsForAll/TasksInfo";
import { Link } from "react-router-dom";
import "./TasksManager.css";
import Navbar from "../componentsForAll/Navbar";
import { axiosOutHeaders } from "../../..";

const TasksManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/tasks", axiosOutHeaders)
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="task-list-headline">
          <h1>Tasks</h1>
        </div>
        <div className="reusable-container">
          <div className="tasks-list">
            {tasks.map((task) => (
              <Link
                key={task.id}
                to={`/createAddEditTasks?id=${task.id}`}
                className="custom-link"
              >
                <Task task={task} />
              </Link>
            ))}
            <div className="add-task-button">
              <Link to="/createAddEditTasks" className="custom-link">
                <button className="custom-button">
                  <span></span>Add
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksManager;
