import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubtaskEditForm.css";

const SubtaskEditForm = ({ subtask, onClose }) => {
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [requiredData, setRequiredData] = useState([]);

  useEffect(() => {
    fetchImages();
    fetchNotes();
    fetchRequiredData();
  }, []);

  const fetchRequiredData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/tasks/${subtask.TaskParentID}/subtasks`
      );
      //Since I only need the data for a specific subtask
      const subtasksArray = response.data;
      const specificSubtask = subtasksArray.find(
        (subtaskE) => subtaskE.id === subtask.id
      );
      setRequiredData(specificSubtask);
    } catch (error) {
      console.error(
        "Error getting number of required images and notes data:",
        error
      );
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/subtasks/${subtask.id}/images`
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/subtasks/${subtask.id}/notes`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:7777/subtasks/image/${imageId}`);
        fetchImages();
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:7777/subtasks/notes/${noteId}`);
        fetchNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleZoomImage = (imagePath) => {
    window.open(imagePath, "_blank");
  };

  const ImageComponent = ({ image }) => (
    <div key={image.id} className="image-component">
      <img src={image.imagePath} alt="Subtask Image" />
      <div className="image-overlay">
        <span
          className="material-symbols-outlined"
          onClick={() => handleDeleteImage(image.id)}
        >
          delete
        </span>
        <span
          className="material-symbols-outlined"
          onClick={() => handleZoomImage(image.imagePath)}
        >
          zoom_in
        </span>
      </div>
    </div>
  );

  const NoteComponent = ({ note }) => (
    <div key={note.id} className="note-component">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-overlay">
        <span
          className="material-symbols-outlined"
          onClick={() => handleDeleteNote(note.id)}
        >
          delete
        </span>
      </div>
    </div>
  );

  return (
    <div className="subtask-edit-form">
      <div className="subtask-edit-form-columns">
        <div className="subtask-edit-form-col-1">
          <h2>
            Images: {images.length}/
            {requiredData?.requiredImages !== undefined
              ? requiredData.requiredImages
              : "..."}
          </h2>
          <hr />
          <div className="subtask-edit-form-scrollable-container">
            <div className="subtask-edit-form-image-grid">
              {images.length === 0 ? (
                <p>This subtask doesn't have any images yet.</p>
              ) : (
                images.map((image) => <ImageComponent image={image} />)
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="subtask-edit-form-col-2">
          <h2>
            Notes: {notes.length}/
            {requiredData?.requiredNotes !== undefined
              ? requiredData.requiredNotes
              : "..."}
          </h2>
          <hr />
          <div className="subtask-edit-form-scrollable-container">
            {notes.length === 0 ? (
              <p>This subtask doesn't have any notes yet.</p>
            ) : (
              notes.map((note) => <NoteComponent note={note} />)
            )}
          </div>
        </div>
      </div>
      <button className="custom-button" type="button" onClick={onClose}>
        <span></span>
        Close
      </button>
    </div>
  );
};

export default SubtaskEditForm;
