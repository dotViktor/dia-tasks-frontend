import React, { useState } from "react";
import { axiosOutHeaders } from "../../../..";
import Popup from "reactjs-popup";
import { useParams } from "react-router-dom";

export default function ImageForm({ onClose }) {
  let { subtaskId } = useParams();

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const formData = new FormData(event.target);

    try {
      // Make an asynchronous request to the server using fetch or axios
      const response = await fetch(
        `http://localhost:7777/upload/to-subtask/${subtaskId}`,
        {
          method: "POST",
          body: formData,
          ...axiosOutHeaders,
        }
      );

      // Handle the response as needed
      console.log(response);

      // Open the popup on successful upload
      setPopupOpen(true);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    onClose();
  };

  return (
    <div className="subtask-form">
      <form
        method="POST"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form-content"
      >
        <input
          type="file"
          name="image"
          id="image-box"
          accept="image/*"
          multiple
        />
        <div className="subtask-form-buttons">
          <button className="custom-button" type="submit">
            <span></span>Upload Image
          </button>
          <button className="custom-button" onClick={onClose}>
            <span></span>Close
          </button>
        </div>
      </form>

      {/* Popup */}
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
            }}
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
}
