import React from "react";
import "../../managerComponents/AdminScreen.css";

const TaskElement = ({ task }) => {
  //User container
  const User = ({ user }) => {
    const initials = user.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return (
      <div className="user-tasks-container">
        <span className="user-tasks-image">{initials}</span>
        <div className="user-tasks-details">
          <h6>{user.name}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className="task-element">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-user-list">
        {task.users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default TaskElement;
