import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubtaskForms.css";

const SubtaskEditForm = ({ subtask, onSave, onClose }) => {
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchImages();
    fetchNotes();
  }, []);

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

  const ImageComponent = ({ image }) => (
    <div key={image.id} className="image-component">
      <a href={image.imagePath} target="_blank">
        <img src={image.imagePath} alt="Subtask Image" />
      </a>
      <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
    </div>
  );

  const NoteComponent = ({ note }) => (
    <div key={note.id} className="note-component">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
    </div>
  );

  return (
    <div className="subtask-edit-form">
      <h2>Images:</h2>
      {images.length === 0 ? (
        <p>This subtask has no images.</p>
      ) : (
        images.map((image) => <ImageComponent image={image} />)
      )}

      <h2>Notes:</h2>
      {notes.length === 0 ? (
        <p>This subtask doesn't have any notes yet.</p>
      ) : (
        notes.map((note) => <NoteComponent note={note} />)
      )}

      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default SubtaskEditForm;
