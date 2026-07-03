import React, { useState } from "react";

const CommonTable = ({
  data = [],
  columns = [],
  keyField = "id",
  renderActions,
  noRecordMessage,
  tableId = "common-table",
  rowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const showPagination = data.length > rowsPerPage;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="table-responsive">
      {data.length === 0 ? (
        <div class="text-center text-secondary px-3 pt-5">
               <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{width:"64px",height:"64px",background:"#ecfeff"}}>
                  <i class="fa fa-file-text-o fa-2x" style={{color:"#0891b2"}}></i>
                </div>
                <div class="fw-semibold text-dark mb-1">No {noRecordMessage} yet</div>
                  <small>Use the form on the right to add your first {noRecordMessage}.</small>
               </div>
      ) : (
        <>
          <table
            id={tableId}
            className="table table-striped form-label col-form-label col-form-label-sm"
            role="grid"
          >
            <thead>
              <tr className="align-top">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={col.style}
                    className="align-top"
                  >
                    {col.header}
                  </th>
                ))}

                {renderActions && (
                  <th
                    style={{ minWidth: "100px" }}
                    className="align-top"
                  >
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, rowIndex) => (
                <tr
                  key={row[keyField] ?? `${startIndex}-${rowIndex}`}
                  className="align-top"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="align-top">
                      {col.render
                        ? col.render(row, rowIndex + startIndex)
                        : row[col.accessor]}
                    </td>
                  ))}

                  {renderActions && (
                    <td className="align-top">
                      <div className="d-flex align-items-center gap-2">
                        {renderActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {showPagination && (
          <div className="d-flex justify-content-between align-items-center mt-3 small">
            <span>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + rowsPerPage, data.length)} of{" "}
              {data.length} records
            </span>

            <ul className="pagination mb-0 small">
              <li
                className={`page-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
          // pagination code ends
          )}
        </>
      )}
    </div>
  );
};

export default CommonTable;