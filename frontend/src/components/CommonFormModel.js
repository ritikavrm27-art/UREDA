// CommonModal.js
import React from "react";

const CommonFormModal = ({ modalId, title,children, onSave, saveText = "Save", }) => {
  return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "15px" }} >
                {/* Header */}
                <div className="modal-header text-dark" style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", }} >
                    <h5 className="modal-title fw-bold"> <i className="fa fa-user-cog me-2"></i> {title} </h5>
                </div>
                {/* Body */}
                <div className="modal-body p-4 py-2">
                    {children}
                </div>
                {/* Footer */}
                <div className="modal-footer border-0 px-4 pb-4">
                    <button className="btn btn-success px-4" onClick={onSave} > <i className="fa fa-check me-1"></i> {saveText} </button>
                    <button className="btn btn-outline-danger px-4" data-bs-dismiss="modal"> <i className="fa fa-times me-1"></i> Close </button>
                </div>
                </div>
            </div>
        </div>
  );
};

export default CommonFormModal;