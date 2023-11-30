import { computeShrinkWidth } from "@fullcalendar/core/internal";
import React, { useState } from "react";
import axios from 'axios';

const NoteForm = ({ onClose }) => {

  const [titleNote, setTitleNote] = useState();
  const [contentNote, setContentNote] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:7777/subtasks/1/notes", { title: titleNote, content:contentNote })
      .then(response => {
        if (response.status === "202" || "200") {
          console.log("Congratulations! Note was uploaded succesfully!")
        }
      })
      .catch(
        error => console.log(error)
      )
    onClose();
  };

  return (
    <div className="subtask-form">
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Note Title:
          <input
            type="text"
            name="titleNote"
            onChange={(e) => setTitleNote(e.target.value)}
          />
        </label>
        <label>
          Note Content:
        </label>
        <textarea
          name="contentNote"
          type="text"
          onChange={(e) => setContentNote(e.target.value)}
        />
        <div className="subtask-form-buttons">
          <button  type="submit">
            Upload Note
          </button>
          <button className="custom-button" onClick={onClose}>
            <span></span>Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

