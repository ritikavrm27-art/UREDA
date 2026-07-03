// MessageModal.js
import React from "react";

const MessageModal = ({ show, title, message, type, isConfirmation, onConfirm, onClose, }) => {
  if (!show) return null;
return (
  <>
   <div
  className="modal d-block"
  style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 99999 }}
>
  <div
    className="modal-dialog modal-dialog-centered"
    style={{ transform: "translateY(-100px)" }}
  >
    <div
      className="modal-content border-0 shadow-lg text-center"
      style={{ borderRadius: "15px" }}
    >
      <div className="modal-body pt-4 pb-2">
        {/* icon circle */}
        <div
          className={`mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle ${
            isConfirmation
              ? "bg-warning-subtle"
              : type === "success"
              ? "bg-success-subtle"
              : "bg-danger-subtle"
          }`}
          style={{ width: "64px", height: "64px" }}
        >
          {isConfirmation ? (
            <i className="fa fa-question text-warning fs-2"></i>
          ) : type === "success" ? (
            <i className="fa fa-check text-success fs-2"></i>
          ) : (
            <i className="fa fa-times text-danger fs-2"></i>
          )}
        </div>

        <h5 className="fw-bold mb-1">{title}</h5>
        <label className="form-label col-form-label text-muted">
          {message}
        </label>
      </div>

      <div className="modal-footer border-0 justify-content-center pt-0 pb-4">
        {isConfirmation ? (
          <>
            <button
              className="btn btn-outline-success btn-sm px-4"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              <i className="fa fa-check me-2"></i> Yes
            </button>
            <button
              className="btn btn-outline-danger btn-sm px-4"
              onClick={onClose}
            >
              <i className="fa fa-times me-2"></i> No
            </button>
          </>
        ) : (
          <button className="btn btn-outline-success btn-sm px-4" onClick={onClose}>
            <i className="fa fa-check me-2"></i> OK
          </button>
        )}
      </div>
    </div>
  </div>
</div>
  </>
);
};

export default MessageModal;