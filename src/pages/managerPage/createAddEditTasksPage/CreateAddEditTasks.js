import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreateAddEditTasks.css";
import SubtaskForm from "../componentsForAll/SubtaskForm";
import SubtaskEditForm from "../componentsForAll/SubtaskEditForm";
import Navbar from "../componentsForAll/Navbar.js";
import MainBgEffect from "../../login&RegistrationEffect/MainBgEffect";

import { axiosOutHeaders } from "../../../index.js";

const CreateAddEditTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState(null);

  //Assigned users component
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

  //Non-assigned users component
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

  //Subtask component
  const Subtask = ({ subtask, onSubtaskDelete }) => {
    const handleDeleteClick = (event) => {
      //Stop the event from spreading to the container, without this when clicking the X both onClick events would be executed
      event.stopPropagation();
      onSubtaskDelete(subtask);
    };

    return (
      <div className="user-manager-container">
        <h4>{subtask.title}</h4>
        {subtask.id &&
          (subtask.isComplete === 0 || subtask.isComplete === undefined) && (
            <span
              className="material-symbols-outlined"
              onClick={handleDeleteClick}
            >
              close
            </span>
          )}
      </div>
    );
  };

  const [users, setUsers] = useState([]);

  //For all users list
  useEffect(() => {
    axios
      .get("http://localhost:7777/users", axiosOutHeaders)
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

  const [subtaskData, setSubtaskData] = useState({
    newSubtasks: [],
    deletedSubtasks: [],
  });

  //Controls what happens when a subtask is clicked
  const handleSubtaskClick = (subtask) => {
    setEditingSubtask(subtask);
  };

  //Fetching tasks and subtasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskResponse, subtasksResponse] = await Promise.all([
          axios.get(`http://localhost:7777/tasks/${id}`, axiosOutHeaders),
          axios.get(`http://localhost:7777/tasks/${id}/subtasks`, axiosOutHeaders),
        ]);

        const task =
          Array.isArray(taskResponse.data) && taskResponse.data.length > 0
            ? taskResponse.data[0]
            : null;

        if (task && task.title) {
          setTaskData(task);
        } else {
          console.error("Invalid API response:", taskResponse.data);
        }

        setTaskData((prevTaskData) => ({
          ...prevTaskData,
          subtasks: subtasksResponse.data,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  //Changing input field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name.includes("Time") ? value + "Z" : value;

    setTaskData({
      ...taskData,
      [name]: updatedValue,
    });
  };

  //Assigning and unassigning users to/from a task
  const handleAssignUser = (user) => {
    if (!taskData.users.some((assignedUser) => assignedUser.id === user.id)) {
      const updatedUsers = [...taskData.users, user];
      setTaskData((prevTaskData) => ({ ...prevTaskData, users: updatedUsers }));
    }
  };

  const handleUnassignUser = (user) => {
    const updatedUsers = taskData.users.filter(
      (assignedUser) => assignedUser.id !== user.id
    );
    setTaskData((prevTaskData) => ({ ...prevTaskData, users: updatedUsers }));
  };

  //Console logs users array
  useEffect(() => {
    console.log("Updated taskData.users:", taskData.users);
  }, [taskData.users]);

  //Cancel task edit
  const handleCancel = () => {
    navigate(-1);
  };

  //Task delete
  const handleDelete = () => {
    const confirmed = window.confirm(
      "You are going to delete a task. Keep in mind that deleting this task will also delete all subtasks associated with it. This action cannot be undone. Are you sure you want to continue?"
    );
    if (id && confirmed) {
      axios
        .delete(`http://localhost:7777/tasks/${id}`, axiosOutHeaders)
        .then((response) => {
          console.log("Task deleted:", response.data);
          <Link path="/tasksManager" />;
        })
        .catch((error) => console.error("Delete task error:", error));
    }
  };

  //Subtask form show/hide
  const handleShowSubtaskForm = () => {
    setShowSubtaskForm(true);
  };

  const handleCloseSubtaskForm = () => {
    setShowSubtaskForm(false);
  };

  //Adds subtasks
  const handleAddSubtask = (subtask) => {
    const subtaskId = Date.now();

    setSubtaskData((prevSubtaskData) => ({
      ...prevSubtaskData,
      newSubtasks: [
        ...(prevSubtaskData.newSubtasks || []),
        { ...subtask, id: subtaskId },
      ],
    }));

    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      subtasks: [
        ...(prevTaskData.subtasks || []),
        { ...subtask, id: subtaskId },
      ],
    }));
  };

  //Subtasks delete
  const handleSubtaskDelete = (subtask) => {
    // Add the subtask id to deletedSubtasks
    setSubtaskData((prevSubtaskData) => ({
      ...prevSubtaskData,
      deletedSubtasks: [...(prevSubtaskData.deletedSubtasks || []), subtask.id],
    }));

    // Remove the subtask from the list of subtasks
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      subtasks: prevTaskData.subtasks.filter((task) => task.id !== subtask.id),
    }));

    // Remove the subtask from the newSubtasks list
    setSubtaskData((prevSubtaskData) => ({
      ...prevSubtaskData,
      newSubtasks: prevSubtaskData.newSubtasks.filter(
        (newSubtask) => newSubtask.id !== subtask.id
      ),
    }));
  };

  //Console logs subtasks array
  useEffect(() => {
    console.log("Updated taskData.subtasks:", taskData.subtasks);
  }, [taskData.subtasks]);
  useEffect(() => {
    console.log("Updated subtaskData.newSubtasks:", subtaskData.newSubtasks);
  }, [subtaskData.newSubtasks]);

  //Form/task submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", taskData);

    if (id) {
      //For updating tasks
      axios
        .put(`http://localhost:7777/tasks/${id}`, taskData, axiosOutHeaders)
        .then((response) => {
          console.log("Task updated:", response.data);

          //Subtasks array
          axios
            .put(
              `http://localhost:7777/tasks/${id}/update-subtasks`,
              subtaskData, axiosOutHeaders
            )
            .then((response) => {
              console.log("Subtasks created:", response.data);
              navigate(-1);
            })
            .catch((error) => console.error("Create task error:", error));
        })
        .catch((error) => console.error("Update task error:", error));
    } else {
      //For creating tasks
      axios
        .post("http://localhost:7777/tasks", taskData, axiosOutHeaders)
        .then((response) => {
          console.log("Task created:", response.data);
          navigate(-1);
        })
        .catch((error) => console.error("Create task error:", error));
    }
  };

  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <form onSubmit={handleSubmit} className="add-edit-tasks-form">
        <div className="form-data">
          <div className="col-1">
            <div className="task">
              <label>
                Task Name:
                <input
                  required
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Task Description:
                <textarea
                  required
                  name="description"
                  value={taskData.description || ""}
                  onChange={handleInputChange}
                />
              </label>
              <div className="task-datetime">
                <label>
                  Start Time:
                  <input
                    required
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
                  <input
                    required
                    type="datetime-local"
                    name="endTime"
                    value={
                      taskData.endTime ? taskData.endTime.slice(0, -1) : ""
                    }
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="subtasks">
              <h2>Subtasks</h2>
              <hr />
              <div className="subtasks-columns">
                <div className="subtasks-col-1">
                  <p>Active</p>
                  <div className="subtasks-scrollable-container">
                    {taskData.subtasks &&
                      taskData.subtasks
                        .filter(
                          (subtask) =>
                            subtask.isComplete !== 1 || !subtask.isComplete
                        )
                        .map((subtask) => (
                          <div
                            key={subtask.id}
                            onClick={() => handleSubtaskClick(subtask)}
                            className="clickable-subtasks"
                          >
                            <Subtask
                              subtask={subtask}
                              onSubtaskDelete={handleSubtaskDelete}
                            />
                          </div>
                        ))}
                  </div>
                </div>
                <div className="subtasks-col-2">
                  <p>Completed</p>
                  <div className="subtasks-scrollable-container">
                    {taskData.subtasks &&
                      taskData.subtasks
                        .filter((subtask) => subtask.isComplete === 1)
                        .map((subtask) => (
                          <div
                            key={subtask.id}
                            onClick={() => handleSubtaskClick(subtask)}
                            className="clickable-subtasks"
                          >
                            <Subtask
                              subtask={subtask}
                              onSubtaskDelete={handleSubtaskDelete}
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              <div className="add-subtasks-button">
                <button
                  className="custom-button"
                  type="button"
                  onClick={handleShowSubtaskForm}
                  id="add-subtask-button"
                >
                  <span></span>
                  Add a subtask
                </button>
              </div>
            </div>
          </div>
          <div className="col-2">
            <h2>Users</h2>
            <hr />
            <p id="assigned-users-paragraph">Assigned</p>
            <div className="assigned-users">
              {taskData.users.map((user) => (
                <AssignedUser
                  key={user.id}
                  user={user}
                  onUnassign={handleUnassignUser}
                />
              ))}
            </div>
            <p>Not assigned</p>
            <div className="wta-users">
              {users
                .filter(
                  (user) =>
                    user.role === "client" &&
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
        <div className="form-buttons">
          <button className="custom-button" type="submit">
            <span></span>
            {id ? "Update Task" : "Create Task"}
          </button>
          {id && (
            <button
              className="custom-button"
              type="delete"
              onClick={handleDelete}
            >
              <span></span>
              Delete Task
            </button>
          )}
          <button
            className="custom-button"
            type="button"
            onClick={handleCancel}
          >
            <span></span>
            Cancel
          </button>
        </div>
      </form>
      {editingSubtask && (
        <div className="modal-overlay">
          <SubtaskEditForm
            subtask={editingSubtask}
            onClose={() => setEditingSubtask(null)}
          />
        </div>
      )}
      {showSubtaskForm && (
        <div className="modal-overlay">
          <SubtaskForm
            taskParentID={Number(id)}
            onClose={handleCloseSubtaskForm}
            onAddSubtask={handleAddSubtask}
          />
        </div>
      )}
      <MainBgEffect/>
    </>
  );
};

export default CreateAddEditTasks;
