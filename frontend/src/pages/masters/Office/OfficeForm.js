import React from "react";
import { Form } from "react-bootstrap";

function OfficeForm({
    office,
    setOffice,
    errors,
    officelevels,
    reportingoffice,
    states,
    district,

    selectedValues,
    setSelectedValues,

    loadReportingOffice,
    loadDistrict,

    handleSaveConfirmation,
    handleReset
}) {    
    return (
        <div className="card">
            <div className="card-header border-0">
                <h5 className="card-title m-0 fw-bold">{office.action === "U"? "Update Office": "Add New Office"}</h5>
                     <small className="head-sub">
                        {office.action === "U" ? `Fill in the details below and save to update office` : "Fill in the details below and save to add a new office"}</small>
            </div>

            <div className="card-body">
                <Form onSubmit={handleSaveConfirmation}>
                           <h6>1. General Details</h6>
                           <div className="row">
                              <div className="form-group col-md-6">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Name <span style={{color: "Red"}}>*</span></label>
                                 <input type="text" className={`form-control form-control-sm ${errors.office_name ? "is-invalid" : ""}`}
                                  disabled={office.action === "U"} id="tbofficename" placeholder="Enter Office Name" 
                                 value={office.office_name} onChange={(e) => setOffice({ ...office, office_name: e.target.value }) } />
                                 <div className="invalid-feedback">{errors.office_name}</div>
                              </div>
                              <div className="form-group col-md-6">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Name (Local)</label>
                                 <input type="text" className="form-control form-control-sm" id="tbofficenamelocal" placeholder="Enter Office Name (Local)" 
                                 value={office.office_name_local} onChange={(e) => setOffice({ ...office, office_name_local: e.target.value }) } />
                              </div>
                              <div className="form-group col-sm-6">
                                 <label className="form-label col-form-label col-form-label-sm" >Level <span style={{color: "Red"}}>*</span></label>
                                 <select id="drpOfficeLevel" className={`selectpicker form-select form-select-sm ${errors.office_level_id ? "is-invalid" : ""}`}
                                 disabled={office.action === "U"} data-style="py-0"  value={selectedValues.officeLevel}  
                                 onChange={(e) => {
                                       const officeLevelID = e.target.value;

                                       setSelectedValues(prev => ({
                                          ...prev,
                                          officeLevel: officeLevelID,
                                          reportingOffice: ""
                                       }));

                                       loadReportingOffice(officeLevelID);

                                       setOffice({
                                          ...office,
                                          office_level_id: Number(officeLevelID),
                                          reporting_office_id: ""
                                       });
                                    }}>
                              <option value="">Select</option>
                                 {officelevels.map((level) => (
                                    <option key={level.office_level_id} value={level.office_level_id} >
                                       {level.office_level_name}
                                    </option>
                                 ))}
                           </select>
                           <div className="invalid-feedback">{errors.office_level_id}</div>
                              </div>
                              <div className="form-group col-sm-6">
                                 <label className="form-label col-form-label col-form-label-sm">Reporting Office</label>
                                 <select id="drpReportingOffice" className={`selectpicker form-select form-select-sm 
                                 ${errors.reporting_office_id ? "is-invalid" : ""}`} disabled={office.action === "U"} data-style="py-0"  value={selectedValues.reportingOffice}  
                                 onChange={(e) => {
                                    setSelectedValues(prev => ({
                                       ...prev,
                                       reportingOffice: e.target.value
                                    }));

                                    setOffice({
                                       ...office,
                                       reporting_office_id: e.target.value
                                    });
                                 }}>
                              <option value="">Select</option>
                                 {reportingoffice.map((level) => (
                                    <option key={level.office_id} value={level.office_id} >
                                       {level.office_name}
                                    </option>
                                 ))}
                           </select>
                           <div className="invalid-feedback">{errors.reporting_office_id}</div>
                              </div>
                              </div>
                           <h6>2. Contact Details</h6>
                           <div className="row">
                              <div className="form-group col-md-12">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="add1">Address </label>
                                 <textarea rows="3" type="text" className="form-control form-control-sm"  id="tbaddress" placeholder="Enter Address"
                                 value={office.address} onChange={(e) => setOffice({ ...office, address: e.target.value }) }  />
                              </div>
                              <div className="form-group col-sm-6">
                                 <label className="form-label col-form-label col-form-label-sm">State <span style={{color: "Red"}}>*</span></label>
                                 <select className={`selectpicker form-select form-select-sm ${errors.state_id ? "is-invalid" : ""}`} data-style="py-0" value={selectedValues.state} 
                                 onChange={(e) => {
                                          const stateID = e.target.value;

                                          setSelectedValues(prev => ({
                                             ...prev,
                                             state: stateID,
                                             district: ""
                                          }));

                                          loadDistrict(stateID);

                                          setOffice({
                                             ...office,
                                             state_id: Number(stateID),
                                             district_id: 0
                                          });
                                       }}>
                                       <option value="">Select</option>
                                       {states.map((state) => (
                                          <option key={state.state_id} value={state.state_id}>
                                             {state.state_name}
                                          </option>
                                       ))}
                                 </select>
                                 <div className="invalid-feedback">{errors.state_id}</div>
                              </div>
                              <div className="form-group col-sm-6">
                                 <label className="form-label col-form-label col-form-label-sm">District <span style={{color: "Red"}}>*</span></label>
                                 <select className={`selectpicker form-select form-select-sm ${errors.district_id ? "is-invalid" : ""}`} data-style="py-0" value={selectedValues.district} 
                                 onChange={(e) => {
                                          setSelectedValues(prev => ({
                                             ...prev,
                                             district: e.target.value
                                          }));

                                          setOffice({
                                             ...office,
                                             district_id: Number(e.target.value)
                                          });
                                       }}>
                                       <option value="">Select</option>
                                       {district.map((d) => (
                                          <option key={d.district_id} value={d.district_id}>
                                             {d.district_name}
                                          </option>
                                       ))}
                                       </select>
                                       <div className="invalid-feedback">{errors.district_id}</div>
                              </div>
                              <div className="form-group col-md-6">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Contact Number<span style={{color: "Red"}}>*</span> </label>
                                 <input type="text" className={`form-control form-control-sm ${errors.mobile ? "is-invalid" : ""}`} id="tbmobileno" placeholder="Max. 15 Characters"
                                 value={office.mobile} maxLength={15} onChange={(e) =>{ const value = e.target.value.replace(/\D/g, "").slice(0, 15);
                                  setOffice({ ...office, mobile: value }) }} />
                                 <div className="invalid-feedback">{errors.mobile}</div>
                              </div>
                              <div className="form-group col-md-6">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="email">Email<span style={{color: "Red"}}>*</span></label>
                                 <input type="email" className={`form-control form-control-sm ${errors.email ? "is-invalid" : ""}`} id="tbemail" placeholder="email@example.com"
                                 value={office.email} onChange={(e) => setOffice({ ...office, email: e.target.value }) } />
                                 <div className="invalid-feedback">{errors.email}</div>
                              </div>
                           </div>
                           <h6>3. Nodal Officer Details</h6>
                           <div className="row">
                              <div className="form-group col-md-12">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="add1">Name </label>
                                 <input type="text" className="form-control form-control-sm" id="tbnodelname" placeholder="Enter Name"
                                 value={office.nodel_name} onChange={(e) => setOffice({ ...office, nodel_name: e.target.value }) }  />
                              </div>
                              <div className="form-group col-md-6">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Mobile Number</label>
                                 <input type="text" className={`form-control form-control-sm ${errors.nodel_mobile ? "is-invalid" : ""}`} id="tbnodelmobileno" placeholder="Max. 10 Characters"
                                 value={office.nodel_mobile} maxLength={10} onChange={(e) =>{ const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                  setOffice({ ...office, nodel_mobile:value }) }} />
                                 <div className="invalid-feedback">{errors.nodel_mobile}</div>
                              </div>
                              <div className="form-group col-md-6">
                                 <label className="form-label col-form-label col-form-label-sm" htmlFor="email">Email</label>
                                 <input type="email" className={`form-control form-control-sm ${errors.nodel_email ? "is-invalid" : ""}`} id="tbnodelemail" placeholder="email@example.com"
                                 value={office.nodel_email} onChange={(e) => setOffice({ ...office, nodel_email: e.target.value }) } />
                                 <div className="invalid-feedback">{errors.nodel_email}</div>
                              </div>
                           </div>
                           <div className="text-end border-top pt-3">
                           <button type="submit" className="btn btn-primary"><i className="fa fa-check"></i> {office.action === "U" ? "Update" : "Save"} </button>&nbsp;&nbsp;
                           <button type="button" className="btn btn-danger" onClick={() => handleReset()}><i className="fa fa-times"></i> Cancel </button>
                           </div>
                        </Form>
            </div>
        </div>
    );
}

export default OfficeForm;