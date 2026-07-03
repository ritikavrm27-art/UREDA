import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EmployeeForm({
   employee,
   setEmployee,
   errors, 
   titles, 
   religions, 
   states, 
   district, 
   officelevels, 
   offices, 
   designations,
   selectedValues,
   setSelectedValues,
   loadDistrict,
   loadOffice, 
   handleSaveConfirmation, 
   handleReset,}) {
    
  const updateSelected = (field, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
   <div className="card">
               <div className="card-header d-flex justify-content-between border-0">
                  <div className="header-title">
                     <h5 className="card-title m-0 fw-bold">{employee.action === "U" ? `Update Details of ${employee.emp_name}` : "Add New Employee"}</h5>
                     <small className="head-sub">
                        {employee.action === "U" ? `Fill in the details below and save to update employee` : "Fill in the details below and save to add a new employee"}</small>
                  </div>
               </div>
               <div className="card-body">
                  <div className="new-user-info">
                     <Form onSubmit={handleSaveConfirmation}>
                        <h6>1. General Details</h6>
                        <div className="row">
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Emp Code <span style={{color: "Red"}}>*</span></label>
                              <input type="text" disabled={employee.action === "U"} className={`form-control form-control-sm ${errors.emp_code ? "is-invalid" : ""}`} id="tbempcode"
                              placeholder="e.g. EMP-2024-0312" value={employee.emp_code} onChange={(e) => setEmployee({ ...employee, emp_code: e.target.value }) } />
                        <div className="invalid-feedback">{errors.emp_code}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Title <span style={{color: "Red"}}>*</span></label>
                              <select className={`selectpicker form-select form-select-sm ${errors.title_id ? "is-invalid" : ""}`} data-style="py-0" value={selectedValues.title} 
                                 onChange={(e) => { const TitleID = e.target.value; updateSelected("title", TitleID); 
                                 setEmployee({ ...employee, title_id:  parseInt(TitleID, 10) })}}>
                                 <option value="">Select</option>
                                 {titles.map((title) => (
                                    <option key={title.title_id} value={title.title_id}>
                                       {title.title_name}
                                    </option>
                                 ))}
                              </select>
                              <div className="invalid-feedback">{errors.title_id}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Name <span style={{color: "Red"}}>*</span></label>
                              <input type="text" className={`form-control form-control-sm ${errors.emp_name ? "is-invalid" : ""}`} id="tbempname"
                              placeholder="Max. 50 Characters" value={employee.emp_name} onChange={(e) => setEmployee({ ...employee, emp_name: e.target.value }) } />
                              <div className="invalid-feedback">{errors.emp_name}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Name (Local)</label>
                                 <input type="text" className={`form-control form-control-sm`} id="tbempnamelocal" placeholder="Enter Employee Name(Local)"
                                 value={employee.emp_name_local} onChange={(e) => setEmployee({ ...employee, emp_name_local: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Father Name</label>
                              <input type="text" className={`form-control form-control-sm`} id="tbempfname" placeholder="Max. 50 Characters"
                                 value={employee.emp_father_name} onChange={(e) => setEmployee({ ...employee, emp_father_name: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Father Name (Local)</label>
                              <input type="text" className={`form-control form-control-sm`} id="tbempfnamelocal" placeholder="Enter Father Name(Local)"
                                 value={employee.emp_father_name_local} onChange={(e) => setEmployee({ ...employee, emp_father_name_local: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Mother Name</label>
                              <input type="text" className={`form-control form-control-sm`} id="tbempmname" placeholder="Max. 50 Characters"
                                 value={employee.emp_mother_name} onChange={(e) => setEmployee({ ...employee, emp_mother_name: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Mother Name (Local)</label>
                              <input type="text" className={`form-control form-control-sm`} id="tbempmnamelocal" placeholder="Enter Mother Name(Local)"
                                 value={employee.emp_mother_name_local} onChange={(e) => setEmployee({ ...employee, emp_mother_name_local: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Spouse Name</label>
                              <input type="text" className={`form-control form-control-sm`} id="tbempsname" placeholder="Max. 50 Characters"
                                 value={employee.emp_spouse_name} onChange={(e) => setEmployee({ ...employee, emp_spouse_name: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Spouse Name (Local)</label>
                              <input type="text" className={`form-control form-control-sm`} id="tbempsnamelocal" placeholder="Enter Spouse Name(Local)"
                                 value={employee.emp_spouse_name_local} onChange={(e) => setEmployee({ ...employee, emp_spouse_name_local: e.target.value }) } />
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">Date of Birth</label><br/>
                              <div className="input-group">
                              <DatePicker selected={employee.dob} onChange={(date) => { setEmployee({ ...employee, dob: date, }) }} className="form-control form-control-sm w-100"
                                 dateFormat="dd/MM/yyyy" showMonthDropdown showYearDropdown dropdownMode="select" placeholderText="DD/MM/YYYY" />
                              <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                              </div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Gender</label>
                                 <select className={`selectpicker form-select form-select-sm`} data-style="py-0" value={employee.gender} 
                                 onChange={(e) => setEmployee({ ...employee, gender: e.target.value, }) }>
                                    <option value="">Select</option>
                                    <option value={`M`}>Male</option>
                                    <option value={`F`}>Female</option>
                                    <option value={`O`}>Other</option>
                                    </select>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="lname">Religion</label>
                                 <select className={`selectpicker form-select form-select-sm `} data-style="py-0" value={selectedValues.religion} 
                                 onChange={(e) => { const ReligionID = e.target.value; updateSelected("religion", ReligionID); 
                                 setEmployee({ ...employee, religion_id:  parseInt(ReligionID) })}}>
                                 <option value="">Select</option>
                                 {religions.map((religion) => (
                                    <option key={religion.religion_id} value={religion.religion_id}>
                                       {religion.religion_name}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           </div>
                        <h6>2. Contact Details</h6>
                        <div className="row">
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Mobile Number <span style={{color: "Red"}}>*</span></label>
                              <input type="text" className={`form-control form-control-sm ${errors.mobile_no1 ? "is-invalid" : ""}`} id="tbmobileno" placeholder="Max. 10 Characters"
                                    value={employee.mobile_no1} maxLength={10} onChange={(e) =>{ const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                    setEmployee({ ...employee, mobile_no1:value }) }} />
                                    <div className="invalid-feedback">{errors.mobile_no1}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Mobile Number 2</label>
                              <input type="text" className={`form-control form-control-sm ${errors.mobile_no2 ? "is-invalid" : ""}`} id="tbmobileno2" placeholder="Max. 10 Characters"
                                    value={employee.mobile_no2} maxLength={10} onChange={(e) =>{ const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                    setEmployee({ ...employee, mobile_no2:value }) }} />
                                    <div className="invalid-feedback">{errors.mobile_no2}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="email">Email <span style={{color: "Red"}}>*</span></label>
                              <input type="email" disabled={employee.action === "U"} className={`form-control form-control-sm ${errors.email_id ? "is-invalid" : ""}`} id="tbemail" placeholder="email@example.com"
                                    value={employee.email_id} onChange={(e) => setEmployee({ ...employee, email_id: e.target.value }) } />
                                    <div className="invalid-feedback">{errors.email_id}</div>
                           </div>   
                           <div className="form-group col-sm-4">
                              <label className="form-label col-form-label col-form-label-sm">State</label>
                              <select className={`selectpicker form-select form-select-sm ${errors.state_id ? "is-invalid" : ""}`} data-style="py-0" 
                              value={selectedValues.state} onChange={(e) => { const StateID = e.target.value; updateSelected("state", StateID); 
                                 loadDistrict(StateID); setSelectedValues(prev => ({ ...prev, district: ""})); 
                                 setEmployee({ ...employee, state_id:  parseInt(StateID, 10), }) }}>
                              <option value="">Select</option>
                              {states.map((state) => (
                                 <option key={state.state_id} value={state.state_id}>
                                    {state.state_name}
                                 </option>
                              ))}
                        </select>
                           </div>
                           <div className="form-group col-sm-4">
                              <label className="form-label col-form-label col-form-label-sm">District</label>
                              <select className={`selectpicker form-select form-select-sm`} data-style="py-0" value={selectedValues.district}
                              onChange={(e) => { const DistrictID = e.target.value; updateSelected("district", DistrictID); 
                              setEmployee({ ...employee, district_id:  parseInt(DistrictID, 10), })}}>
                                    <option value="">Select</option>
                                    {district.map((d) => (
                                       <option key={d.district_id} value={d.district_id}>
                                          {d.district_name}
                                       </option>
                                    ))}
                                    </select>
                           </div>
                           <div className="form-group col-md-12">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="add1">Address </label>
                              <textarea rows="3" type="text" className={`form-control form-control-sm`} id="tbempnamelocal" placeholder="Max. 500 Characters"
                                 value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value }) } />
                           </div>
                        </div>
                        <h6>3. Office Details</h6>
                        <div className="row">
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm">Office Level<span style={{color: "Red"}}>*</span></label>
                              <select id="drpOfficeLevel" disabled={employee.action === "U"} className={`selectpicker form-select form-select-sm ${errors.office_level_id ? "is-invalid" : ""}`} 
                              data-style="py-0"  value={selectedValues.officeLevel}  
                              onChange={(e) => { const OfficeLevelID = e.target.value; updateSelected("officeLevel", OfficeLevelID); loadOffice(OfficeLevelID);
                                 setEmployee({ ...employee, office_level_id: parseInt(OfficeLevelID, 10), }); }}>
                                 <option value="">Select</option>
                                    {officelevels.map((level) => (
                                 <option key={level.office_level_id} value={level.office_level_id} >
                                    {level.office_level_name}
                                 </option>
                                 ))}
                              </select>
                              <div className="invalid-feedback">{errors.office_level_id}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="add1">Office<span style={{color: "Red"}}>*</span> </label>
                              <select className={`selectpicker form-select form-select-sm  ${errors.office_id ? "is-invalid" : ""}`} disabled={employee.action === "U"}
                               data-style="py-0" value={selectedValues.office} onChange={(e) => { const OfficeID = e.target.value; updateSelected("office", OfficeID); 
                                 setEmployee({ ...employee, office_id: OfficeID, })}}>
                                 <option value="">Select</option>
                                 {offices.map((office) => (
                                    <option key={office.office_id} value={office.office_id}>
                                       {office.office_name}
                                    </option>
                                 ))}
                              </select>
                              <div className="invalid-feedback">{errors.office_id}</div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="mobno">Joining Date</label><br/>
                              <div className="input-group">
                              <DatePicker selected={employee.joining_date} onChange={(date) => {setEmployee({ ...employee, joining_date: date, }) }}
                              className="form-control form-control-sm w-100" dateFormat="dd/MM/yyyy" showMonthDropdown showYearDropdown 
                              dropdownMode="select" placeholderText="DD/MM/YYYY" />
                              <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
                              </div>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="email">Designation</label>
                                 <select className={`selectpicker form-select form-select-sm `} disabled={employee.action === "U"} data-style="py-0" value={selectedValues.designation} 
                                 onChange={(e) => { const DesigID = e.target.value; updateSelected("designation", DesigID); 
                                 setEmployee({ ...employee, desig_id:  parseInt(DesigID, 10), })}}>
                                 <option value="">Select</option>
                                 {designations.map((designation) => (
                                    <option key={designation.desig_id} value={designation.desig_id}>
                                       {designation.desig_name}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm" htmlFor="email">Employee Type</label>
                                 <select className={`selectpicker form-select form-select-sm`} data-style="py-0" value={employee.emp_type} 
                                 onChange={(e) => setEmployee({ ...employee, emp_type: e.target.value, }) }>
                                    <option value="">Select</option>
                                    <option value={`R`}>Regular</option>
                                    <option value={`C`}>Contractual</option>
                                    </select>
                           </div>
                        </div>
                        <div className="text-end border-top pt-3">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-check"></i> {employee.action === "U" ? "Update" : "Save"} </button>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-danger" onClick={() => handleReset()}><i className="fa fa-times"></i> Cancel </button>
                        </div>
                     </Form>
                  </div>
               </div>
            </div>
  );
}

export default EmployeeForm;