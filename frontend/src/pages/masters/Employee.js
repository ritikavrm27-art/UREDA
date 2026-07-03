import React, { useState, useEffect, useMemo,  useCallback, } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SummaryCard from "../../components/SummaryCard";
import axiosApi  from "../../utils/axiosApi";
import MessageModal from "../../components/MessageModal";
import EmployeeForm from "./Employee/EmployeeForm";
import EmployeeTable from "./Employee/EmployeeTable";
import CommonInstructions from "../../components/CommonInstructions";
import ChangeOfficeModal from "./Employee/ChangeOfficeModal";
import * as bootstrap from "bootstrap";

const INITIAL_EMPLOYEE = {emp_code: "",title_id:0, emp_name: "",emp_name_local:"",emp_father_name: "",emp_father_name_local:"",
      emp_mother_name: "",emp_mother_name_local:"",emp_spouse_name: "",emp_spouse_name_local:"",emp_photo: null,dob:null,gender:"",religion_id:0,state_id:0,
      district_id:0, address: "",mobile_no1: "", mobile_no2: "", email_id: "",office_level_id: 0, office_id: "", joining_date:null,desig_id:0,emp_type:"",action: "S", status: "A",verified_yn: "N"
   };
const INITIAL_SELECTED_VALUES = { religion: "", title: "", designation: "", state: "", district: "", officeLevel: "", office: "" };

const INITIAL_OFFICE_VALUES = { officeLevel: "", office: "", designation: "", };

const employeeInstructions = [
   "All fields marked * are mandatory and must be completed before saving.",
   "Employee Code and Email ID cannot be changed after the employee record is created.",
   "Prefer using the employee's official email ID, as it will serve as the User ID for system access.",
   "Draft employees can be Verified or Deleted using the available action buttons.",
   "Verified employees can be Activated or Deactivated as required.",
   "Review all information carefully before clicking Save or Update.",
   "Changes will take effect only after successful confirmation and save."
];     

function Employee({ setModuleName }) {
   const [searchText, setSearchText] = useState("");
   const [selectedsearchOfficeLevel, setSelectedSearchOfficeLevel] = useState("");
   const [searchofficeid, setSearchOfficeID] = useState([]);
   const [selectedSearchOfficeID, setSelectedSearchOfficeID] = useState("");
   const [selectedSearchEmployeeStatus, setSelectedSearchEmployeeStatus] = useState("");
   const [selectedSearchStatus, setSelectedSearchStatus] = useState("");

   const [religions, setReligion] = useState([]);
   const [titles, setTitle] = useState([]);
   const [designations, setDesignation] = useState([]);
   const [states, setStates] = useState([]);
   const [district, setDistrict] = useState([]);
   const [officelevels, setOfficeLevels] = useState([]);
   const [offices, setOffice] = useState([]);
   const [errors, setErrors] = useState({});
   const [employees, setEmployees] = useState([]);

   const [selectedEmployee, setSelectedEmployee] = useState("");
   const [selectedOffice, setSelectedOffice] = useState("");
   const [selectedDesignation, setSelectedDesignation] = useState("");
   const [newOfficeLevel, setNewOfficeLevel] = useState("");
   const [newOffice, setNewOffice] = useState("");
   const [newDesignation, setNewDesignation] = useState("");
   const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
   const [selectedValues, setSelectedValues] = useState(INITIAL_SELECTED_VALUES);
   const [officeValues, setOfficeValues] = useState(INITIAL_OFFICE_VALUES);

   const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});

   const showMessage = ( title, message, type = "success", isConfirmation = false, onConfirm = null ) => {
                        setMessageModal({ show: true, title, message, type,isConfirmation, onConfirm });};

   const [employee, setEmployee] = useState(INITIAL_EMPLOYEE);
  
   const cards = useMemo(() => [
   { title: "Total Employees",count:employees[0]?.tot_employee  || 0,  bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-user" },
   { title: "Draft",count:employees[0]?.tot_draft   || 0,  bgColor: "#fef2f2", iconColor: "#dc2626", icon: "fa fa-user" },
   { title: "Verified",count:employees[0]?.tot_verified   || 0,  bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-user" },   
   { title: "Active",count:employees[0]?.tot_active   || 0,  bgColor: "#f0fdf4", iconColor: "#16a34a", icon: "fa fa-user" },
   { title: "Inactive",count:employees[0]?.tot_deactive   || 0,  bgColor: "rgb(247 247 247)", iconColor: "rgb(100 97 94)", icon: "fa fa-user" },   
   ], [employees]);

   useEffect(() => {
      const loadData = async () => {
         await Promise.all([
            loadEmployeeList(),
            fetchData("/user/get-state", setStates),
            fetchData("/user/get-designation", setDesignation),
            fetchData("/user/get-religion", setReligion),
            fetchData("/user/get-nametitle", setTitle),
            fetchData("/user/get-officelevel", setOfficeLevels)
         ]);
      };
      setModuleName("Employee Management");
      loadData();
   }, []);
   const fetchData = async (url, setter) => {
      try {
         const response = await axiosApi.get(url);
         setter(response.data);
      } catch (err) {
         console.error(err);
      }
   };
   const loadDistrict = async (StateID) => {
      try {
            const response = await axiosApi.post(`/user/get-district`, { state_id: Number(StateID),});
            setDistrict(response.data);
            return response.data;
         } catch (err) {
            console.log(err);
         }
   };
   const loadOffice = async (OfficeLevelID) => {
   try {
         const response = await axiosApi.post( "/user/get-dropdownoffice", { office_level_id: Number(OfficeLevelID), } );
         setOffice(response.data);
         setSearchOfficeID(response.data);
         return response.data;
      } catch (err) {
         console.log(err);
         return [];
      }
   };
   const parseDate = (dateStr) => {
      if (!dateStr) return null;

      const [day, month, year] = dateStr.split("/");
      return new Date(year, month - 1, day);
   };
   const loadEmployeeList = async (officeLevelID = "", officeID = "",status="",verifiedStatus="",searchValue="") => {
      try {
         const response = await axiosApi.post(`/user/get-employeelist`, {
            office_level_id: Number(officeLevelID),
            office_id: officeID,
            status,
            verified_yn: verifiedStatus,
            search_text: searchValue
         });
         const data = response.data;
         const employeeList = Array.isArray(data) ? data : [];
         
         setEmployees(employeeList);
      } catch (err) {
         console.log(err);
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
      if (!employee.office_id?.trim() || employee.office_id === "0") {
         tempErrors.office_id = "Please select office";
      }
      if (!employee.mobile_no1) {
         tempErrors.mobile_no1 = "Mobile number is required";
      } else if (!/^[0-9]{10}$/.test(employee.mobile_no1)) {
         tempErrors.mobile_no1 = "Mobile number must be 10 digits";
      }
      if ( employee.mobile_no2 && !/^[0-9]{10}$/.test(employee.mobile_no2) ) {
         tempErrors.mobile_no2 ="Mobile number 2 must be 10 digits";
      }
      if (!employee.email_id.trim()) {
         tempErrors.email_id = "Email ID is required";
      }else if (
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
      if (e) e.preventDefault();
      if (!validateForm()) {
         return;
      }
      const message = employee.action === "U" ? "Are you sure you want to update employee details?" : "Are you sure you want to save employee details?"; 
      showMessage("Confirmation", message, "warning", true, () => saveEmployee());
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
         const response = await axiosApi.post(`/user/addupdateemployee`, employeeData);
         
         const data = response.data;

         if (data.success) {
            let message = employeeData.action === "U" ? "Employee Updated Successfully" : "Employee Saved Successfully";

            showMessage("Message", message, "success", false, null);
            loadEmployeeList();
            // Clear form
            setEmployee({ ...INITIAL_EMPLOYEE });

            setSelectedValues({ ...INITIAL_SELECTED_VALUES });

         } else {
            showMessage("Error", data.message || "Error while saving employee", "error", false, null);
         }
      } catch (err) {
         console.log(err);
         const message = err.response?.data?.message || err.response?.data?.error || err.message || "Error while saving employee";
         showMessage("Error", message, "error", false, null);
      }
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
   const handleEdit = async (b) => {
      const districtData = await loadDistrict(b.state_id);
      const officeData = await loadOffice(b.office_level_id);
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
            office_id: String(b.office_id),
            joining_date: parseDate(b.joining_date),
            desig_id:b.desig_id,
            emp_type:b.emp_type,
            action: "U",
            status: "A"
      });
      setTimeout(() => {
         setSelectedValues({
            religion: b.religion_id,
            title: b.title_id,
            designation: b.desig_id,
            state: b.state_id,
            district: b.district_id,
            officeLevel: b.office_level_id,
            office: String(b.office_id)
         });
      }, 100);
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
         case "O":
            message = `Are you sure you want to update office details of ${employee.emp_code}-${employee.emp_name}?`;
            break;

         default:
            message = "Are you sure?";
      }
      console.log("emp: "+employee)
      showMessage("Confirmation", message, "warning", true, () => updateEmployeeStatus(employee, action));
   };
   const updateEmployeeStatus = async (employee, action) => {
   try {
      
      const payload = {
         emp_id: employee.emp_id,
         office_level_id: Number(employee.office_level_id),
         office_id: employee.office_id,
         desig_id: Number(employee.desig_id),
         action,
         status: action === "A" ? "A" : "D",
      };
      const response = await axiosApi.post("/user/addupdateemployee",payload);
      const data = response.data;

      if (data.success) {
         setSelectedValues({ ...INITIAL_SELECTED_VALUES });
         const officeModalEl = document.getElementById("changeOfficeModal");
         const officeModal = bootstrap.Modal.getInstance(officeModalEl);
         if (officeModal) officeModal.hide();

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
         case "O":
            successMessage = "Employee Office Updated Successfully";
            break;
         default:
            successMessage = "Operation Completed Successfully";
         }

         showMessage("Success", successMessage, "success", false, null);
         loadEmployeeList();
      }else {
         showMessage("Error", data.message, "error");
      }
   } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.response?.data?.error || err.message || "Error while saving employee";
      showMessage("Error", message, "error", false, null);
   }
   };
   const handleReset = useCallback(() => {
      setEmployee({ ...INITIAL_EMPLOYEE });
      setSelectedValues({ ...INITIAL_SELECTED_VALUES });
      setErrors({});
   }, []);
   const handleChangeOfficeClick = (employee) => {
      loadOffice(employee.office_level_id);
      setSelectedEmployeeData(employee);
      setSelectedEmployee(employee.emp_code + " - " + employee.emp_name);
      setSelectedOffice(employee.office_name);
      setSelectedDesignation(employee.desig_name);
      setOfficeValues((prev) => ({
         ...prev,
         officeLevel: employee.office_level_id,
         office: String(employee.office_id),
         designation: employee.desig_id,
      }));
   };
   return (
      <div className="container-fluid content-inner mt-n5 px-3 py-0">
            <div className="row g-3 py-3">
               <div className="col-xl-2 col-lg-4">
                  {cards.map((card, index) => (
                  <SummaryCard key={index} {...card} />
                  ))}
                  
            <CommonInstructions title="Instructions" instructions={employeeInstructions} />
         </div>
         <div className="col-xl-5 col-lg-3">
            <EmployeeTable
               employees={employees}
               officelevels={officelevels}
               searchofficeid={searchofficeid}
               selectedsearchOfficeLevel={selectedsearchOfficeLevel}
               setSelectedSearchOfficeLevel={setSelectedSearchOfficeLevel}
               selectedSearchOfficeID={selectedSearchOfficeID}
               setSelectedSearchOfficeID={setSelectedSearchOfficeID}
               selectedSearchStatus={selectedSearchStatus}
               setSelectedSearchStatus={setSelectedSearchStatus}
               selectedSearchEmployeeStatus={selectedSearchEmployeeStatus}
               setSelectedSearchEmployeeStatus={setSelectedSearchEmployeeStatus}
               searchText={searchText}
               setSearchText={setSearchText}
               loadOffice={loadOffice}
               loadEmployeeList={loadEmployeeList}
               resetFilter={resetFilter}
               handleChangeOfficeClick={handleChangeOfficeClick}
               handleUpdateStatus={handleUpdateStatus}
               handleEdit={handleEdit}
            />            
         </div>
         <div className="col-xl-5 col-lg-6">
            <EmployeeForm  
               employee={employee}  
               setEmployee={setEmployee}  
               errors={errors}  
               titles={titles}  
               religions={religions}  
               states={states}
               district={district}  
               officelevels={officelevels}  
               offices={offices}  
               designations={designations}  
               selectedValues={selectedValues}
               setSelectedValues={setSelectedValues}  
               loadDistrict={loadDistrict}  
               loadOffice={loadOffice}  
               handleSaveConfirmation={handleSaveConfirmation}
               handleReset={handleReset}
            />
         </div>
         </div>
         <ChangeOfficeModal
            selectedEmployee={selectedEmployee}
            selectedOffice={selectedOffice}
            selectedDesignation={selectedDesignation}
            officelevels={officelevels}  
            offices={offices}  
            designations={designations}  
            errors={errors}   
            selectedValues={officeValues}
            setSelectedValues={setOfficeValues} 
            loadOffice={loadOffice}
            onSave={() => handleUpdateStatus({ emp_id: selectedEmployeeData?.emp_id, office_level_id: officeValues.officeLevel, office_id: officeValues.office,
                           desig_id: officeValues.designation, }, "O")}
         />

         <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
         isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
         onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />

      </div>
 );
}
export default Employee;