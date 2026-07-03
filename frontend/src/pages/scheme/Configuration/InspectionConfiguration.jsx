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

function ChecklistItem({ label, checked, onToggle }) {
  return (
    <div className="checklist-item" onClick={onToggle}>
      <span className={`checklist-checkbox ${checked ? "checked" : ""}`}>{checked ? "✓" : ""}</span>
      <span className="checklist-text">
        {label}
      </span>
    </div>
  );
}

const DEFAULT_CHECKLIST = [
  { id: "install", label: "Installation done", checked: true },
  { id: "location", label: "Location verified", checked: true },
  { id: "capacity", label: "Capacity verified", checked: true },
  { id: "invoice", label: "Invoice matches installation", checked: true },
  { id: "electricity", label: "Electricity connection verified", checked: true },
  { id: "documents", label: "Documents verified", checked: true },
];

export default function InspectionConfiguration() {
  const [inspectionRequired, setInspectionRequired] = useState(true);
  const [inspectionStage, setInspectionStage] = useState("both");
  const [inspectionType, setInspectionType] = useState("physical");
  const [preInspectionBy, setPreInspectionBy] = useState("ureda");
  const [postInspectionBy, setPostInspectionBy] = useState("third_party");
  const [thirdPartyName, setThirdPartyName] = useState("upcl");
  const [daysForInspection, setDaysForInspection] = useState("7");
  const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST);

  const toggleChecklistItem = (id) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const buildPayload = () => ({
    inspectionRequired,
    inspectionStage,
    inspectionType,
    preInspectionBy,
    postInspectionBy,
    thirdPartyName: postInspectionBy === "third_party" ? thirdPartyName : null,
    daysForInspection,
    checklist,
  });

  const handleSaveDraft = () => {
    console.log("Draft saved:", buildPayload());
    alert("Draft saved. Check console for JSON payload.");
  };

  const handlePublish = () => {
    console.log("Scheme published:", buildPayload());
    alert("Scheme published. Check console for JSON payload.");
  };

  return (
        <div>
          <div className="config-header">
            <div>
              <h5>Step 5: Inspection Configuration</h5>
              <small>Verification process</small>
            </div>
          </div>

          <span className="section-label">Inspection Required</span>
          <div className="toggle-row" style={{ marginBottom: "26px" }}>
            <ToggleSwitch checked={inspectionRequired} onChange={setInspectionRequired} />
            <span className="toggle-label">{inspectionRequired ? "Yes" : "No"}</span>
          </div>

          {inspectionRequired && (
            <>
              <div className="field-grid" style={{ marginBottom: "24px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <span className="form-label col-form-label col-form-label-sm">Inspection Stage</span>
                  <select
                    className="selectpicker form-select form-select-sm"
                    value={inspectionStage}
                    onChange={(e) => setInspectionStage(e.target.value)}
                  >
                    <option value="pre">Pre</option>
                    <option value="post">Post</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <span className="form-label col-form-label col-form-label-sm">Inspection Type</span>
                  <select
                    className="selectpicker form-select form-select-sm"
                    value={inspectionType}
                    onChange={(e) => setInspectionType(e.target.value)}
                  >
                    <option value="physical">Physical</option>
                    <option value="virtual">Virtual</option>
                    <option value="document">Document only</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <span className="form-label col-form-label col-form-label-sm">Pre Inspection By</span>
                  <select
                    className="selectpicker form-select form-select-sm"
                    value={preInspectionBy}
                    onChange={(e) => setPreInspectionBy(e.target.value)}
                  >
                    <option value="ureda">UREDA</option>
                    <option value="discom">DISCOM</option>
                    <option value="third_party">Third Party</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <span className="form-label col-form-label col-form-label-sm">Post Inspection By</span>
                  <select
                    className="selectpicker form-select form-select-sm"
                    value={postInspectionBy}
                    onChange={(e) => setPostInspectionBy(e.target.value)}
                  >
                    <option value="ureda">UREDA</option>
                    <option value="discom">DISCOM</option>
                    <option value="third_party">Third Party</option>
                  </select>
                </div>

                {postInspectionBy === "third_party" && (
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <span className="form-label col-form-label col-form-label-sm">Post Inspection — Third Party Name</span>
                    <select
                      className="selectpicker form-select form-select-sm"
                      value={thirdPartyName}
                      onChange={(e) => setThirdPartyName(e.target.value)}
                    >
                      <option value="upcl">UPCL</option>
                      <option value="tuv">TUV India</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <span className="form-label col-form-label col-form-label-sm">Days for Inspection</span>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. 7"
                    value={daysForInspection}
                    onChange={(e) => setDaysForInspection(e.target.value)}
                  />
                </div>
              </div>

              <span className="form-label col-form-label col-form-label-sm">Checklist</span>
              <div className="checklist-grid">
                {checklist.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    label={item.label}
                    checked={item.checked}
                    onToggle={() => toggleChecklistItem(item.id)}
                  />
                ))}
              </div>
            </>
          )}
          <div className="text-end border-top pt-3 mt-3">
            <button type="button" className="text-white btn btn-warning" onClick={handleSaveDraft}>
              Save Draft
            </button> &nbsp;
            <button type="button" className="btn btn-success" onClick={handlePublish}>
              Publish Scheme
            </button>
        </div>
      </div>
  );
}
