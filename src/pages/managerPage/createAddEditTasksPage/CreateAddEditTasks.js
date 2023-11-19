import React, { useState } from "react";
import "./CreateAddEditTasks.css";

const CreateAddEditTasks = () => {
  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
    startTime: "",
    endTime: "",
    subtasks: [],
    assignedUsers: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      //Here we have to create a post request to the backend
    console.log("Submitted Data:", taskData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="col-1">
          <div className="task">
            <label>
              Task Name:
              <input
                type="text"
                name="taskName"
                value={taskData.taskName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Task Description:
              <input
                type="text"
                name="taskDescription"
                value={taskData.taskName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Start Time:
              <input
                type="date"
                name="startTime"
                value={taskData.startTime}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Time:
              <input
                type="date"
                name="endTime"
                value={taskData.startTime}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="subtasks">
            <h2>Subtasks</h2>
            <button>Add a subtask</button>
          </div>
        </div>
        <div className="col-2">
          <div className="assigned-users">
            <h2>Assigned users</h2>
            <button>Add a user</button>
          </div>
        </div>
        <button type="submit">Create Task</button>
        <button type="delete">Delete Task</button>
      </form>
    </>
  );
};

export default CreateAddEditTasks;
