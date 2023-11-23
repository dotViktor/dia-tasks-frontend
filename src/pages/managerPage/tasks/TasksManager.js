import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../componentsForAll/TasksInfo";
import { Link } from "react-router-dom";
import "./TasksManager.css";

const TasksManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/tasks")
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
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
      <Link to="/createAddEditTasks" className="custom-link">
        <button className="custom-button">Add</button>
      </Link>
    </div>
  );
};

export default TasksManager;
