import React, { useState, useEffect, useMemo } from "react";
import SummaryCard from "../../components/SummaryCard.js";
import CommonInstructions from "../../components/CommonInstructions.js";
import MessageModal from "../../components/MessageModal.js";
import UserTable from "./UserMgmt/UserTable.js";
import ChangePasswordModal from "./UserMgmt/ChangePasswordModal.js";
import ChangeRoleModal from "./UserMgmt/ChangeRoleModal.js";
import SchemeMastersForm from "./Scheme/SchemeMastersForm";
import SchemeMastersTable from "./Scheme/SchemeMastersTable";
import axiosApi from "../../utils/axiosApi.js";
import * as bootstrap from "bootstrap";


const SchemeMasterInstructions = [
      "Enter master data for scheme related modules",
      "All fields marked * are mandatory and must be completed before saving.",
      "Review all information carefully before clicking Save or Update.",
      "All updates require confirmation before saving.",
      "Changes take effect immediately after successful update."
]; 
const MASTERS = [
  {
    key: "schemeType",
    label: "Scheme type",
    icon: "fa fa-th-large",
    listTitle: "Scheme type list",
    fields: [
      { key: "name", label: "Scheme type", placeholder: "Enter scheme type", required: true },
      { key: "localName", label: "Scheme type (local)", placeholder: "Enter scheme type in local language" },
    ],
    seed: [
      { id: 1, name: "Approval", localName: "" },
      { id: 2, name: "Permission", localName: "" },
      { id: 3, name: "Subsidy", localName: "" },
    ],
  },
  {
    key: "subsidyType",
    label: "Subsidy type",
    icon: "fa fa-money",
    listTitle: "Subsidy type list",
    fields: [
      { key: "name", label: "Subsidy type", placeholder: "Enter subsidy type", required: true },
      { key: "localName", label: "Subsidy type (local)", placeholder: "Enter subsidy type in local language" },
    ],
    seed: [
      { id: 1, name: "Capital subsidy", localName: "" },
      { id: 2, name: "Interest subsidy", localName: "" },
    ],
  },
  {
    key: "category",
    label: "Scheme category",
    icon: "fa fa-folder",
    listTitle: "Scheme category list",
    fields: [
      { key: "name", label: "Category name", placeholder: "Enter category name", required: true },
      { key: "code", label: "Category code", placeholder: "Enter category code" },
    ],
    seed: [
      { id: 1, name: "Agriculture", code: "AGR" },
      { id: 2, name: "Renewable energy", code: "REN" },
    ],
  },
  {
    key: "subCategory",
    label: "Scheme sub-category",
    icon: "fa fa-sitemap",
    listTitle: "Scheme sub-category list",
    fields: [
      { key: "name", label: "Sub-category name", placeholder: "Enter sub-category name", required: true },
      { key: "parent", label: "Parent category", placeholder: "Enter parent category" },
    ],
    seed: [{ id: 1, name: "Solar rooftop", parent: "Renewable energy" }],
  },
  {
    key: "technology",
    label: "Scheme technology",
    icon: "fa fa-lightbulb-o",
    listTitle: "Scheme technology list",
    fields: [
      { key: "name", label: "Technology name", placeholder: "Enter technology name", required: true },
      { key: "description", label: "Description", placeholder: "Enter a short description" },
    ],
    seed: [
      { id: 1, name: "Photovoltaic", description: "" },
      { id: 2, name: "Wind turbine", description: "" },
    ],
  },
  {
    key: "documents",
    label: "Documents",
    icon: "fa fa-file-text-o",
    listTitle: "Document list",
    fields: [
      { key: "name", label: "Document name", placeholder: "Enter document name", required: true },
      { key: "type", label: "Document type", placeholder: "e.g. Identity proof" },
    ],
    seed: [
      { id: 1, name: "Aadhaar card", type: "Identity proof" },
      { id: 2, name: "Land record", type: "Ownership proof" },
    ],
  },
  {
    key: "vendor",
    label: "Vendors",
    icon: "fa fa-truck",
    listTitle: "Vendor list",
    fields: [
      { key: "name", label: "Vendor name", placeholder: "Enter vendor name", required: true },
      { key: "contact", label: "Contact number", placeholder: "Enter contact number" },
    ],
    seed: [{ id: 1, name: "Sunrise Traders", contact: "" }],
  },
];
const MODULES = {
   schemeType: {
      title: "Scheme Type",
      formTitle: "Add Scheme Type",
      listTitle: "Scheme Type List",
      listSubTitle: "scheme types",
      color: "#1d4ed8",
      bg: "#eff6ff",
      icon: "fa fa-layer-group",
      saveApi: "/scheme/update-schemetype",
      listApi: "/scheme/get-schemetype",
      keyField: "scheme_type_id",
      fields: [
      { label: "Scheme Type",name:"scheme_type_name", type: "text", required: true, placeholder: "Enter scheme type" },
      { label: "Scheme Type(Local)",name:"scheme_type_name_local", type: "text", required: false, placeholder: "Enter scheme type in local language" },
      ],
      tableColumns: [
         {
         header: "Scheme Type",
         render: row => row.scheme_type_name
         }
      ]
   },
   subsidyType: {
      title: "Subsidy Type",
      formTitle: "Add Subsidy Type",
      listTitle: "Subsidy Type List",
      listSubTitle: "subsidy types",
      color: "#dc2626",
      bg: "#fef2f2",
      icon: "fa fa-money",
      saveApi: "/scheme/update-subsidytype",
      listApi: "/scheme/get-subsidytype",
      keyField: "subsidy_type_id",
      fields: [
      { label: "Subsidy Type", name:"subsidy_type_name", type: "text", required: true, placeholder: "Enter subsidy type" },
      { label: "Subsidy Type(Local)",name:"subsidy_type_name_local", type: "text", required: false, placeholder: "Enter subsidy type in local language" },
      ],
      tableColumns: [
         {
         header: "Subsidy Type",
         render: row => row.subsidy_type_name
         }
      ]
   },
   category: {
      title: "Scheme Category",
      formTitle: "Add Scheme Category",
      listSubTitle: "scheme category",
      listTitle: "Scheme Category List",
      color: "#d97706",
      bg: "#fffbeb",
      icon: "fa fa-folder",
      saveApi: "/scheme/update-category",
      listApi: "/scheme/get-category",
      keyField: "category_id",
      fields: [
      { label: "Category", name:"category_name", type: "text", required: true, placeholder: "Enter Category" },
      { label: "Category(Local)", name:"category_name_local", type: "text", required: false, placeholder: "Enter category in local language" },
      ],
      tableColumns: [
         {
         header: "Category",
         render: row => row.category_name
         }
      ]
   },
   subCategory: {
      title: "Scheme Sub-Category",
      formTitle: "Add Scheme Sub-Category",
      listTitle: "Scheme Sub-Category List",
      listSubTitle: "scheme sub-category",
      color: "#16a34a",
      bg: "#f0fdf4",
      icon: "fa fa-sitemap",
      saveApi: "/scheme/update-subcategory",
      listApi: "/scheme/get-subcategory",
      keyField: "subcategory_id",
      fields: [
      { label: "Category", name:"category_id", type: "select",optionKey: "category",valueField: "category_id",textField: "category_name", required: true },
      { label: "Sub-Category", name:"subcategory_name", type: "text", required: true, placeholder: "Enter sub-category" },
      { label: "Sub-Category(Local)", name:"subcategory_name_local", type: "text", required: false, placeholder: "Enter sub-category in local language" }
      ],
      tableColumns: [
         {
         header: "Category",
         render: row => row.category_name
         },
         {
         header: "Sub-Category",
         render: row => row.subcategory_name
         }
      ]
   },
   technology: {
      title: "Scheme Technology",
      formTitle: "Add Scheme Technology",
      listTitle: "Scheme Technology List",
      listSubTitle: "technologies",
      color: "#0891b2",
      bg: "#ecfeff",
      icon: "fa fa-cogs",
      saveApi: "/scheme/update-technology",
      listApi: "/scheme/get-technology",
      keyField: "technology_id",
      fields: [
      { label: "Sub-Category", name:"subcategory_id", type: "select", optionKey: "subcategory",valueField: "subcategory_id",textField: "subcategory_name",required: true, placeholder: "e.g. Central Scheme" },
      { label: "Technology", name:"technology_name", type: "text", required: true, placeholder: "Enter technology" },
      { label: "Technology(Local)", name:"technology_name_local", type: "text", required: false, placeholder: "Enter technology in local language" },
      ],
      tableColumns: [
         {
         header: "Sub-Category",
         render: row => row.subcategory_name
         },
         {
         header: "Technology",
         render: row => row.technology_name
         }
      ]
   },
   documents: {
      title: "Document",
      formTitle: "Add Documents",
      listTitle: "Documents List",
      listSubTitle: "documents",
      color: "#dc2626",
      bg: "#fef2f2",
      icon: "fa fa-file",
      saveApi: "/scheme/update-document",
      listApi: "/scheme/get-documents",
      keyField: "document_id",
      fields: [
      { label: "Document Type", name:"document_type_id",optionKey: "documenttypes",valueField: "document_type_id",textField: "document_type_name", type: "select", required: true },
      { label: "Document", name:"document_name", type: "text", required: true, placeholder: "Enter document" },
      { label: "Document(Local)", name:"document_name_local", type: "text", required: false, placeholder: "Enter document in local language" },
      ],
      tableColumns: [
         {
         header: "Document Type",
         render: row => row.document_type_name
         },
         {
         header: "Document",
         render: row => row.document_name
         }
      ]
   },
   vendor: {
      title: "Vendor",
      formTitle: "Add Vendor",
      listTitle: "Vendor List",
      listSubTitle: "vendors",
      color: "#44403c",
      bg: "#f5f5f4",
      icon: "fa fa-building",
      saveApi: "/scheme/update-vendor",
      listApi: "/scheme/get-vendors",
      keyField: "vendor_id",
      fields: [
      { label: "Vendor Name", name:"vendor_name", type: "text", required: true, placeholder: "e.g. ABC Traders" },
      { label: "Vendor Name (Local)", name:"vendor_name_local", type: "text", required: true, placeholder: "e.g. ABC Traders" },
      { label: "Contact Person", name:"contact_person", type: "text", placeholder: "e.g. Ramesh Kumar" },
      { label: "Mobile No.", name:"contact_no_1", type: "text", placeholder: "e.g. 9999999999", maxLength: 10, alphaNumeric: false, pattern: /^[0-9]*$/, validationMessage: "Please enter a valid mobile number" },
      { label: "Mobile No. 2", name:"contact_no_2", type: "text", placeholder: "e.g. 9999999999", maxLength: 10, alphaNumeric: false, pattern: /^[0-9]*$/, validationMessage: "Please enter a valid mobile number" },
      { label: "Email", name:"email", type: "email", placeholder: "e.g. vendor@example.com", maxLength: 50, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, validationMessage: "Please enter a valid email address" },
      { label: "GST No.", name:"gst_no", type: "text", placeholder: "GST No." },
      { label: "Address", name:"office_address", type: "textarea", placeholder: "Enter office address" },
      ],
      tableColumns: [
         {
         header: "Vendor Name",
         render: row => row.vendor_name
         }
      ]
   }
};

function SchemeMasterEntry({ setModuleName }) {
  const [activeKey, setActiveKey] = useState(MASTERS[0].key);
   const [selectedModule, setSelectedModule] = useState("schemeType");
   const activeModule = MODULES[selectedModule];
   const [errors, setErrors] = useState({});
   const [dropdowns, setDropdowns] = useState({ category: [], documenttypes: [], subcategory: [] });
   const [formData, setFormData] = useState({scheme_type: "",scheme_type_local: ""});
   const [summary, setSummary] = useState([]);
   const [tableData, setTableData] = useState([]);
   const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});
   
   const showMessage = ( title, message, type = "success", isConfirmation = false, onConfirm = null ) => {
                           setMessageModal({ show: true, title, message, type,isConfirmation, onConfirm });};
    

   const cards = [
      { title: "Scheme Type",count: summary[0]?.tot_scheme_type,  bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-list-alt" },
      { title: "Subsidy Type",count: summary[0]?.tot_subsidy_type ,  bgColor: "#fef2f2", iconColor: "#dc2626", icon: "fa fa-list-alt" },
      { title: "Scheme Category",count: summary[0]?.tot_category,  bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-list-alt" },   
      { title: "Scheme Sub-Category",count: summary[0]?.tot_subcategory,  bgColor: "#f0fdf4", iconColor: "#16a34a", icon: "fa fa-list-alt" },
      { title: "Vendors",count: summary[0]?.tot_vendors,  bgColor: "rgb(247 247 247)", iconColor: "rgb(100 97 94)", icon: "fa fa-user" },   
      ];
   const getInitialData = () => {
      const data = {
         action: "S",
         status: "A"
      };

      MODULES[selectedModule].fields.forEach(field => {
         data[field.name] = "";
      });

      return data;
   };
   const dropdownApis = {
         category: "/scheme/get-category",
         documenttypes: "/scheme/get-documenttype",
         subcategory: "/scheme/get-subcategory"
      };
   const loadMasterSummary = async () => {
      try {
         const response = await axiosApi.post(`/scheme/get-mastersummary`);    
         const data = response.data;
         const summaryList = Array.isArray(data) ? data : [];
         
         setSummary(summaryList);
         
      } catch (err) {
         console.log(err);
      }
   };
   const loadDropdowns = async (module) => {
      const fields = module.fields.filter(
         field => field.type === "select" && field.optionKey
      );

      for (const field of fields) {
         // Skip if already loaded
         if (dropdowns[field.optionKey]?.length > 0) continue;

         try {
               const response = await axiosApi.get(dropdownApis[field.optionKey]);

               setDropdowns(prev => ({
                  ...prev,
                  [field.optionKey]: response.data
               }));
         } catch (err) {
               console.error(err);
         }
      }
   };
   useEffect(() => {
      loadMasterSummary();
      setModuleName("User Management");
   }, []);

   useEffect(() => {
      const module = MODULES[selectedModule];

      setFormData(getInitialData());
      setTableData([]);

      loadDropdowns(module);

      const loadList = async () => {
         try {
            const res = await axiosApi.get(module.listApi);
            setTableData(res.data || []);
         } catch (err) {
            console.error(err);
         }
      };

      loadList();
   }, [selectedModule]);
   
   const fetchData = async (url, key) => {
      try {
         const response = await axiosApi.get(url);

         setDropdowns(prev => ({
               ...prev,
               [key]: response.data
         }));
      } catch (err) {
         console.error(err);
      }
   };
   const validateForm = () => {
      const newErrors = {};

      module.fields.forEach(field => {
         const value = (formData[field.name] || "").toString().trim();

         // Required validation
         if (field.required && !value) {
            newErrors[field.name] = `${field.label} is required`;
            return;
         }

         // Pattern validation
         if (value && field.pattern && !field.pattern.test(value)) {
            newErrors[field.name] =
               field.validationMessage || `Invalid ${field.label}`;
         }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };
   const handleSaveConfirmation = (e) => {
      if (e) e.preventDefault();
      // if (!validateForm()) {
      //    return;
      // }
      const message = formData.action === "U" ? "Are you sure you want to update details?" : "Are you sure you want to save details?"; 
      //const message = "Are you sure you want to save details?"; 
      showMessage("Confirmation", message, "warning", true, () => handleSubmit());
   };
   const handleSubmit = async () => {
      try {
         const response = await axiosApi.post(
               activeModule.saveApi,
               formData
         );
         showMessage("Success", response.data.message, "success");
         reloadList();
         handleReset();
      } catch (err) {
         const message = err.response?.data?.message || err.response?.data?.error || err.message || "Error while saving";
         showMessage("Error", message, "error");
      }
   };
   const handleChange = (e) => {
      const { name, value } = e.target;

      const field = activeModule.fields.find(f => f.name === name);

      let fieldValue = value;

      if (field?.type === "select") {
         fieldValue = value === "" ? "" : Number(value);
      }

      setFormData(prev => ({
         ...prev,
         [name]: fieldValue
      }));
   };
   const handleReset = () => {
      setErrors(() => ({})); // force fresh object reference
      setFormData(getInitialData());
   };
   const handleEdit = (row) => {
         setFormData({
         ...getInitialData(),
         ...row,
         action: "U"
      });
   };
   const handleUpdateStatus = (row, action) => {
      handleReset();

      const name =
         row[activeModule.titleField] ||
         row.name ||
         "this record";

      let message = "";

      switch (action) {
         case "R":
            message = `Are you sure you want to delete ${name}?`;
            break;

         case "A":
            message = `Are you sure you want to activate ${name}?`;
            break;

         case "D":
            message = `Are you sure you want to deactivate ${name}?`;
            break;

         default:
            message = "Are you sure you want to proceed?";
      }

      showMessage(
         "Confirmation",
         message,
         "warning",
         true,
         () => updateStatus(row, action)
      );
   };
   const updateStatus = async (row, action) => {
      try {
         const idField = activeModule?.keyField;
         const id = row?.[idField];
         const payload = {
            [idField]:id,
            action,
            status: action === "A" ? "A" : "D"
         };
console.log(payload);
         const response = await axiosApi.post(
            activeModule.saveApi,
            payload
         );

         const data = response.data;

         if (data.success) {
            let successMessage = "";

            switch (action) {
               case "R":
                  successMessage = `${activeModule.title} Deleted Successfully`;
                  break;
               case "A":
                  successMessage = `${activeModule.title} Activated Successfully`;
                  break;
               case "D":
                  successMessage = `${activeModule.title} Deactivated Successfully`;
                  break;
            }

            showMessage("Success", successMessage, "success");

            reloadList(); // refresh table
         } else {
            showMessage(
               "Error",
               data.message || "Error while updating record",
               "error"
            );
         }
      } catch (err) {
         const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message;

         showMessage("Error", errorMessage, "error");
      }
   };
   const reloadList = async () => {
      try {
         const res = await axiosApi.get(activeModule.listApi);
         setTableData(res.data || []);
      } catch (err) {
         console.error(err);
      }
   };

  return (
      <div className="container-fluid content-inner mt-n5 px-3 py-0">
         <div className="row g-3 py-3">
            <div className="col-xl-2 col-lg-4">
               {cards.map((card, index) => (
                  <SummaryCard key={index} {...card} />
                  ))}

               <CommonInstructions title="Instructions" instructions={SchemeMasterInstructions} /> 
            </div>
            <div className="col-xl-10 col-lg-4">
               <div className="row m-0">
                  <div className="card shadow-sm border-0 mb-3">
                     <div className="card-header bg-white d-flex align-items-center justify-content-between py-3">
                     <h5 className="mb-0 fw-semibold">Scheme Master Data</h5>
                     </div>
                     <div className="row">
                        <div className="col-xl-3 col-lg-4 border-end">
                           <div className="p-3">
                              <div className="text-uppercase text-muted small fw-semibold mb-2" style={{ letterSpacing: "0.04em", fontSize: "0.7rem" }}>
                              Add master entry
                              </div>
                              <div className="list-group list-group-flush">
                              {MASTERS.map((m) => (
                                 <button
                                    key={m.key}
                                    type="button"
                                    onClick={() => setSelectedModule(m.key)}
                                    className={`list-group-item list-group-item-action border-0 rounded mb-1 d-flex align-items-center gap-2 ${
                                    m.key === selectedModule  ? "active" : "bg-transparent"
                                    }`}
                                 >
                                    <i className={m.icon} style={{ width: 18, textAlign: "center" }}></i>
                                    <span>{m.label}</span>
                                 </button>
                              ))}
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 border-end"> 
                              <SchemeMastersTable
                                 module={activeModule}
                                 data={tableData}
                                 handleEdit={handleEdit}
                                 handleUpdateStatus={(row, action) => handleUpdateStatus(row, action)}
                              />
                        </div>
                        <div className="col-xl-5 col-lg-4">
                              <SchemeMastersForm
                                 module={activeModule}
                                 formData={formData}
                                 errors={errors}
                                 setErrors={setErrors}
                                 handleChange={handleChange}
                                 handleSaveConfirmation={handleSaveConfirmation}
                                 handleReset={handleReset}
                                 dropdowns={dropdowns}
                              />
                        </div>
                           <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
                              isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
                              onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />
                        </div>
                     </div>
               </div>
            </div>
         </div>
      </div>
 );
}
export default SchemeMasterEntry;