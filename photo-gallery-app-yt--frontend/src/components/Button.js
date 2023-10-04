import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";

const Button = ({ setUpdateUI }) => {
  const handleChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);

    axios
      .post("http://13.48.84.96:5000/api/save", formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => console.log(err));
  };
  const handlePhotoDelete = (photoId) => {
    console.log("Deleting photo with ID:", photoId);
    // Make a DELETE request to delete the photo
    axios
      .delete(`http://13.48.84.96:5000/api/delete/${photoId}`)
      .then((res) => {
        console.log(res.data);
        // Refresh the photo gallery after deletion
        setUpdateUI(photoId);
      })
      .catch((err) => console.log(err));
  };
  return (
    <label className="button" htmlFor="file_picker">
      <AiFillPlusCircle />
      <input
        hidden
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default Button;
