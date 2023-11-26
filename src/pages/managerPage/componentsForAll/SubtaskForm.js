import React, { useState } from "react";
import "../createAddEditTasksPage/CreateAddEditTasks.css";

const SubtaskForm = ({ taskParentID, onClose, onAddSubtask }) => {
  const [subtaskData, setSubtaskData] = useState({
    TaskParentID: taskParentID,
    title: "",
    description: "",
    requiredImages: 0,
    requiredNotes: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Converting value to a number if the name is "requiredNotes" or "requiredImages"
    const updatedValue =
      name === "requiredNotes" || name === "requiredImages"
        ? Number(value)
        : value;

    setSubtaskData({
      ...subtaskData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure at least one note is required
    const requiredNotes =
      subtaskData.requiredNotes < 1 ? 1 : subtaskData.requiredNotes;

    const subtaskWithId = {
      ...subtaskData,
      TaskParentID: taskParentID,
      requiredNotes: requiredNotes,
    };

    onAddSubtask(subtaskWithId);
    onClose();
  };

  return (
    <div className="subtask-form">
      <h2>Add Subtask</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Subtask Name:
          <input
            type="text"
            name="title"
            value={subtaskData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Subtask Description:
          <textarea
            name="description"
            value={subtaskData.description}
            onChange={handleInputChange}
          />
        </label>
        <div className="subtask-form-number-fields">
          <label>
            Number of Images:
            <input
              type="number"
              name="requiredImages"
              value={subtaskData.requiredImages}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Number of Notes (At least 1):
            <input
              type="number"
              name="requiredNotes"
              value={subtaskData.requiredNotes}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="subtask-form-buttons">
          <button className="custom-button" type="submit">
            <span></span>Add Subtask
          </button>
          <button className="custom-button" onClick={onClose}>
            <span></span>Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubtaskForm;
