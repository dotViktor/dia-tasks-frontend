import React, { useState } from "react";
import "./SubtaskDescription.css";
import { useLocation } from "react-router-dom";
import Navbar from "../../../managerPage/componentsForAll/Navbar.js";
import NoteForm from "../subtaskComponents/NoteForm.js";
import ImageForm from "../subtaskComponents/ImageForm.js";
import { axiosOutHeaders } from "../../../../index.js";

export default function SubtaskDescription() {
  const location = useLocation();
  const subtask = location.state;
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const formData = new FormData(event.target);

    try {
      // Make an asynchronous request to the server using fetch or axios
      const response = await fetch(
        "http://localhost:7777/upload/to-subtask/1",
        {
          method: "POST",
          body: formData,
        },
        axiosOutHeaders
      );

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

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
  // const [selectedImages, setSelectedImages] = useState([]);
  // const [uploadStatus, setUploadStatus] = useState(null);

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setSelectedImages(files);
  // };

  // const handleUpload = async () => {
  //   try {
  //     const formData = new FormData();

  //     selectedImages.forEach((image, index) => {
  //       formData.append(`image${index + 1}`, image);
  //     });

  //     const response = await axios.post("http://localhost:7777/upload/to-subtask/1", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     setUploadStatus(`Upload successful! Response: ${JSON.stringify(response.data)}`);
  //   } catch (error) {
  //     setUploadStatus(`Error uploading images: ${error.message}`);
  //   }
  // };
  return (
    <>
      <Navbar path="/navManager" element={<Navbar />} />
      <div className="main-client-container">
        <div className="sub-content-container">
          <div className="sub-header">
            <h1>{subtask.title}</h1>
            <p className="sub-description">{subtask.description}</p>
          </div>
          <div className="sub-content">
            <div>
              <button
                className="custom-button"
                type="button"
                onClick={handleShowImageForm}
                id="add-subtask-button"
              >
                <span></span>
                Add Image
              </button>
            </div>
            {showImageForm && (
              <div className="modal-overlay">
                <ImageForm onClose={handleCloseImageForm} />
              </div>
            )}
            <div></div>

            <div>
              <button
                className="custom-button"
                type="button"
                onClick={handleShowNoteForm}
                id="add-subtask-button"
              >
                <span></span>
                Add Note
              </button>
            </div>
            {showNoteForm && (
              <div className="modal-overlay">
                <NoteForm onClose={handleCloseNoteForm} />
              </div>
            )}
            <div>
              <button className="btn btn-primary" onClick={handleClick}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
