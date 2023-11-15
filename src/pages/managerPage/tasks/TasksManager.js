import React from "react";
import Task from "../componentsForAll/TasksInfo";
import { Link } from "react-router-dom";
import "./TasksManager.css";

// Example user
const exampleTask = {
  id: 1,
  name: "Convert JPG's to PNG's.",
};
const exampleTask2 = {
  id: 2,
  name: "Write a 16-page essay about WW1.",
};
const exampleTask3 = {
  id: 3,
  name: "Make a compression algorithm.",
};

const UsersManager = () => {
  // List of tasks
  const tasks = [exampleTask, exampleTask2, exampleTask3];

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <Link
          key={task.id}
          to={`../createAddEditTasksPage/CreateAddEditTasks.js?id=${task.id}`}
          className="custom-link"
        >
          <Task task={task} />
        </Link>
      ))}
      <Link to="/CreateAddEditTasks" className="custom-link">
        <button className="custom-button">Add</button>
      </Link>
    </div>
  );
};

export default UsersManager;
