import React from "react";
import CommonTable from "../../../components/CommonTable";

function SchemeMastersTable({
    module,
    data = [],
    handleEdit,
    handleUpdateStatus
}) {

    // Default fallback columns if module doesn't define
    const defaultColumns = module?.fields
        ? module.fields.map((field, index) => ({
            header: field.label,
            render: (row) => row[field.name] ?? "-"
        }))
        : [];

    // Optional: add serial number column
    const columns = [
        {
            header: "#",
            render: (row, index) => index + 1
        },
        ...(module.tableColumns || [])
    ];

    // Generic actions (can be overridden per module later)
    const renderActions = (row) => (
        <>
            {handleEdit && (
                <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(row)} >
                    <i className="fa fa-edit text-white"></i>
                </button>
            )}

            {handleUpdateStatus && (
                <button className="btn btn-danger btn-sm me-1" onClick={() => handleUpdateStatus(row,"R")} >
                    <i className="fa fa-trash text-white"></i>
                </button>
            )}

            {handleUpdateStatus && (
                row.status === "A" ? (
                    <button className="btn btn-success btn-sm" onClick={() => handleUpdateStatus(row, "D")} >
                        <i className="fa fa-toggle-on text-white"></i>
                    </button>
                ) : (
                    <button className="btn btn-danger btn-sm" onClick={() => handleUpdateStatus(row, "A")} >
                        <i className="fa fa-toggle-off text-white"></i>
                    </button>
                )
            )}
        </>
    );

    return (
        <div className="border-bottom px-3 py-3">
            {/* Header */}
            <div>
                <h5 className="card-title mb-0 fw-bold">
                    {module.listTitle}
                </h5>
                <small>All {module.listSubTitle} are listed below</small>
            </div>

            {/* Table */}
            <div className="p-3">
                <CommonTable
                    data={data}
                    columns={columns}
                    rowsPerPage={10}
                    keyField="id"
                    noRecordMessage={module.title}
                    renderActions={renderActions}
                />
            </div>

        </div>
    );
}

export default SchemeMastersTable;