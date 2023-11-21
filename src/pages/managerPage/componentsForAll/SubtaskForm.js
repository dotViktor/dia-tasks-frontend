// SubtaskForm.js
import React, { useState } from "react";
import "../createAddEditTasksPage/CreateAddEditTasks.css";

const SubtaskForm = ({ onClose }) => {
  return (
    <div className="subtask-form">
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SubtaskForm;
