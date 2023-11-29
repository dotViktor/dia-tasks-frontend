// UsersForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../users/UsersManager.css";

const UsersForm = ({ userId, onClose, onRefreshData }) => {
  const [userData, setUserData] = useState(null);
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(
          `http://localhost:7777/users/${userId}`
        );

        // Access the first element if the response is an array
        const userData = Array.isArray(userResponse.data)
          ? userResponse.data[0]
          : userResponse.data;

        setUserData(userData);

        // Fetch all tasks
        const tasksResponse = await axios.get("http://localhost:7777/tasks");

        // Filter tasks based on the user ID
        const tasks = tasksResponse.data.filter((task) =>
          task.users.some((user) => user.id === userId)
        );

        setUserTasks(tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  //Changing user role to "admin" (turning a client into a manager)
  const handlePromoteToAdmin = () => {
    const confirmed = window.confirm(
      `Are you sure you want to promote ${userData.name} to a manager? This action will remove him from all tasks he is currently apart of, but will give him full access to all tasks.`
    );
    if (userId && confirmed) {
      axios
        .get(`http://localhost:7777/users/${userId}/make-admin`)
        .then(() => {
          console.log("User role updated to admin");
          onRefreshData();
          onClose();
        })
        .catch((error) => console.error("Update user role error:", error));
    }
  };

  //Deleting a user
  const handleDeleteUser = () => {
    const confirmed = window.confirm(
      "Are absolutely sure you want to delete this user? Keep in mind that deleting him will also remove him from all tasks."
    );
    if (userId && confirmed) {
      axios
        .delete(`http://localhost:7777/users/${userId}`)
        .then(() => {
          console.log("User deleted");
          onRefreshData();
          onClose();
        })
        .catch((error) => console.error("Delete user error:", error));
    }
  };

  return (
    <div className="user-form">
      {userData && (
        <>
          <h2>User Information</h2>
          <div key={userData.id}>
            <strong>Name:</strong> {userData.name}
            <br />
            <strong>Email:</strong> {userData.email}
            <br />
            <strong>Role:</strong> {userData.role}
          </div>
          {userData.role === "client" && <h2>Tasks</h2>}
          <ul>
            {userTasks.map((task) => (
              <li key={task.id}>
                <strong>Title:</strong> {task.title}
                <br />
                <strong>Description:</strong> {task.description}
                <br />
                <strong>Start Time:</strong> {task.startTime}
                <br />
                <strong>End Time:</strong> {task.endTime}
                <hr />
              </li>
            ))}
          </ul>
          <div>
            {userData.role === "client" && (
              <button className="custom-button" onClick={handlePromoteToAdmin}>
                <span></span>Promote to Admin
              </button>
            )}
            <button className="custom-button" onClick={handleDeleteUser}>
              <span></span>Delete User
            </button>
            <button className="custom-button" onClick={onClose}>
              <span></span>Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersForm;
