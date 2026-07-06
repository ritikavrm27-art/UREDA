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

export default function EligibilityLocation({ data = {}, onChange }) {
  const update = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };
  const toggleApplicantType = (type) => {
    const current = data.applicantTypes || [];

    update(
      "applicantTypes",
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
    );
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
                <ToggleSwitch checked={data.minAreaRequired || false} onChange={(value) => update("minAreaRequired", value)} />
                <span className="toggle-label">{data.minAreaRequired ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Application Fee Required</span>
              <div className="toggle-row">
                <ToggleSwitch checked={data.applicationFeeRequired || false} onChange={(value) => update("applicationFeeRequired", value)} />
                <span className="toggle-label">{data.applicationFeeRequired ? "Yes" : "No"}</span>
              </div>
            </div>
            {data.applicationFeeRequired && (
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Application Fee (₹/Unit)</span>
              <input type="text" className="form-control form-control-sm" placeholder="e.g. 100" value={data.applicationFee || ""} onChange={(e) => update("applicationFee", e.target.value)} />
            </div>
          )}       

          <div className="form-group">
            <span className="form-label col-form-label col-form-label-sm">Applicant Type</span>
            <div className="pill-group">
              {APPLICANT_TYPES.map((type) => (
                <button key={type} type="button" className={`pill ${data.applicantType === type ? "active" : ""}`} onClick={() => update("applicantType", type)} >
                  {type}
                </button>
              ))}
            </div>
          </div>
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Land Ownership</span>
              <select className="selectpicker form-select form-select-sm" value={data.landOwnership || "self"} onChange={(e) => update("landOwnership", e.target.value)}>
                <option value="self">Self</option>
                <option value="leased">Leased</option>
                <option value="any">Any</option>
              </select>
            </div>
            <div className="form-group">
              <span className="form-label col-form-label col-form-label-sm">Location</span>
              <select className="selectpicker form-select form-select-sm" value={data.location || "both"} onChange={(e) => update("location", e.target.value)}>
                <option value="urban">Urban</option>
                <option value="rural">Rural</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <span className="form-label col-form-label col-form-label-sm">Applicable Region</span>
              <select className="selectpicker form-select form-select-sm" value={data.applicableRegion || "entire_state"} onChange={(e) => update("applicableRegion", e.target.value)}  >
                <option value="entire_state">Entire State</option>
                <option value="district">Specific District</option>
                <option value="block">Specific Block</option>
              </select>
          </div>   
          </div>
        </div>
  );
}
