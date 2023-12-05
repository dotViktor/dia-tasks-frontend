import React, { useState } from "react";
import "./SubtaskDescription.css";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../../managerPage/componentsForAll/Navbar.js";
import NoteForm from "../subtaskComponents/NoteForm.js";
import ImageForm from "../subtaskComponents/ImageForm.js";
import { axiosOutHeaders } from "../../../../index.js";
import MainBgEffect from "../../../login&RegistrationEffect/MainBgEffect.js";
import Snowfall from "react-snowfall";


export default function SubtaskDescription() {
  const location = useLocation();
  const subtask = location.state;
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const { subtaskId } = useParams();

  const handleShowImageForm = () => {
    setShowImageForm(true);
  };
  const handleCloseImageForm = () => {
    setShowImageForm(false);
  };

  //Subtask form show/hide
  const handleShowNoteForm = () => {
    setShowNoteForm(true);
  };

  const handleCloseNoteForm = () => {
    setShowNoteForm(false);
  };

  const handleClick = () => {
    window.history.back();
  };
  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <div className="main-container">

        <div className="reusable-container">
          <Snowfall/>


          <div className="sub-form-decoration-2"></div>
          <div className="deco-sub-pin"></div>
          <div className="deco-sub-plant"></div>
          <div className="sub-header">
            <h1 className="sub-form-title title-effect">{subtask.title}</h1>
            <p className="sub-description">{subtask.description}</p>
          </div>
          <div className="sub-content">
            <div className="image-upload-container">
              <div className="img-icon"></div>
              <button
                className="custom-button img-btn"
                type="button"
                onClick={handleShowImageForm}
              >
                <span></span>
                Add Image
              </button>
              <p>You can upload images here</p>
            </div>
            {showImageForm && (
              <div className="modal-overlay">
                <ImageForm onClose={handleCloseImageForm} />
              </div>
            )}
            <div></div>

            <div className="content-upload-container">
              <div className="note-icon"></div>
              <button
                className="custom-button note-btn"
                type="button"
                onClick={handleShowNoteForm}
              >
                <span></span>
                Add Note
              </button>
              <p>You can upload notes here</p>
            </div>
            {showNoteForm && (
              <div className="modal-overlay">
                <NoteForm onClose={handleCloseNoteForm} subTaskId={subtaskId} />
              </div>
            )}

            <div >
              <button className="custom-button done-btn" onClick={handleClick}>
                <span></span>Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <MainBgEffect />
    </>
  );
}
