import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="task-container">
      <h3>{task.name}</h3>
    </div>
  );
};

export default Task;