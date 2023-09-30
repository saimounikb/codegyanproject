// Modal.js

import React from "react";

const Modal = ({ showModal, closeModal, photoSrc }) => {
  return (
    <div
      className="modal"
      style={{ display: showModal ? "block" : "none" }}
      onClick={closeModal}
    >
      <div className="modal-content">
        <img src={photoSrc} alt="modal" />
      </div>
    </div>
  );
};

export default Modal;
