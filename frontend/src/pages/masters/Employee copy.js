import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Image, Form} from 'react-bootstrap'
import MainLayout from "../../components/Layout";
import BASE_URL from "../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as bootstrap from "bootstrap";
import SummaryCard from "../../components/SummaryCard";
import CommonTable from "../../components/CommonTable";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import MessageModal from "../../components/MessageModal";

function Employee2({ setModuleName }) {
  const navigate = useNavigate();
   const [headNoRecord, setHeadNoRecord] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [searchofficelevels, setSearchOfficeLevels] = useState([]);
   const [selectedsearchOfficeLevel, setSelectedSearchOfficeLevel] = useState("");
   const [searchofficeid, setSearchOfficeID] = useState([]);
   const [selectedSearchOfficeID, setSelectedSearchOfficeID] = useState("");
   const [searchemployeestatus, setSearchEmployeeStatus] = useState([]);
   const [selectedSearchEmployeeStatus, setSelectedSearchEmployeeStatus] = useState("");
   const [searchstatus, setSearchStatus] = useState([]);
   const [selectedSearchStatus, setSelectedSearchStatus] = useState("");
   const [religions, setReligion] = useState([]);
   const [selectedReligion, setSelectedReligion] = useState("");
   const [titles, setTitle] = useState([]);
   const [selectedTitle, setSelectedTitle] = useState("");
   const [designations, setDesignation] = useState([]);
   const [selectedDesignation, setSelectedDesignation] = useState("");
   const [states, setStates] = useState([]);
   const [selectedState, setSelectedState] = useState("");
   const [district, setDistrict] = useState([]);
   const [selectedDistrict, setSelectedDistrict] = useState("");
   const [officelevels, setOfficeLevels] = useState([]);
   const [selectedOfficeLevel, setSelectedOfficeLevel] = useState("");
   const [offices, setOffice] = useState([]);
   const [selectedOffice, setSelectedOffice] = useState("");
   const [errors, setErrors] = useState({});
   const [employees, setEmployees] = useState([]);

   const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});

   const [employee, setEmployee] = useState({ emp_code: "",title_id:0, emp_name: "",emp_name_local:"",emp_father_name: "",emp_father_name_local:"",
   emp_mother_name: "",emp_mother_name_local:"",emp_spouse_name: "",emp_spouse_name_local:"",emp_photo: null,dob:null,gender:"",religion_id:0,state_id:0,
   district_id:0, address: "",mobile_no1: "", mobile_no2: "", email_id: "", office_id: "", joining_date:null,desig_id:0,emp_type:"",action: "S", status: "A",verified_yn: "N"});
  
   const cards = [
   { title: "Total Employees",count:employees[0]?.tot_employee  || 0,  bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-user" },
   { title: "Draft",count:employees[0]?.tot_draft   || 0,  bgColor: "#fef2f2", iconColor: "#dc2626", icon: "fa fa-user" },
   { title: "Verified",count:employees[0]?.tot_verified   || 0,  bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-user" },   
   { title: "Active",count:employees[0]?.tot_active   || 0,  bgColor: "#f0fdf4", iconColor: "#16a34a", icon: "fa fa-user" },
   { title: "Inactive",count:employees[0]?.tot_deactive   || 0,  bgColor: "rgb(247 247 247)", iconColor: "rgb(100 97 94)", icon: "fa fa-user" },   
   ];

   const columns = [
      { header: "#", render: (row, index) => `${index + 1}`, },
      { header: "Employee", render: (row) => ( <> {row.emp_code}<br />{row.emp_name}</> ), },
      { header: "Designation", render: (row) => ( <> {row.desig_name} </> ), },
      { header: "Office", render: (row) => ( <> {row.office_name} <br />({row.office_level_name}) </> ), },
      { header: "Contact No./Email", render: (row) => ( <> {row.mobile_no1} <br /> {row.email_id} </> ), },
      { header: "Status", render: (row) => ( <> {row.verified_yn === "N" ? "Draft" : row.status === "A" ? "Verified/Active" : "Verified/Inactive"} </> ), }
   ];

   useEffect(() => {
      setModuleName("Employee Management");
      setHeadNoRecord(true);
      loadEmployeeList();
      loadStates();
      loadDesignation();
      loadNameTitle();
      loadReligion();
      loadOfficeLevels();
   }, []);
   const loadDesignation = async () => {
            try {
               const response = await fetchWithAuth(`/user/get-designation`, { }, navigate);
               const data = await response.json();
               setDesignation(data);
            } catch (err) {
               console.log(err);
            }
         };   
   const loadNameTitle = async () => {
            try {
               const response = await fetchWithAuth(`/user/get-nametitle`, { }, navigate);
               const data = await response.json();
               setTitle(data);
            } catch (err) {
               console.log(err);
            }
         };
   const loadReligion = async () => {
            try {
               const response = await fetchWithAuth(`/user/get-religion`, { }, navigate);
               const data = await response.json();
               setReligion(data);
            } catch (err) {
               console.log(err);
            }
         };
   const loadStates = async () => {
      try {
         const response = await fetchWithAuth(`/user/get-state`, { }, navigate);
         const data = await response.json();
         setStates(data);
      } catch (err) {
         console.log(err);
      }
   };
   const loadDistrict = async (StateID) => {
      try {
         const response = await fetchWithAuth(`/user/get-district`,
            {
            method: "POST",
            body: JSON.stringify({
               state_id: Number(StateID),
            }),
            }, navigate
         );
            const data = await response.json();
            setDistrict(data);
         } catch (err) {
            console.log(err);
         }
   };
   const loadOfficeLevels = async () => {
      try {
         const response = await  fetchWithAuth(`/user/get-officelevel`, { }, navigate);
         const data = await response.json();
         setOfficeLevels(data);
      } catch (err) {
         console.log(err);
      }
   };
   const loadOffice = async (OfficeLevelID) => {
      try {
         const response = await fetchWithAuth(`/user/get-dropdownoffice`,
            {
            method: "POST",    
            body: JSON.stringify({
               office_level_id: Number(OfficeLevelID),
            }),
            }, navigate
         );
         const data = await response.json();
         setOffice(data);
         setSearchOfficeID(data);
      } catch (err) {
         console.log(err);
      }
      };
   const parseDate = (dateStr) => {
      if (!dateStr) return null;

      const [day, month, year] = dateStr.split("/");
      return new Date(year, month - 1, day);
   };
   const loadEmployeeList = async (officeLevelID = "", officeID = "",status="",VerifiedStatus="",searchtxt="") => {
      try {
         const response = await fetchWithAuth(`/user/get-employeelist`,
            {
            method: "POST", 
            body: JSON.stringify({ office_level_id: officeLevelID ? Number(officeLevelID): 0, office_id: officeID || "",status: status || "",verified_yn: VerifiedStatus || "",search_text: searchtxt||"",
            }),
            }, navigate
         );
         const data = await response.json();
         const employeeList = Array.isArray(data) ? data : [];
         
         setEmployees(employeeList);
         if (employeeList.length === 0) {
            setHeadNoRecord(true);
         } else {
            setHeadNoRecord(false);
         }

      } catch (err) {
         console.log(err);
         setHeadNoRecord(true);
      }
   };
   const validateForm = () => {
      let tempErrors = {};

      // Office Name
      if (!employee.emp_code.trim()) {
         tempErrors.emp_code = "Employee code is required";
      }
      // Office Level
      if (!employee.title_id || employee.title_id === 0) {
         tempErrors.title_id = "Please select title";
      }
      if (!employee.emp_name.trim()) {
         tempErrors.emp_name = "Employee name is required";
      }
      // Office Level
      if (!employee.office_level_id || employee.office_level_id === 0) {
         tempErrors.office_level_id = "Please select office level";
      }
      // Office Level
      if (!employee.office_id || employee.office_id === 0) {
         tempErrors.office_id = "Please select office";
      }
      if (!employee.mobile_no1.trim()) {
         tempErrors.mobile_no1 = "Mobile number is required";
      }
      if (!employee.mobile_no1.trim()) {
      } else if (!/^[0-9]{10}$/.test(employee.mobile_no1)) {
         tempErrors.mobile_no1 = "Mobile number must be 10 digits";
      }
      if (!employee.mobile_no2.trim()) {
      } else if (!/^[0-9]{10}$/.test(employee.mobile_no2)) {
         tempErrors.mobile_no2 = "Mobile number 2 must be 10 digits";
      }
      if (!employee.email_id.trim()) {
         tempErrors.email_id = "Email ID is required";
      }
      if (!employee.email_id.trim()) {
      } else if (
         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email_id)
      ) {
         tempErrors.email_id = "Invalid email address";
      }

      setErrors(tempErrors);

      return Object.keys(tempErrors).length === 0;
   };
   const formatDate = (date) => {
      if (!date) return null; // or return ""
      const d = new Date(date);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
   };
   const handleSaveConfirmation = (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }
      const message = employee.action === "U" ? "Are you sure you want to update employee details?" : "Are you sure you want to save employee details?"; 
      setMessageModal({ show: true, title: "Confirmation", message: message, type: "warning", isConfirmation: true, onConfirm: () => saveEmployee(), });
   };
   const saveEmployee = async (e) => {
      if (e) e.preventDefault();
      if (!validateForm()) {
         return;
      }
      const employeeData = {
         ...employee,
         dob: formatDate(employee.dob),
         joining_date: formatDate(employee.joining_date),
         action: employee.action,
         status: "A",
      };
      try {
         const response = await fetchWithAuth(`/user/addupdateemployee`,
            {
            method: "POST",
            body: JSON.stringify(employeeData),
            }, navigate
         );
         
         const data = await response.json();

         if (response.ok) {
            let message = "Employee Details Saved Successfully";

            if (employeeData.action === "U") {
            message = "Employee updated successfully";
            }

            if (employeeData.action === "R") {
            message = "Employee deleted successfully";
            }
            setMessageModal({ show: true, title: "Message", message: message, type: "success", isConfirmation: false, onConfirm: null, });
            loadEmployeeList();
            // Clear form
            setEmployee({emp_code: "",title_id:0, emp_name: "",emp_name_local:"",emp_father_name: "",emp_father_name_local:"", emp_mother_name: "",
            emp_mother_name_local:"",emp_spouse_name: "",emp_spouse_name_local:"",emp_photo: null,dob:null,gender:"",religion_id:0,state_id:0, district_id:0,
            address: "",mobile_no1: "", mobile_no2: "", email_id: "", office_level_id:0, office_id: "", joining_date: null,desig_id:0,emp_type:"",action: "S", status: "A",});

            setSelectedState("");
            setSelectedDesignation("");
            setSelectedReligion("");
            setSelectedTitle("");
            setDistrict([]);
            setSelectedOfficeLevel("");
            loadOffice(0)
            setSelectedOffice("");

         } else {
            setMessageModal({ show: true, title: "Error", message: data.message || "Error while saving employee", type: "error", isConfirmation: false, onConfirm: null, });
         }
      } catch (err) {
         console.log(err);
         setMessageModal({ show: true, title: "Error", message: err.message || "Error while saving employee", type: "error", isConfirmation: false, onConfirm: null, });
      }
   };
   const searchOffice = () => {
      let filtered = [...employee];
      if (selectedsearchOfficeLevel !== "") { filtered = filtered.filter( (item) => String(item.office_level_id) === String(selectedsearchOfficeLevel) );
      }
      if (selectedSearchOfficeID !== "") {filtered = filtered.filter((item) => String(item.office_id) === String(selectedSearchOfficeID));
      }
      if (selectedSearchStatus !== "") {filtered = filtered.filter((item) => String(item.status) === String(selectedSearchStatus));
      }
      if (selectedSearchEmployeeStatus !== "") {filtered = filtered.filter((item) => String(item.verified_yn) === String(selectedSearchEmployeeStatus));
      }
      if (searchText.trim() !== "") { const text = searchText.toLowerCase();
      filtered = filtered.filter(
         (item) => item.emp_name?.toLowerCase().includes(text) || item.emp_code?.toLowerCase().includes(text) || item.office_name?.toLowerCase().includes(text)
      );
      }
      setEmployees(filtered);
   };
   const resetFilter = () => {
   setSelectedSearchOfficeLevel("");
   setSelectedSearchOfficeID("");
   setSelectedSearchStatus("");
   setSelectedSearchEmployeeStatus("");
   setSearchText("");
   setSearchOfficeID([]);
   loadEmployeeList("", "");
   };
   const handleEdit = (b) => {
   setEmployee({
         emp_id: b.emp_id,
         emp_code: b.emp_code,
         title_id:b.title_id,
         emp_name: b.emp_name,
         emp_name_local:b.emp_name_local,
         emp_father_name: b.emp_father_name,
         emp_father_name_local:b.emp_father_name_local,
         emp_mother_name: b.emp_mother_name,
         emp_mother_name_local:b.emp_mother_name_local,
         emp_spouse_name: b.emp_spouse_name,
         emp_spouse_name_local:b.emp_spouse_name_local,
         dob: parseDate(b.dob),
         gender:b.gender,
         religion_id:b.religion_id,
         state_id:b.state_id,   
         district_id:b.district_id,
         address: b.address,
         mobile_no1: b.mobile_no1,
         mobile_no2: b.mobile_no2,
         email_id: b.email_id,
         office_level_id: b.office_level_id,
         office_id: b.office_id,
         joining_date: parseDate(b.joining_date),
         desig_id:b.desig_id,
         emp_type:b.emp_type,
         action: "U",
         status: "A"
   });

   setSelectedOfficeLevel(b.office_level_id);
   loadOffice(b.office_level_id)
   setSelectedOffice(b.office_id);
   setSelectedState(b.state_id);
   loadDistrict(b.state_id);
   setSelectedDistrict(b.district_id);
   setSelectedDesignation(b.desig_id);
   setSelectedReligion(b.religion_id);
   setSelectedTitle(b.title_id);
   setErrors({});
   };
   const handleUpdateStatus = (employee, action) => {
      handleReset();
  let message = "";

  switch (action) {
    case "R":
      message = `Are you sure you want to delete ${employee.emp_code}-${employee.emp_name}?`;
      break;

    case "A":
      message = `Are you sure you want to activate ${employee.emp_code}-${employee.emp_name}?`;
      break;

    case "D":
      message = `Are you sure you want to deactivate ${employee.emp_code}-${employee.emp_name}?`;
      break;

    case "V":
      message = `Are you sure you want to verify ${employee.emp_code}-${employee.emp_name}?`;
      break;

    default:
      message = "Are you sure?";
  }

  setMessageModal({ show: true, title: "Confirmation", message, type: "warning", isConfirmation: true, onConfirm: () => updateEmployeeStatus(employee.emp_id, action), });
   };
   const updateEmployeeStatus = async (empID, action) => {
   try {
      const payload = {
         emp_id: empID,
         action,
         status: action === "A" ? "A" : "D",
      };

      const response = await fetchWithAuth(
         "/user/addupdateemployee",
         {
         method: "POST",
         body: JSON.stringify(payload),
         },
         navigate
      );

      const data = await response.json();

      if (response.ok) {
         let successMessage = "";

         switch (action) {
         case "R":
            successMessage = "Employee Deleted Successfully";
            break;

         case "A":
            successMessage = "Employee Activated Successfully";
            break;

         case "D":
            successMessage = "Employee Deactivated Successfully";
            break;

         case "V":
            successMessage = "Employee Verified Successfully";
            break;

         default:
            successMessage = "Operation Completed Successfully";
         }

         setMessageModal({ show: true, title: "Success", message: successMessage, type: "success", isConfirmation: false, onConfirm: null, });
         loadEmployeeList();
      } else {
         setMessageModal({ show: true, title: "Error", message: data.message || "Error while updating employee", type: "error", isConfirmation: false, onConfirm: null, });
      }
   } catch (err) {
      console.error(err);
         setMessageModal({ show: true, title: "Error", message: err.message || "Error while updating employee", type: "error", isConfirmation: false, onConfirm: null, });
   }
   };
   const handleReset = (b) => {

      setEmployee({
         emp_code: "",title_id:0, emp_name: "",emp_name_local:"",emp_father_name: "",emp_father_name_local:"",
         emp_mother_name: "",emp_mother_name_local:"",emp_spouse_name: "",emp_spouse_name_local:"",emp_photo: null,dob:null,gender:"",religion_id:0,state_id:0,
         district_id:0, address: "",mobile_no1: "", mobile_no2: "", email_id: "", office_id: "", joining_date:null,desig_id:0,emp_type:"",action: "S", status: "A"
         });
         
      setSelectedOfficeLevel("");
      loadOffice(0)
      setSelectedOffice("");
      setSelectedState("");
      loadDistrict(0);
      setSelectedDistrict("");
      setSelectedDesignation("");
      setSelectedReligion("");
      setSelectedTitle("");
      setErrors({});
   };
   return (
      <div className="container-fluid content-inner mt-n5 px-3 py-0">
            <div className="row g-3 py-3">
               <div className="col-xl-2 col-lg-4">
                  {/* ------------summary card---------- */}
                  {cards.map((card, index) => (
                  <SummaryCard key={index} {...card} />
                  ))}
                  {/* -----------summary card end -------------*/}
                  
            <div className="card">
               <div className="card-header d-flex justify-content-between border-0">
                  <div className="header-title">
                     <h5 className="card-title">Instructions</h5>
                  </div>
               </div>
               <div className="card-body pt-0">
                  <ol className="form-label col-form-label col-form-label-sm text-danger px-2">
                     <li>All fields marked <span style={{color: "Red"}}>*</span> are mandatory and must be completed before saving.</li>
                     <li>Employee Code and Email ID cannot be changed after the employee record is created.</li>
                     <li>Prefer using the employee's official email ID, as it will serve as the User ID for system access.</li>
                     <li>Draft employees can be Verified or Deleted using the available action buttons.</li>
                     <li>Verified employees can be Activated or Deactivated as required.</li>
                     <li>Review all information carefully before clicking Save or Update.</li>
                     <li>Changes will take effect only after successful confirmation and save.</li>
                  </ol>
                  </div>
                  </div>
               </div>
         <div className="col-xl-5 col-lg-3">
            <div className="card">
               <div className="card-header border-0">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="header-title">
                  <h5 className="card-title mb-0">Employee List</h5>
                  </div>
                  </div>
                  <div className="d-flex flex-nowrap gap-2 align-items-center w-100">
                     {/* Office Level Dropdown */}
                     <div className="flex-fill">
                        <select id="drpSearchOfcLevel" className="form-select form-select-sm" value={selectedsearchOfficeLevel} onChange={(e) => {
                        const OfficeLevelID = e.target.value; setSelectedSearchOfficeLevel(OfficeLevelID); loadOffice(OfficeLevelID); setSelectedSearchOfficeID("");}} >
                        <option value="">Office Level</option>
                        {officelevels.map((level) => (
                        <option key={level.office_level_id} value={level.office_level_id}>
                        {level.office_level_name}
                        </option>
                        ))}
                        </select>
                     </div>
                     {/* Office Dropdown */}
                     <div className="flex-fill">
                        <select id="drpSearchOfcID" className="form-select form-select-sm" value={selectedSearchOfficeID} onChange={(e) => { setSelectedSearchOfficeID(e.target.value); }} >
                        <option value="">Office</option>
                        {searchofficeid.map((office) => (
                        <option key={office.office_id} value={office.office_id} >
                        {office.office_name}
                        </option>
                        ))}
                        </select>
                     </div>
                     {/* Office Dropdown */}
                     <div className="flex-fill">
                        <select id="drpSearchStatus" className="form-select form-select-sm" value={selectedSearchStatus} onChange={(e) => { setSelectedSearchStatus(e.target.value); }} >
                        <option value="">Active Status</option>
                        <option value={`A`}>Active</option>
                        <option value={`D`}>Deactive</option>
                        </select>
                     </div>
                     <div className="flex-fill">
                        <select id="drpSearchVerifiedStatus" className="form-select form-select-sm" value={selectedSearchEmployeeStatus} onChange={(e) => { setSelectedSearchEmployeeStatus(e.target.value); }} >
                        <option value="">Employee Status</option>
                        <option value={`Y`}>Verified</option>
                        <option value={`N`}>Draft</option>
                        </select>
                     </div>
                     <div className="flex-fill">
                        <input type="text" className={`form-control form-control-sm `} id="tbsearch"
                        placeholder="Search Text Here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>

                        {/* Buttons */}
                        <div className="flex-shrink-0">
                        <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="white-tooltip" data-bs-title="Search" onClick={() => loadEmployeeList( selectedsearchOfficeLevel, selectedSearchOfficeID,selectedSearchStatus,selectedSearchEmployeeStatus, searchText )} >
                        <i className="fa fa-search text-white"></i>&nbsp;
                        </button>
                        &nbsp;
                        <button className="btn btn-danger btn-sm" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="white-tooltip" data-bs-title="Reset" onClick={resetFilter} >
                        <i className="fa fa-refresh text-white"></i>&nbsp;
                        </button>
                     </div>

                  </div>
               </div>
               <div className="card-body">
                  <CommonTable data={employees} columns={columns}  rowsPerPage={10} renderActions={(b) => (
                     <>
                  {b.verified_yn === "N" ? (
                     <>
                  <button className="btn btn-sm btn-icon btn-info" title="Verify" onClick={() => handleUpdateStatus(b, "V")}>
                  <i className="fa fa-check text-white"></i>
                  </button>

                  <button className="btn btn-sm btn-icon btn-danger" title="Delete" onClick={() => handleUpdateStatus(b, "R")} >
                  <i className="fa fa-trash text-white"></i>
                  </button>
                  </>
                  ) : (
                  <>                          

                  {b.status === "A" ? (
                  <button className="btn btn-sm btn-icon btn-danger" title="Deactivate" onClick={() => handleUpdateStatus(b, "D")} >
                  <i className="fa fa-toggle-on text-white"></i>
                  </button>
                  ) : (
                  <button className="btn btn-sm btn-icon btn-success" title="Activate" onClick={() => handleUpdateStatus(b, "A")} >
                  <i className="fa fa-toggle-off text-white"></i>
                  </button>
                  )}
               </>
                  )}
                  <button className="btn btn-sm btn-icon btn-warning" title="Update" onClick={() => handleEdit(b)}>
                        <i className="fa fa-edit text-white"></i>
                        </button>    
                  </>
               )}
            />
      
               </div>
            </div>
         </div>
         <div className="col-xl-5 col-lg-6">
            <div className="card">
               <div className="card-header d-flex justify-content-between border-0">
                  <div className="header-title">
                     <h5 className="card-title">{employee.action === "U" ? `Update Details of ${employee.emp_name}` : "Add New Employee"}</h5>
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
                              <select className={`selectpicker form-select form-select-sm ${errors.title_id ? "is-invalid" : ""}`} data-style="py-0" value={selectedTitle} 
                                 onChange={(e) => { const TitleID = e.target.value; setSelectedTitle(TitleID);setEmployee({ ...employee, title_id:  parseInt(e.target.value, 10) })}}>
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
                                 <select className={`selectpicker form-select form-select-sm `} data-style="py-0" value={selectedReligion} 
                                 onChange={(e) => { const ReligionID = e.target.value; setSelectedReligion(ReligionID); setEmployee({ ...employee, religion_id:  parseInt(e.target.value, 10) })}}>
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
                              <select className={`selectpicker form-select form-select-sm ${errors.state_id ? "is-invalid" : ""}`} data-style="py-0" value={selectedState} 
                        onChange={(e) => { const StateID = e.target.value; setSelectedState(StateID); loadDistrict(StateID);
                        setEmployee({ ...employee, state_id:  parseInt(e.target.value, 10), }) }}>
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
                              <select className={`selectpicker form-select form-select-sm`} data-style="py-0" value={selectedDistrict}
                              onChange={(e) => { const DistrictID = e.target.value; setSelectedDistrict(DistrictID);setEmployee({ ...employee, district_id:  parseInt(e.target.value, 10), })}}>
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
                              <input type="text" className={`form-control form-control-sm`} id="tbempnamelocal" placeholder="Max. 50 Characters"
                                 value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value }) } />
                           </div>
                        </div>
                        <h6>3. Office Details</h6>
                        <div className="row">
                           <div className="form-group col-md-4">
                              <label className="form-label col-form-label col-form-label-sm">Office Level<span style={{color: "Red"}}>*</span></label>
                              <select id="drpOfficeLevel" className={`selectpicker form-select form-select-sm ${errors.office_level_id ? "is-invalid" : ""}`} data-style="py-0"  value={selectedOfficeLevel}  
                              onChange={(e) => { const OfficeLevelID = e.target.value; setSelectedOfficeLevel(OfficeLevelID); loadOffice(OfficeLevelID);
                                 setEmployee({ ...employee, office_level_id: parseInt(e.target.value, 10), }); }}>
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
                              <select className={`selectpicker form-select form-select-sm  ${errors.office_id ? "is-invalid" : ""}`} data-style="py-0" value={selectedOffice} 
                                 onChange={(e) => { const OfficeID = e.target.value; setSelectedOffice(OfficeID);setEmployee({ ...employee, office_id: e.target.value, })}}>
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
                                 <select className={`selectpicker form-select form-select-sm `} data-style="py-0" value={selectedDesignation} 
                                 onChange={(e) => { const DesigID = e.target.value; setSelectedDesignation(DesigID);setEmployee({ ...employee, desig_id:  parseInt(e.target.value, 10), })}}>
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
                        <div className="text-right">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-check"></i> {employee.action === "U" ? "Update" : "Save"} </button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger" onClick={() => handleReset()}><i className="fa fa-times"></i> Cancel </button>
                        </div>
                     </Form>
                  </div>
               </div>
            </div>
         </div>
         </div>
         <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
         isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
         onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />
      </div>
 );
}
export default Employee2;