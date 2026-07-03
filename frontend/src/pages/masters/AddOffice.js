import React, { useState, useEffect, useMemo, } from "react";
import SummaryCard from "../../components/SummaryCard";
import CommonInstructions from "../../components/CommonInstructions";
import OfficeForm from "./Office/OfficeForm";
import OfficeTable from "./Office/OfficeTable";
import MessageModal from "../../components/MessageModal";
import axiosApi from "../../utils/axiosApi";
import * as bootstrap from "bootstrap";

const officeInstructions = [
   "All fields marked * are mandatory and must be completed before saving.",
   "Office Name and Email ID cannot be changed after the office record is created.",
   "Prefer using the office's official email ID, as it will serve as the User ID for system access.",
   "Draft offices can be Verified or Deleted using the available action buttons.",
   "Verified offices can be Activated or Deactivated as required.",
   "Review all information carefully before clicking Save or Update.",
   "Changes will take effect only after successful confirmation and save."
];   

const INITIAL_OFFICE = {office_name: "",office_name_local: "",office_level_id: 0,reporting_office_id: "",state_id: 0,district_id: 0,
       address: "",mobile: "",email: "",action: "S",status: "A",nodel_name: "",nodel_mobile: "",nodel_email: ""
   };
const INITIAL_SELECTED_VALUES = { officeLevel: "", reportingOffice: "", state: "", district: "", searchOfficeLevel: "", searchOfficeID: "", };

function AddOffice({ setModuleName }) {
    const [office, setOffice] = useState(INITIAL_OFFICE);
    const [selectedValues, setSelectedValues] = useState(INITIAL_SELECTED_VALUES);
    const [offices, setOffices] = useState([]);
    const [officelevels, setOfficeLevels] = useState([]);
    const [reportingoffice, setReportingOffice] = useState([]);
    const [states, setStates] = useState([]);
    const [district, setDistrict] = useState([]);
    const [searchofficeid, setSearchOfficeID] = useState([]);
    const [errors, setErrors] = useState({});

    const cards = useMemo(() =>[
      { title: "Total Offices",count:offices[0]?.tot_office   || 0,  bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-building" },
      { title: "Headquarter",count:offices[0]?.tot_hq   || 0,  bgColor: "#f0fdf4", iconColor: "#16a34a", icon: "fa fa-building" },
      { title: "Regional Offices",count:offices[0]?.tot_regionalofc   || 0,  bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-building" },
      { title: "District Offices",count:offices[0]?.tot_distofc   || 0,  bgColor: "#fef2f2", iconColor: "#dc2626", icon: "fa fa-building" },
      
    ], [offices]);   

   const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});
   
   const showMessage = ( title, message, type = "success", isConfirmation = false, onConfirm = null ) => {
                           setMessageModal({ show: true, title, message, type,isConfirmation, onConfirm });};

useEffect(() => {
  const loadData = async () => {
         await Promise.all([
          loadOfficeList(),
          fetchData("/user/get-state", setStates),
          fetchData("/user/get-officelevel", setOfficeLevels)
         ]);
      };
  loadData();
  setModuleName("Office Management");
  const tooltips = [...document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
  )].map(el => new bootstrap.Tooltip(el));

  return () => {
      tooltips.forEach(t => t.dispose());
  };
}, []);

const fetchData = async (url, setter) => {
      try {
         const response = await axiosApi.get(url);
         setter(response.data);
      } catch (err) {
         console.error(err);
      }
};

const loadOfficeList = async (officeLevelID = "", officeID = "") => {
  try {
    const response = await axiosApi.post(`/user/getoffices`,{ office_level_id: officeLevelID ? Number(officeLevelID): 0, office_id: officeID || "",});    
    const data = response.data;
    const officeList = Array.isArray(data) ? data : [];
    
    setOffices(officeList);
    
  } catch (err) {
    console.log(err);
  }
};
const loadOffices = async (OfficeLevelID) => {
  try {
    const response = await axiosApi.post(`/user/get-office`,{ office_level_id: Number(OfficeLevelID),});
    const data = response.data;
    setSearchOfficeID(data);
  } catch (err) {
    console.log(err);
  }
};
const loadReportingOffice = async (OfficeLevelID) => {
  try {
    const response = await axiosApi.post(`/user/get-reportingoffice`,{ office_level_id: Number(OfficeLevelID),});

    const data = response.data;
    setReportingOffice(data);
  } catch (err) {
    console.log(err);
  }
};
const loadDistrict = async (StateID) => {
      try {
         const response = await axiosApi.post(`/user/get-district`, { state_id: Number(StateID),});
            const data = response.data;
            setDistrict(data);
         } catch (err) {
            console.log(err);
         }
};
const validateForm = () => {
  let tempErrors = {};

  // Office Name
  if (!office.office_name.trim()) {
    tempErrors.office_name = "Office name is required";
  }

  // Office Level
  if (!office.office_level_id || office.office_level_id === 0) {
    tempErrors.office_level_id = "Please select office level";
  }

  // Reporting Office validation only if office level > 10
  if (Number(office.office_level_id) > 10 && (!office.reporting_office_id || office.reporting_office_id.trim() === "") ) {
    tempErrors.reporting_office_id = "Please select reporting office";
  }

  // State
  if (!office.state_id || office.state_id === 0) {
    tempErrors.state_id = "Please select state";
  }

  // District
  if (!office.district_id || office.district_id === 0) {
    tempErrors.district_id = "Please select district";
  }

  // Mobile
  if (!office.mobile.trim()) { tempErrors.mobile = "Contact number is required";
    } else if (!/^\d{10,15}$/.test(office.mobile)) {
    tempErrors.mobile = "Contact number must be between 10 and 15 digits";
  }
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // Email
  if (!office.email.trim()) {
    tempErrors.email = "Email is required";
  } else if (
    !emailRegex.test(office.email)
  ) {
    tempErrors.email = "Invalid email address";
  }
  // Nodal Mobile
  if ( office.nodel_mobile.trim() && !/^[0-9]{10}$/.test(office.nodel_mobile) ) {
    tempErrors.nodel_mobile = "Nodal Officer Mobile number must be 10 digits";
  }

  // Nodal Email
  if ( office.nodel_email.trim() && !emailRegex.test( office.nodel_email )) {
    tempErrors.nodel_email = "Invalid email address";
  }

  setErrors(tempErrors);

  return Object.keys(tempErrors).length === 0;
};
const handleSaveConfirmation = (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }
      const message = office.action === "U" ? "Are you sure you want to update office details?" : "Are you sure you want to save office details?"; 
      setMessageModal({ show: true, title: "Confirmation", message: message, type: "warning", isConfirmation: true, onConfirm: () => saveOffice(), });
};

const saveOffice = async (e) => {
  if (e) e.preventDefault();
  if (!validateForm()) {
    return;
  }
  const officeData = {
    ...office,
    action: office.action,
    status: "A",
  };


  try {
    const response = await  axiosApi.post(`/user/addupdateoffice`,officeData);

    const data = response.data;

    if (data.success) {
      let message = officeData.action === "U" ? "Office Updated Successfully" : "Office Details Saved Successfully";
      showMessage("Message", message, "success");
      loadOfficeList();
      handleReset();

    } else {
      showMessage("Error", data.message || "Error while saving office", "error");
    }
  } catch (err) {
    console.log(err);
    showMessage("Error", err.message || "Error while saving office", "error");
  }
};

const resetFilter = () => {
    setSelectedValues(prev => ({
        ...prev,
        searchOfficeLevel: "",
        searchOfficeID: "",
    }));

    setSearchOfficeID([]);
    loadOfficeList("", "");
};

const handleEdit = async (b) => {
   setOffice({
      office_id: b.office_id,
      office_name: b.office_name,
      office_name_local: b.office_name_local,
      office_level_id: b.office_level_id,
      reporting_office_id: b.reporting_office_id,
      address: b.address,
      state_id: b.state_id,
      district_id: b.district_id,
      mobile: b.mobile,
      email: b.email,
      nodel_name: b.nodel_name,
      nodel_mobile: b.nodel_mobile,
      nodel_email: b.nodel_email,
      action: "U",
      status: "A",
   });

   setSelectedValues({
      ...INITIAL_SELECTED_VALUES,
      officeLevel: String(b.office_level_id),
      reportingOffice: String(b.reporting_office_id || ""),
      state: String(b.state_id),
      district: String(b.district_id),
   });

   await loadReportingOffice(b.office_level_id);
   await loadDistrict(b.state_id);

   setErrors({});
};
const handleUpdateStatus = (office, action) => {
handleReset()
   let message = "";

   switch (action) {
      case "R":
        message = `Are you sure you want to delete ${office.office_name}?`;
        break;

      case "A":
        message = `Are you sure you want to activate ${office.office_name}?`;
        break;

      case "D":
        message = `Are you sure you want to deactivate ${office.office_name}?`;
        break;
   }
    showMessage("Confirmation", message, "warning", true, () => updateOfficeStatus(office.office_id, action));
};

const updateOfficeStatus = async (officeID, action) => {
  try {
    const payload = {
      office_id: officeID,
      action,
      status: action === "A" ? "A" : "D",
    };

    const response = await axiosApi.post("/user/addupdateoffice",payload);

    const data = response.data;

    if (data.success) {
      const successMessage = action === "R"? "Office Deleted Successfully" : action === "A" ? "Office Activated Successfully" : "Office Deactivated Successfully";

      showMessage("Success", successMessage, "success");

      loadOfficeList();
    } else {
      showMessage("Error", data.message || "Error while updating office", "error");
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
    showMessage("Error", errorMessage, "error");
  }
};

const handleReset = () => {
   setOffice(INITIAL_OFFICE);
   setSelectedValues(INITIAL_SELECTED_VALUES);
   setSearchOfficeID([]);
   setDistrict([]); 
   setReportingOffice([]);
   setErrors({});
};

  return (

      <div className="container-fluid content-inner mt-n5 px-3 py-0">
        <div className="row g-3 py-3">
          <div className="col-xl-2 col-lg-4">
            {cards.map((card, index) => (<SummaryCard key={index} {...card} /> ))}
            <CommonInstructions title="Instructions" instructions={officeInstructions} />               
          </div>
          <div className="col-xl-4 col-lg-3">
            <OfficeTable
              officelevels={officelevels}
              searchofficeid={searchofficeid}

              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}

              loadOffices={loadOffices}
              loadOfficeList={loadOfficeList}
              resetFilter={resetFilter}

              offices={offices}
              handleEdit={handleEdit}
              handleUpdateStatus={handleUpdateStatus}
          />
            </div>
            <div className="col-xl-6 col-lg-6">
              <OfficeForm
                  office={office}
                  setOffice={setOffice}
                  errors={errors}

                  officelevels={officelevels}
                  reportingoffice={reportingoffice}

                  states={states}
                  district={district}

                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}

                  loadReportingOffice={loadReportingOffice}
                  loadDistrict={loadDistrict}

                  handleSaveConfirmation={handleSaveConfirmation}
                  handleReset={handleReset}
              />
            </div>
         </div>
         <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
         isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
         onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />
      </div>
      
 );
}

export default AddOffice;