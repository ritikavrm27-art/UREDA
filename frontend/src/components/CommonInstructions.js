import React from "react";

function CommonInstructions({
  title = "Instructions",
  instructions = [],
}) {
  return (
    <div className="card">
      <div className="card-header border-0 px-3">
        <h6 class="d-flex align-items-center gap-2">
            <i class="fa fa-info-circle text-amber"></i> {title}
          </h6>
      </div>

      <div className="card-body pt-0">
        <ol className="form-label col-form-label col-form-label-sm px-2 instructions-card">
          {instructions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CommonInstructions;