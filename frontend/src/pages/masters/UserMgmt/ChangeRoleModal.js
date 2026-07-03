import React from "react";
import CommonFormModal from "../../../components/CommonFormModel";

function ChangeRoleModal({
   selectedUser,
   selectedDesignation,
   selectedOffice,
   currentRole,
   selectedRole,
   setSelectedRole,
   roles,
   onSave,
}) {
   return (
      <CommonFormModal
         modalId="changeRoleModal"
         title="Change Role"
         saveText="Update Role"
         onSave={onSave}
      >
         <div className="row">
            <div className="col-md-6 border-end">
               <label>
                  You are changing the role for
                  <br />
                  <strong className="text-danger">{selectedUser}</strong>
               </label>

               <br />

               <label>
                  Designation:
                  <strong> {selectedDesignation}</strong>
               </label>

               <br />

               <label>
                  Office:
                  <strong> {selectedOffice}</strong>
               </label>

               <br />

               <label>
                  Current Role:
                  <strong> {currentRole}</strong>
               </label>
            </div>

            <div className="col-md-6">
               <label>Select New Role</label>

               <select
                  className="form-select form-select-sm"
                  value={selectedRole}
                  onChange={(e) =>
                     setSelectedRole(e.target.value)
                  }
               >
                  <option value="">
                     Select Role
                  </option>

                  {roles.map((role) => (
                     <option
                        key={role.role_id}
                        value={role.role_id}
                     >
                        {role.role_name}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </CommonFormModal>
   );
}

export default ChangeRoleModal;