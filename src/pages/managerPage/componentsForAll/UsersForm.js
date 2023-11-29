// UsersForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../users/UsersManager.css";

const UsersForm = ({ userId, onClose }) => {
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

  const handleDeleteUser = () => {
    const confirmed = window.confirm(
      "Are absolutely sure you want to delete this user? Keep in mind that deleting him will also remove him from all tasks."
    );
    if (userId && confirmed) {
      axios
        .delete(`http://localhost:7777/users/${userId}`)
        .then(() => {
          console.log("User deleted");
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
          <div className="form-buttons">
            <button onClick={handleDeleteUser}>Delete User</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersForm;
