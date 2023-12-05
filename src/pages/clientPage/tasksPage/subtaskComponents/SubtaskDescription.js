
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
      <div className='main-container'>
        <div className='sub-form-decoration'>
        </div>

        <div className='reusable-container'>
          <div className="sub-form-decoration-2">
          </div>
          <div className='deco-sub-pin'>

          </div>
          <div className='deco-sub-plant'>

          </div>
          <div className='sub-header'>
            <h1 className='sub-form-title title-effect'>{subtask.title}</h1>
            <p className='sub-description'>{subtask.description}</p>
          </div>
          <div className='sub-content'>

            <div className='image-upload-container'>
              <div className='img-icon'>
              </div>
              <button
                className="custom-button"
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

            <div className='content-upload-container'>
              <div className='note-icon'></div>
              <button
                className="custom-button"
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
                <NoteForm onClose={handleCloseNoteForm} />
              </div>
            )}

            <div>
              <button className="custom-button" onClick={handleClick}>
                <span></span>Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
