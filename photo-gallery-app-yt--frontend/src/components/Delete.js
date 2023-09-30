import React from "react";

const Delete = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div className={`delete-modal ${isOpen ? "open" : ""}`}>
      <div className="delete-modal-content"></div>
    </div>
  );
};

export default Delete;
