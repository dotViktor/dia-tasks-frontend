import { computeShrinkWidth } from "@fullcalendar/core/internal";
import React, { useState } from "react";
import axios from "axios";
import { axiosOutHeaders } from "../../../..";
import Popup from "reactjs-popup";

const NoteForm = ({ onClose, subTaskId }) => {

  const [titleNote, setTitleNote] = useState();
  const [contentNote, setContentNote] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `http://localhost:7777/subtasks/${subTaskId}/notes`,
        { title: titleNote, content: contentNote },
        axiosOutHeaders
      )
      .then((response) => {
        if (response.status === "202" || "200") {
          console.log("Congratulations! Note was uploaded succesfully!");
        }
      })
      .catch((error) => console.log(error));
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
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
        <label>Note Content:</label>
        <textarea
          name="contentNote"
          type="text"
          onChange={(e) => setContentNote(e.target.value)}
        />
        <div className="subtask-form-buttons">
          <button className="custom-button" type="submit">
            <span></span>Upload Note
          </button>
          <button className="custom-button" onClick={onClose}>
            <span></span>Close
          </button>
        </div>
      </form>
      <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup}>
        <div
          style={{
            width: "20rem",
            border: "1px solid black",
            borderRadius: "15px ",
            height: "14rem",
            background: "white",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <i
            className="fa-solid fa-circle-check"
            style={{ fontSize: "2.4rem", color: "green" }}
          ></i>
          <p style={{ fontSize: "1.4rem" }}>Upload successful!</p>
          <button
            style={{
              border: "none",
              background: "green",
              color: "white",
              borderRadius: "15px",
              padding: "5px 10px",
            }}
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default NoteForm;
