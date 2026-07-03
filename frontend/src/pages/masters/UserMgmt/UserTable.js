import React from "react";
import CommonTable from "../../../components/CommonTable";

function UserTable({
   officelevels,
   searchofficeid,
   searchroles,
   employees,

   selectedValues,
   setSelectedValues,

   loadOffices,
   loadUsersList,
   resetFilter,

   handleChangeRoleClick,
   handleUpdateStatus,
}) {
   const columns = [
      { header: "#", render: (row, index) => index + 1, },
      { header: "User Name", render: (row) => row.user_id, },
      { header: "Employee Code", render: (row) => row.emp_code, },
      { header: "Employee Name", render: (row) => row.emp_name, },
      { header: "Role", render: (row) => row.role_name, },
      { header: "Designation", render: (row) => row.desig_name, },
      { header: "Office", render: (row) => row.office_name, },
      { header: "Contact No./Email", render: (row) => ( <> {row.mobile_no1} <br /> {row.email_id} </> ), },
      { header: "Status", render: (row) => row.status === "A" ? "Active" : "Inactive", },
   ];

   return (
      <div className="card">
         <div className="card-header border-0">
             <div className="header-title">
                    <div>
                        <h5 className="card-title mb-0 fw-bold">
                            Users List
                        </h5>
                        <small> All users added to the system. </small>
                    </div>
                </div>
            <div className="d-flex flex-nowrap gap-2 align-items-center w-100">
               {/* Office Level */}
               <div className="flex-fill">
                  <select
                     className="form-select form-select-sm"
                     value={selectedValues.searchOfficeLevel}
                     onChange={(e) => {
                        const id = e.target.value;

                        setSelectedValues({
                           ...selectedValues,
                           searchOfficeLevel: id,
                           searchOfficeID: "",
                        });

                        loadOffices(id);
                     }}
                  >
                     <option value="">
                        Select Office Level
                     </option>

                     {officelevels.map((level) => (
                        <option
                           key={level.office_level_id}
                           value={level.office_level_id}
                        >
                           {level.office_level_name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Office */}
               <div className="flex-fill">
                  <select
                     className="form-select form-select-sm"
                     value={selectedValues.searchOfficeID}
                     onChange={(e) =>
                        setSelectedValues({
                           ...selectedValues,
                           searchOfficeID: e.target.value,
                        })
                     }
                  >
                     <option value="">
                        Select Office
                     </option>

                     {searchofficeid.map((office) => (
                        <option
                           key={office.office_id}
                           value={office.office_id}
                        >
                           {office.office_name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Role */}
               <div className="flex-fill">
                  <select
                     className="form-select form-select-sm"
                     value={selectedValues.searchRole}
                     onChange={(e) =>
                        setSelectedValues({
                           ...selectedValues,
                           searchRole: e.target.value,
                        })
                     }
                  >
                     <option value="">
                        Select Role
                     </option>

                     {searchroles.map((role) => (
                        <option
                           key={role.role_id}
                           value={role.role_id}
                        >
                           {role.role_name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Status */}
               <div className="flex-fill">
                  <select
                     className="form-select form-select-sm"
                     value={selectedValues.searchStatus}
                     onChange={(e) =>
                        setSelectedValues({
                           ...selectedValues,
                           searchStatus: e.target.value,
                        })
                     }
                  >
                     <option value="">
                        Select Status
                     </option>
                     <option value="A">Active</option>
                     <option value="D">Inactive</option>
                  </select>
               </div>

               {/* Search */}
               <div className="flex-fill">
                  <input
                     type="text"
                     className="form-control form-control-sm"
                     placeholder="Search Text Here"
                     value={selectedValues.searchText}
                     onChange={(e) =>
                        setSelectedValues({
                           ...selectedValues,
                           searchText: e.target.value,
                        })
                     }
                  />
               </div>

               {/* Buttons */}
               <div className="flex-shrink-0">
                  <button
                     className="btn btn-primary btn-sm"
                     onClick={() =>
                        loadUsersList(
                           selectedValues.searchOfficeLevel,
                           selectedValues.searchOfficeID,
                           selectedValues.searchRole,
                           selectedValues.searchStatus,
                           selectedValues.searchText
                        )
                     }
                  >
                     <i className="fa fa-search text-white"></i>
                  </button>

                  &nbsp;

                  <button
                     className="btn btn-danger btn-sm"
                     onClick={resetFilter}
                  >
                     <i className="fa fa-refresh text-white"></i>
                  </button>
               </div>
            </div>
         </div>

         <div className="card-body" style={{ minHeight: "600px" }}>
            <CommonTable
               data={employees}
               columns={columns}
               rowsPerPage={10}
               keyField="user_id"
               noRecordMessage="user"
               renderActions={(b) => (
                  <>
                     <button
                        className="btn btn-sm btn-icon btn-warning"
                        title="Change Password"
                        data-bs-toggle="modal"
                        data-bs-target="#changePasswordModal"
                        onClick={() =>
                           handleChangeRoleClick(b)
                        }
                     >
                        <i className="fa fa-key text-white"></i>
                     </button>

                     <button
                        className="btn btn-sm btn-icon btn-primary"
                        title="Change Role"
                        data-bs-toggle="modal"
                        data-bs-target="#changeRoleModal"
                        onClick={() =>
                           handleChangeRoleClick(b)
                        }
                     >
                        <i className="fa fa-tasks text-white"></i>
                     </button>

                     {b.status === "A" ? (
                        <button
                           className="btn btn-sm btn-icon btn-success"
                           title="Deactivate"
                           onClick={() =>
                              handleUpdateStatus(b, "D")
                           }
                        >
                           <i className="fa fa-toggle-on text-white"></i>
                        </button>
                     ) : (
                        <button
                           className="btn btn-sm btn-icon btn-danger"
                           title="Activate"
                           onClick={() =>
                              handleUpdateStatus(b, "A")
                           }
                        >
                           <i className="fa fa-toggle-off text-white"></i>
                        </button>
                     )}
                  </>
               )}
            />
         </div>
      </div>
   );
}

export default UserTable;