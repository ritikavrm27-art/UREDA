import React, { useState } from "react";
import "./configuration.css";

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`toggle-switch ${checked ? "on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="toggle-knob"></span>
    </button>
  );
}

const APPLICANT_TYPES = ["Individual", "Industry", "Organization"];

export default function EligibilityLocation() {
  const [minAreaRequired, setMinAreaRequired] = useState(false);
  const [applicationFeeRequired, setApplicationFeeRequired] = useState(true);
  const [applicationFee, setApplicationFee] = useState("");
  const [applicantTypes, setApplicantTypes] = useState(["Individual", "Industry", "Organization"]);
  const [landOwnership, setLandOwnership] = useState("self");
  const [location, setLocation] = useState("both");
  const [applicableRegion, setApplicableRegion] = useState("entire_state");

  const toggleApplicantType = (type) => {
    setApplicantTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  return (
     <div className="">
          <div className="config-header">
            <div>
              <h5>Step 2: Eligibility &amp; Location</h5>
              <small>Who can apply and from where</small>
            </div>
          </div>

          <div className="field-grid">
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Min Area Required</span>
              <div className="toggle-row">
                <ToggleSwitch checked={minAreaRequired} onChange={setMinAreaRequired} />
                <span className="toggle-label">{minAreaRequired ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Application Fee Required</span>
              <div className="toggle-row">
                <ToggleSwitch checked={applicationFeeRequired} onChange={setApplicationFeeRequired} />
                <span className="toggle-label">{applicationFeeRequired ? "Yes" : "No"}</span>
              </div>
            </div>
            {applicationFeeRequired && (
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Application Fee (₹/Unit)</span>
              <input type="text" className="form-control form-control-sm" placeholder="e.g. 100" value={applicationFee} onChange={(e) => setApplicationFee(e.target.value)} />
            </div>
          )}       

          <div className="form-group">
            <span className="form-label col-form-label col-form-label-sm">Applicant Type</span>
            <div className="pill-group">
              {APPLICANT_TYPES.map((type) => (
                <button key={type} type="button" className={`pill-orange ${applicantTypes.includes(type) ? "active" : ""}`} onClick={() => toggleApplicantType(type)} >
                  {type}
                </button>
              ))}
            </div>
          </div>
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Land Ownership</span>
              <select className="selectpicker form-select form-select-sm" value={landOwnership} onChange={(e) => setLandOwnership(e.target.value)}>
                <option value="self">Self</option>
                <option value="leased">Leased</option>
                <option value="any">Any</option>
              </select>
            </div>
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Location</span>
              <select className="selectpicker form-select form-select-sm" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="urban">Urban</option>
                <option value="rural">Rural</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <span className="form-label col-form-label col-form-label-sm">Applicable Region</span>
              <select className="selectpicker form-select form-select-sm" value={applicableRegion} onChange={(e) => setApplicableRegion(e.target.value)}  >
                <option value="entire_state">Entire State</option>
                <option value="district">Specific District</option>
                <option value="block">Specific Block</option>
              </select>
          </div>   
          </div>
        </div>
  );
}
