import React, { useState } from "react";
import Delete from "./Delete";

import axios from "axios";
import "../index.css"; // Import your CSS file for styling

const Grid = ({ photos, onDelete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  const handleDeleteClick = (photoId) => {
    setSelectedPhotoId(photoId);
    setDeleteModalOpen(true);
    console.log("Delete button clicked for photo ID:", photoId);
  };

  const handleConfirmDelete = () => {
    console.log("handleConfirmDelete called");
    if (selectedPhotoId) {
      axios
        .delete(`http://13.48.84.96:5000/api/delete/${selectedPhotoId}`)
        .then((response) => {
          console.log("Photo deleted:", response.data);
          // Update your UI or trigger a refresh of the photo grid
          // as needed (e.g., by calling setUpdateUI)
        })
        .catch((error) => {
          console.error("Error deleting photo:", error);
          // Handle errors, if any
        });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedPhotoId(null);
  };

  return (
    <>
      <h1>Our Gallery</h1>
      <div className="grid">
        {photos.map(({ photo, _id }) => (
          <div key={_id} className="grid__item">
            <img
              src={`http://13.48.84.96:5000/uploads/${photo}`}
              alt="grid_image"
              className="grid__image"
            />
          </div>
        ))}
      </div>
      <Delete
        isOpen={deleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete} // Check if this is correctly assigned
      />
    </>
  );
};

export default Grid;
