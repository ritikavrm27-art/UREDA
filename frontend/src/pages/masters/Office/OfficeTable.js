// components/OfficeTable.jsx

import React from "react";
import CommonTable from "../../../components/CommonTable";

function OfficeTable({
    officelevels,
    searchofficeid,

    selectedValues,
    setSelectedValues,

    loadOffices,
    loadOfficeList,
    resetFilter,

    offices,

    handleEdit,
    handleUpdateStatus
}) {

    const columns = [
          { header: "#", render: (row, index) => `${index + 1}`, },
          { header: "Office Name", render: (row) => ( <> {row.office_name} <br /><small>({row.office_level_name})</small> </> ), },
          { header: "Contact No./Email", render: (row) => ( <> {row.mobile} <br /> {row.email} </> ), },
          { header: "Status", render: (row) => ( <>{row.status === "A" ? "Active" : "Inactive"}    </> ), },
       ];

    return (
        <div className="card">
            <div className="card-header border-0">
                <div className="d-flex align-items-center">
                    <div>
                        <h5 className="card-title mb-0 fw-bold">
                            Office List
                        </h5>
                        <small> All offices added to the system. </small>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" value={selectedValues.searchOfficeLevel}
                        onChange={(e) => { const id = e.target.value; setSelectedValues(prev => ({ ...prev, searchOfficeLevel: id, searchOfficeID: ""}));
                        loadOffices(id); }}>
                        <option value=""> Select Office Level </option>
                        {officelevels.map(level => (
                            <option
                                key={level.office_level_id}
                                value={level.office_level_id}
                            >
                                {level.office_level_name}
                            </option>
                        ))}
                    </select>

                    <select className="form-select form-select-sm" value={selectedValues.searchOfficeID}
                        onChange={(e) => setSelectedValues(prev => ({ ...prev, searchOfficeID: e.target.value })) } >
                        <option value=""> Select Office </option>
                        {searchofficeid.map(office => (
                            <option
                                key={office.office_id}
                                value={office.office_id}
                            >
                                {office.office_name}
                            </option>
                        ))}
                    </select>

                    <button className="btn btn-primary btn-sm" onClick={() => loadOfficeList(selectedValues.searchOfficeLevel ,selectedValues.searchOfficeID) } >
                        <i className="fa fa-search"></i>
                    </button>

                    <button className="btn btn-danger btn-sm" onClick={resetFilter} >
                        <i className="fa fa-refresh"></i>
                    </button>

                </div>
            </div>

            <div className="card-body" style={{ minHeight: "600px" }}>

                <CommonTable
                    data={offices}
                    columns={columns}
                    rowsPerPage={10}
                    keyField="office_id"
                    noRecordMessage="office"
                    renderActions={(b) => (
                        <>
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEdit(b)}
                            >
                                <i className="fa fa-edit text-white"></i>
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    handleUpdateStatus(b, "R")
                                }
                            >
                                <i className="fa fa-trash text-white"></i>
                            </button>

                            {b.status === "A" ? (
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                        handleUpdateStatus(b, "D")
                                    }
                                >
                                    <i className="fa fa-toggle-on text-white"></i>
                                </button>
                            ) : (
                                <button
                                    className="btn btn-danger btn-sm"
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

export default OfficeTable;