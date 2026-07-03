import React from "react";
import CommonTable from "../../../components/CommonTable";

function EmployeeTable({
  employees,
  officelevels,
  searchofficeid,

  selectedsearchOfficeLevel,
  setSelectedSearchOfficeLevel,

  selectedSearchOfficeID,
  setSelectedSearchOfficeID,

  selectedSearchStatus,
  setSelectedSearchStatus,

  selectedSearchEmployeeStatus,
  setSelectedSearchEmployeeStatus,

  searchText,
  setSearchText,

  loadOffice,
  loadEmployeeList,
  resetFilter,

  handleChangeOfficeClick,
  handleUpdateStatus,
  handleEdit,
}) {

  const columns = [
      { header: "#", render: (row, index) => `${index + 1}`, },
      { header: "Employee", render: (row) => ( <> {row.emp_code}<br />{row.emp_name}</> ), },
      { header: "Designation", render: (row) => ( <> {row.desig_name} </> ), },
      { header: "Office", render: (row) => ( <> {row.office_name} <br />({row.office_level_name}) </> ), },
      { header: "Contact No./Email", render: (row) => ( <> {row.mobile_no1} <br /> {row.email_id} </> ), },
      { header: "Status", render: (row) => ( <> {row.verified_yn === "N" ? "Draft" : row.status === "A" ? "Active" : "Inactive"} </> ), }
  ]; 

  return (
    <div className="card">
        <div className="card-header border-0">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="header-title">
                    <div>
                        <h5 className="card-title mb-0 fw-bold">
                            Employee List
                        </h5>
                        <small> All employee added to the system. </small>
                    </div>
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
                    <option value={`D`}>In-Active</option>
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
                <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="white-tooltip" 
                data-bs-title="Search" onClick={() => 
                loadEmployeeList( selectedsearchOfficeLevel, selectedSearchOfficeID,selectedSearchStatus,selectedSearchEmployeeStatus, searchText )} >
                <i className="fa fa-search text-white"></i>&nbsp;
                </button>
                &nbsp;
                <button className="btn btn-danger btn-sm" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="white-tooltip" 
                data-bs-title="Reset" onClick={resetFilter} >
                <i className="fa fa-refresh text-white"></i>&nbsp;
                </button>
                </div>

            </div>
        </div>
        <div className="card-body" style={{ minHeight: "600px" }}>
            <CommonTable data={employees}  columns={columns}  keyField="emp_id"  rowsPerPage={10} noRecordMessage="employee" renderActions={(b) => (
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
                    <button className="btn btn-sm btn-icon btn-success" title="Deactivate" onClick={() => handleUpdateStatus(b, "D")} >
                    <i className="fa fa-toggle-on text-white"></i>
                    </button>
                    ) : (
                    <button className="btn btn-sm btn-icon btn-danger" title="Activate" onClick={() => handleUpdateStatus(b, "A")} >
                    <i className="fa fa-toggle-off text-white"></i>
                    </button>
                    )}
                    </>
                    )}
                    <button className="btn btn-sm btn-icon btn-warning" title="Update" onClick={() => handleEdit(b)}>
                    <i className="fa fa-edit text-white"></i>
                    </button>   
                    {b.verified_yn === "Y" && (
                    <button   button className="btn btn-sm btn-icon btn-info fw-bold text-white" title="Update Office"
                    data-bs-toggle="modal" data-bs-target="#changeOfficeModal" onClick={() => handleChangeOfficeClick(b) } >
                    O</button> 
                     )}
                    </>
                )}
            />

        </div>
    </div>
  );
}

export default EmployeeTable;