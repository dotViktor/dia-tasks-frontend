// SubtaskForm.js
import React, { useState } from "react";
import "../createAddEditTasksPage/CreateAddEditTasks.css";

const SubtaskForm = ({ onClose }) => {
  // Your subtask form logic goes here

  return (
    <div className="subtask-form">
      {/* Your subtask form UI goes here */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SubtaskForm;
