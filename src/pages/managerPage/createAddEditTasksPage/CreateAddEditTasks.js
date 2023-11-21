import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreateAddEditTasks.css";
import SubtaskForm from "../componentsForAll/SubtaskForm";

const CreateAddEditTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);

  const AssignedUser = ({ user, onUnassign }) => {
    return (
      <div className="user-manager-container">
        <h4>{user.name}</h4>
        <span
          className="material-symbols-outlined"
          onClick={() => onUnassign(user)}
        >
          close
        </span>
      </div>
    );
  };

  const WTAUser = ({ user, onAssign }) => {
    return (
      <div className="user-manager-container">
        <h4>{user.name}</h4>
        <span
          className="material-symbols-outlined"
          onClick={() => onAssign(user)}
        >
          add
        </span>
      </div>
    );
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7777/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error(err));
  }, []);

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

  const handleAssignUser = (user) => {
    if (!taskData.users.some((assignedUser) => assignedUser.id === user.id)) {
      const updatedUsers = [...taskData.users, user];
      setTaskData((prevTaskData) => ({ ...prevTaskData, users: updatedUsers }));
    }
  };

  useEffect(() => {
    console.log("Updated taskData.users:", taskData.users);
  }, [taskData.users]);

  const handleUnassignUser = (user) => {
    const updatedUsers = taskData.users.filter(
      (assignedUser) => assignedUser.id !== user.id
    );
    setTaskData((prevTaskData) => ({ ...prevTaskData, users: updatedUsers }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    if (id) {
      axios
        .delete(`http://localhost:7777/tasks/${id}`)
        .then((response) => {
          console.log("Task deleted:", response.data);
          <Link path="/tasksManager" />;
        })
        .catch((error) => console.error("Delete task error:", error));
    }
  };

  const handleShowSubtaskForm = () => {
    setShowSubtaskForm(true);
  };

  const handleCloseSubtaskForm = () => {
    setShowSubtaskForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", taskData);

    if (id) {
      // If there is an ID, it means you are updating an existing task
      axios
        .put(`http://localhost:7777/tasks/${id}`, taskData)
        .then((response) => {
          console.log("Task updated:", response.data);
          // Add logic to handle the response, if needed
          navigate(-1);
        })
        .catch((error) => console.error("Update task error:", error));
    } else {
      // If there is no ID, it means you are creating a new task
      axios
        .post("http://localhost:7777/tasks", taskData)
        .then((response) => {
          console.log("Task created:", response.data);
          // Add logic to handle the response, if needed
          navigate(-1);
        })
        .catch((error) => console.error("Create task error:", error));
    }
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
                  name="title"
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
                  value={taskData.endTime ? taskData.endTime.slice(0, -1) : ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <hr></hr>
            <div className="subtasks">
              <h2>Subtasks</h2>
              {/* <ul className="subtasks-list">
                {taskData.subtasks.map((subtask) => (
                  <li key={subtask.id}>{subtask.name}</li>
                ))}
              </ul> */}
              <button type="button" onClick={handleShowSubtaskForm}>
                Add a subtask
              </button>
            </div>
          </div>
          <hr></hr>
          <div className="col-2">
            <div className="assigned-users">
              <h2>Assigned users</h2>
              {taskData.users.map((user) => (
                <AssignedUser
                  key={user.id}
                  user={user}
                  onUnassign={handleUnassignUser}
                />
              ))}
              <h2>Waiting to be assigned</h2>
              <div className="users-without-tasks-list">
                {users
                  .filter(
                    (user) =>
                      !taskData.users.some(
                        (assignedUser) => assignedUser.id === user.id
                      )
                  )
                  .map((user) => (
                    <WTAUser
                      key={user.id}
                      user={user}
                      onAssign={handleAssignUser}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit">{id ? "Update Task" : "Create Task"}</button>
          {id && (
            <button type="delete" onClick={handleDelete}>
              Delete Task
            </button>
          )}
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      {showSubtaskForm && (
        <div className="modal-overlay">
          <SubtaskForm onClose={handleCloseSubtaskForm} />
        </div>
      )}
    </>
  );
};

export default CreateAddEditTasks;
