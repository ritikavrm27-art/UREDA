import React, { useState, useEffect, useMemo } from "react";
import SummaryCard from "../../components/SummaryCard";
import CommonInstructions from "../../components/CommonInstructions";
import MessageModal from "../../components/MessageModal";
import UserTable from "./UserMgmt/UserTable.js";
import ChangePasswordModal from "./UserMgmt/ChangePasswordModal";
import ChangeRoleModal from "./UserMgmt/ChangeRoleModal";
import axiosApi from "../../utils/axiosApi.js";
import * as bootstrap from "bootstrap";

const userInstructions = [
      "Search users using available filters and search text.",
      "Use Change Password to update user credentials.",
      "Use Change Role to assign a new role to a user.",
      "Activate or Deactivate users as required.",
      "All updates require confirmation before saving.",
      "Changes take effect immediately after successful update."
];  

function UserManagement({ setModuleName }) {
   const [searchofficeid, setSearchOfficeID] = useState([]);
   const [officelevels, setOfficeLevels] = useState([]);
   const [selectedOffice, setSelectedOffice] = useState("");
   const [employees, setEmployees] = useState([]);
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [currentRole, setCurrentRole] = useState("");
   const [selectedRole, setSelectedRole] = useState("");
   const [selectedUser, setSelectedUser] = useState("");
   const [selectedDesignation, setSelectedDesignation] = useState("");
   const [roles, setRoles] = useState([]);

   const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});
   const showMessage = ( title, message, type = "success", isConfirmation = false, onConfirm = null ) => {
                           setMessageModal({ show: true, title, message, type,isConfirmation, onConfirm });};

   const [employee, setEmployee] = useState({ user_id:0,role_id:0,role_name:"",emp_code: "",title_id:0, emp_name: "",emp_name_local:"",
      mobile_no1: "", mobile_no2: "", email_id: "", office_level_id:0, office_id: "",office_level_name:"", office_name:"", desig_id:0,
      desig_name:"",action: "S", status: "A",});
  
   const cards =  useMemo(() =>[
   { title: "Total Users",count:employees[0]?.tot_users  || 0,  bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-users" },
   { title: "Active",count:employees[0]?.tot_active   || 0,  bgColor: "#f0fdf4", iconColor: "#16a34a", icon: "fa fa-users" },
   { title: "Inactive",count:employees[0]?.tot_deactive   || 0,  bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-users" },   
   ], [employees]); 

   const [searchValues, setSearchValues] = useState({
      searchOfficeLevel: "",
      searchOfficeID: "",
      searchRole: "",
      searchStatus: "",
      searchText: "",
   });

   useEffect(() => {
      setModuleName("User Management");
      fetchData("/user/get-roles", setRoles);
      fetchData("/user/get-officelevel", setOfficeLevels);
      loadUsersList();
   }, []);
   
   const fetchData = async (url, setter) => {
         try {
            const response = await axiosApi.get(url);
            setter(response.data);
         } catch (err) {
         }
   };
   const loadOffice = async (OfficeLevelID) => {
      try {
         const response = await axiosApi.post(`/user/get-dropdownoffice`,{office_level_id: Number(OfficeLevelID),});
         const data = response.data;
         setSearchOfficeID(data);
      } catch (err) {
      }
      };
   
   const loadUsersList = async (officeLevelID = "", officeID = "",RoleID="",status="",searchtxt="") => {
      try {
         const response = await axiosApi.post(`/user/get-userslist`,{ office_level_id: officeLevelID ? Number(officeLevelID): 0, 
            office_id: officeID || "",role_id: RoleID ? Number(RoleID): 0 || 0,status: status || "",search_text: searchtxt||"",});
         const data = response.data;
         const employeeList = Array.isArray(data) ? data : [];
         setEmployees(employeeList);
      } catch (err) {
         console.log(err);
      }
   }; 
   const resetFilter = () => {
   setSearchValues({
      searchOfficeLevel: "",
      searchOfficeID: "",
      searchRole: "",
      searchStatus: "",
      searchText: "",
   });

   setSearchOfficeID([]);

   loadUsersList();
};

const handleUpdateStatus = (user, action) => {

   if (action === "P") {
      if (!newPassword) {
         showMessage("Error", "Please enter password.", "error");
         return;
      }

      if (newPassword !== confirmPassword) {
         showMessage("Error", "Password and Confirm Password do not match.", "error" );
         return;
      }
   }
   if (action === "R" && !selectedRole) {
         showMessage("Error", "Please select a role.", "error" );
         return;
      }

   let message = "";

   switch (action) {
      case "R":
         message = "Are you sure you want to change role?";
         break;

      case "P":
         message = "Are you sure you want to change password?";
         break;

      case "A":
         message = "Are you sure you want to activate user?";
         break;

      case "D":
         message = "Are you sure you want to deactivate user?";
         break;

      default:
         message = "Are you sure?";
   }
   showMessage("Confirmation", message, "warning", true, () => updateUserStatus(user, action));
};
const updateUserStatus = async (user, action) => {
   try {
      if (action === "P") {
         if (!newPassword) {
            showMessage("Error", "Please enter password.", "error");
            return;
         }

         if (newPassword !== confirmPassword) {
            showMessage("Error", "Password and Confirm Password do not match.", "error" );
            return;
         }
      }
      if (action === "R" && !selectedRole) {
         showMessage("Error", "Please select a role.", "error" );
         return;
      }


      const updateUser = {
         emp_id: user.emp_id,
         user_id: user.user_id,
         role_id: Number(selectedRole),
         action,
         status: action,
         ...(action === "P" && { password: newPassword })
      };

      const response = await axiosApi.post(`/user/updateuser`,updateUser);
      const data = response.data;
      if (data.success) {
            setNewPassword("");
            setConfirmPassword("");
            setSelectedRole("");
            setCurrentRole("");
            setSelectedUser("");
            setSelectedOffice("");
            setSelectedDesignation("");
            const roleModalEl = document.getElementById("changeRoleModal");
            const roleModal = bootstrap.Modal.getInstance(roleModalEl);
            if (roleModal) roleModal.hide();
            const passwordModalEl = document.getElementById("changePasswordModal");
            const passwordModal = bootstrap.Modal.getInstance(passwordModalEl);
            if (passwordModal) passwordModal.hide();

            let successMessage = "";
            switch (action) {
               case "R":
                  successMessage = "User role updated successfully.";
                  break;
               case "P":
                  successMessage = "User password updated successfully.";
                  break;
               case "A":
                  successMessage = "User activated successfully.";
                  break;
               case "D":
                  successMessage = "User deactivated successfully.";
                  break;
               default:
                  successMessage = "Operation completed successfully.";
            }
            showMessage("Success", successMessage, "success");
            loadUsersList();
      } else {
         showMessage("Error", data.message, "error");
      }
   } catch (err) {
      console.error(err);      
      showMessage("Error", err.message || "Error while updating user status", "error");
   }
};
   const handleChangeRoleClick = (user) => {
      setEmployee(user);
      setCurrentRole(user.role_name);
      setSelectedRole(user.role_id);
      setSelectedUser(user.emp_code + " - " + user.emp_name);
      setSelectedOffice(user.office_name);
      setSelectedDesignation(user.desig_name);
   };
  return (
      <div className="container-fluid content-inner mt-n5 px-3 py-0">
         <div className="row g-3 py-3">
            <div className="col-xl-2 col-lg-4">
               {cards.map((card, index) => (
               <SummaryCard key={index} {...card} />
               ))}
               <CommonInstructions title="Instructions" instructions={userInstructions} /> 
            </div>
      <div className="col-xl-10 col-lg-10">
         <UserTable
            officelevels={officelevels}
            searchofficeid={searchofficeid}
            searchroles={roles}
            employees={employees}

            selectedValues={searchValues}
            setSelectedValues={setSearchValues}

            loadOffices={loadOffice}
            loadUsersList={loadUsersList}
            resetFilter={resetFilter}

            handleChangeRoleClick={handleChangeRoleClick}
            handleUpdateStatus={handleUpdateStatus}
         /> 
      </div>
      <div className="col-xl-5 col-lg-6">       
         
      </div>
      </div>
      <ChangePasswordModal
         selectedUser={selectedUser}
         newPassword={newPassword}
         confirmPassword={confirmPassword}
         setNewPassword={setNewPassword}
         setConfirmPassword={setConfirmPassword}
         onSave={() => handleUpdateStatus(employee, "P")}
      />

      <ChangeRoleModal
         selectedUser={selectedUser}
         selectedDesignation={selectedDesignation}
         selectedOffice={selectedOffice}
         currentRole={currentRole}
         selectedRole={selectedRole}
         setSelectedRole={setSelectedRole}
         roles={roles}
         onSave={() =>
            handleUpdateStatus(
               { ...employee, role_id: selectedRole },
               "R"
            )
         }
      />

      <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
         isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
         onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />

   </div>
 );
}

export default UserManagement;