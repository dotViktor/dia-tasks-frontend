import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import "../users/UsersManager.css";

const UsersForm = ({ userId, onClose, onRefreshData }) => {
  const [userData, setUserData] = useState(null);
  const [userTasks, setUserTasks] = useState([]);

  //*User Component
  const User = ({ user }) => {
    //*Image initials
    const initials = user.name
      .split(" ")
      .filter(
        (word, index) =>
          index === 0 || index === user.name.split(" ").length - 1
      )
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    const imageClasses = classnames("user-image", {
      "user-image-smaller-initials": initials.length === 2,
    });

    return (
      <div className="user-information-component" key={user.id}>
        <div>
          <span className={imageClasses}>{initials}</span>
        </div>
        <div>
          <strong>Name:</strong> {user.name}
          <br />
          <strong>Email:</strong> {user.email}
          <br />
          <strong>Role:</strong> {user.role}
        </div>
        <div>
          {user.role === "client" && (
            <button className="custom-button" onClick={handlePromoteToAdmin}>
              <span></span>Promote to Admin
            </button>
          )}
        </div>
      </div>
    );
  };

  //*Task component
  const Task = ({ task }) => {
    return (
      <div className="user-tasks-component" key={task.id}>
        <strong>Title:</strong> {task.title}
        <br />
        <strong>Description:</strong> {task.description}
        <br />
        <strong>Start Time:</strong> {task.startTime}
        <br />
        <strong>End Time:</strong> {task.endTime}
        <hr />
      </div>
    );
  };

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
        console.log(userData);

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
          <h2>
            User Information: <strong>{userData.name}</strong>
          </h2>
          <User user={userData} />
          {userData.role === "client" && (
            <>
              <h2>Tasks</h2>
              <div className="user-tasks-list">
                {userTasks.length > 0 ? (
                  userTasks.map((task) => <Task key={task.id} task={task} />)
                ) : (
                  <p>There aren't any tasks assigned to this user yet.</p>
                )}
              </div>
            </>
          )}
          <div className="users-form-buttons">
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
