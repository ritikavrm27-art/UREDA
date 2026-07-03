import React from "react";
import CommonFormModal from "../../../components/CommonFormModel";

function ChangeOfficeModal({
   selectedEmployee,
   selectedOffice,
   selectedDesignation,
   officelevels, 
   offices, 
   designations,
   errors,
   selectedValues,
   setSelectedValues,
   loadOffice,
   onSave,
}) {
   return (
      <CommonFormModal
         modalId="changeOfficeModal"
         title="Update Office Details"
         saveText="Update"
         onSave={onSave}
      >
         <div className="row">
            <div className="col-md-6 border-end">
               <label>
                  You are updating office details for
                  <br />
                  <strong className="text-danger">{selectedEmployee}</strong>
               </label>

               <br />
               <label>
                  Current Office:
                  <strong> {selectedOffice}</strong>
               </label>
               <br />
               <label>
                  Current Designation:
                  <strong> {selectedDesignation}</strong>
               </label>
            </div>

            <div className="col-md-6">
               <div className="row">
                  <div className="form-group col-12">
                     <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Office Level<span style={{color: "Red"}}>*</span></label>
                     <select className={`form-select form-select-sm ${ errors.office_level_id ? "is-invalid" : "" }`}
                        value={selectedValues.officeLevel} onChange={(e) => { const officeLevelID = e.target.value; 
                           setSelectedValues((prev) => ({ ...prev, officeLevel: officeLevelID, office: "", }));
                           loadOffice(officeLevelID);
                        }} >
                        <option value="">Select</option>
                        {officelevels.map((level) => (
                        <option key={level.office_level_id} value={level.office_level_id} >
                           {level.office_level_name}
                        </option>
                        ))}
                     </select>
                     <div className="invalid-feedback">{errors.office_level_id}</div>
                  </div>
                  <div className="form-group col-12">
                     <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Office<span style={{color: "Red"}}>*</span></label>
                     <select className="form-select form-select-sm" value={selectedValues.office} 
                        onChange={(e) => setSelectedValues((prev) => ({ ...prev, office: e.target.value, })) } >
                        <option value="">Select</option>
                        {offices.map((office) => (
                        <option key={office.office_id} value={office.office_id} >
                           {office.office_name}
                        </option>
                        ))}
                  </select>
                     <div className="invalid-feedback">{errors.office_level_id}</div>
                  </div>
                  <div className="form-group col-12">
                     <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Designation<span style={{color: "Red"}}>*</span></label>
                     <select className="form-select form-select-sm" value={selectedValues.designation}
                        onChange={(e) => setSelectedValues((prev) => ({ ...prev, designation: e.target.value, })) } >
                        <option value="">Select</option>
                        {designations.map((desig) => (
                        <option key={desig.desig_id} value={desig.desig_id} >
                           {desig.desig_name}
                        </option>
                        ))}
                     </select>
                     <div className="invalid-feedback">{errors.office_level_id}</div>
                  </div>
               </div>
            </div>
         </div>
      </CommonFormModal>
   );
}

export default ChangeOfficeModal;