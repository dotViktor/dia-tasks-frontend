import React, { useState } from "react";
import "./SubtaskForms.css";

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
          <br />
          <input
            type="text"
            name="title"
            value={subtaskData.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Subtask Description:
          <br />
          <textarea
            name="description"
            value={subtaskData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of Images:
          <br />
          <input
            type="number"
            name="requiredImages"
            value={subtaskData.requiredImages}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of Notes (At least 1):
          <br />
          <input
            type="number"
            name="requiredNotes"
            value={subtaskData.requiredNotes}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Subtask</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SubtaskForm;
