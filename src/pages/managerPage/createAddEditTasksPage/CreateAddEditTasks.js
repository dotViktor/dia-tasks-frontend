import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateAddEditTasks.css";

const CreateAddEditTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    subtasks: [],
    users: [],
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:7777/tasks/${id}`)
        .then((response) => {
          const task =
            Array.isArray(response.data) && response.data.length > 0
              ? response.data[0]
              : null;

          console.log("users:", task?.users);

          if (task && task.title) {
            setTaskData(task);
          } else {
            console.error("Invalid API response:", response.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name.includes("Time") ? value + "Z" : value;

    setTaskData({
      ...taskData,
      [name]: updatedValue,
    });
  };

  const handleCancel = () => {
    // Goes back to the previous page when the "Cancel" button is clicked
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", taskData);
    // Add logic to submit the data or update the task
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
                  value={taskData.title}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Task Description:
                <br />
                <input
                  type="text"
                  name="description"
                  value={taskData.description || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Start Time:
                <br />
                <input
                  type="datetime-local"
                  name="startTime"
                  value={
                    taskData.startTime ? taskData.startTime.slice(0, -1) : ""
                  }
                  onChange={handleInputChange}
                />
              </label>
              <label>
                End Time:
                <br />
                <input
                  type="datetime-local"
                  name="endTime"
                  value={
                    taskData.startTime ? taskData.startTime.slice(0, -1) : ""
                  }
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
          <button type="submit">{id ? "Update Task" : "Create Task"}</button>
          {id && <button type="delete">Delete Task</button>}
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateAddEditTasks;
