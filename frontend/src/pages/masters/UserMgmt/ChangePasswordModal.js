import React from "react";
import CommonFormModal from "../../../components/CommonFormModel";

function ChangePasswordModal({
   selectedUser,
   newPassword,
   confirmPassword,
   setNewPassword,
   setConfirmPassword,
   onSave,
}) {
   return (
      <CommonFormModal
         modalId="changePasswordModal"
         title={
      <>
         Change Password for  &nbsp;
         <strong className="text-danger">
            {selectedUser}
         </strong>
      </>
   }
         saveText="Update Password"
         onSave={onSave}
      >
         <div className="row">
            <div className="col-md-6 border-end">
               <h6 className="fw-bold text-primary">
                  Password Policy
               </h6>

               <ol className="small ps-3">
                  <li>Minimum 8 characters.</li>
                  <li>At least one uppercase letter.</li>
                  <li>At least one lowercase letter.</li>
                  <li>At least one numeric digit.</li>
                  <li>At least one special character.</li>
                  <li>No spaces allowed.</li>
               </ol>
            </div>

            <div className="col-md-6">
               <div className="mb-3">
                  <label>New Password</label>
                  <input
                     type="password"
                     className="form-control form-control-sm"
                     value={newPassword}
                     onChange={(e) =>
                        setNewPassword(e.target.value)
                     }
                  />
               </div>

               <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                     type="password"
                     className="form-control form-control-sm"
                     value={confirmPassword}
                     onChange={(e) =>
                        setConfirmPassword(e.target.value)
                     }
                  />
               </div>
            </div>
         </div>
      </CommonFormModal>
   );
}

export default ChangePasswordModal;