import React from "react";
import { axiosOutHeaders } from "../../../..";
import { useParams } from "react-router-dom";

export default function ImageForm({ onClose }) {
  let { subtaskId } = useParams();

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
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
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
        <input type="submit" value="Upload" />
        <div className="subtask-form-buttons">
          <button className="custom-button" onClick={onClose}>
            <span></span>Close
          </button>
        </div>
      </form>
    </div>
  );
}
