import React from "react";
import Task from "../componentsForAll/TasksInfo";
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

const UsersManager = () => {
  // List of tasks
  const tasks = [exampleTask, exampleTask2];

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <button id="add-task-bt">Add</button>
    </div>
  );
};

export default UsersManager;
