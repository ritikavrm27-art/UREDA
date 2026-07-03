// components/OfficeTable.jsx

import React from "react";
import CommonTable from "../../../components/CommonTable";

function ConfigurationTable({
}) {
    return (
        <div className="card">
            <div className="card-header border-0">
                <div className="d-flex align-items-center">
                    <div>
                        <h5 className="card-title mb-0 fw-bold">
                            Schemes List
                        </h5>
                        <small> All schemes added to the system. </small>
                    </div>
                </div>
            </div>

            <div className="card-body" style={{ minHeight: "600px" }}>
                <div class="text-center text-secondary px-3 pt-5">
                    <div class="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{width:"64px",height:"64px",background:"#ecfeff"}}>
                        <i class="fa fa-file-text-o fa-2x" style={{color:"#0891b2"}}></i>
                    </div>
                    <div class="fw-semibold text-dark mb-1">No Schemes yet</div>
                    <small>Use the form on the right to add your first scheme.</small>
               </div>

            </div>
        </div>
    );
}

export default ConfigurationTable;