import React, { useState } from 'react'
import './SubtaskDescription.css';
import { Link, useLocation} from 'react-router-dom';
import NavbarClients from '../../navbarClientsFolder/NavbarClients';
import axios from 'axios';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import Popup from 'reactjs-popup';
import TaskDescription from '../../taskComponents/TaskDescription';


export default function SubtaskDescription() {

  const location = useLocation();
  const subtask = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const formData = new FormData(event.target);

    try {
      // Make an asynchronous request to the server using fetch or axios
      const response = await fetch('http://localhost:7777/upload/to-subtask/1', {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  const handleClick = () =>{
    window.history.back();
  }
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
      <NavbarClients path="/navClients" ></NavbarClients>
      <div className='main-client-container'>
        <div className='sub-content-container'>
          <div className='sub-header'>
            <h1>{subtask.title}</h1>
            <p className='sub-description'>{subtask.description}</p>
          </div>
          <div className='sub-content'>
            <form
              action="http://localhost:7777/upload/to-subtask/1"
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className='form-content'
            >
              <input type="file" name="image" id='image-box' accept="image/*" multiple />
              <input type="submit" value="Upload" className='upload-btn' />
            </form>
            <div>
              <form
                action="http://localhost:7777/upload/to-subtask/1"
                method="POST"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input type='textbox' name='note' accept="note/*" />
                <input type="submit" value="Upload" className='upload-btn' />
              </form>
              {/* <Popup trigger=
                {<button> Click to open popup </button>}
                position="right center">
                <div>GeeksforGeeks</div>
                <button>Click here</button>
              </Popup> */}
            </div>
            <div>
                <button className='btn btn-primary' onClick={handleClick}>Done</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
