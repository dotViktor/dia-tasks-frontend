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
    console.log("Submitted Data:", taskData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-data">
          <div className="col-1">
            <div className="task">
              <label>
                Task Name:
                <br />
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
                <br />
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
                <br />
                <input
                  type="date"
                  name="startTime"
                  value={taskData.startTime}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                End Time:
                <br />
                <input
                  type="date"
                  name="endTime"
                  value={taskData.startTime}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <hr></hr>
            <div className="subtasks">
              <h2>Subtasks</h2>
              <button>Add a subtask</button>
            </div>
          </div>
          <hr></hr>
          <div className="col-2">
            <div className="assigned-users">
              <h2>Assigned users</h2>
              <button>Add a user</button>
            </div>
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit">Create Task</button>
          <button type="delete">Delete Task</button>
        </div>
      </form>
    </>
  );
};

export default CreateAddEditTasks;
