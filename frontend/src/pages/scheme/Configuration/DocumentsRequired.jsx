import React, { useState } from "react";
import "./configuration.css";

function DocColumn({ title, options, selected, onToggle }) {
  return (
    <div className="doc-column">
      <div className="doc-column-title">{title}</div>
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <div key={opt} className="doc-option" onClick={() => onToggle(opt)}>
            <span className={`doc-checkbox ${checked ? "checked" : ""}`}>{checked ? "✓" : ""}</span>
            <span className="doc-option-label">{opt}</span>
          </div>
        );
      })}
    </div>
  );
}

const ID_PROOF_OPTIONS = ["Aadhar", "Driving License", "Passport"];
const ADDRESS_PROOF_OPTIONS = ["Voter ID", "Aadhar", "Utility Bill"];
const OTHER_PROOF_OPTIONS = ["Bank Passbook", "Electricity Bill", "Income Certificate"];

export default function DocumentsRequired() {
  const [idProof, setIdProof] = useState(["Aadhar"]);
  const [addressProof, setAddressProof] = useState(["Voter ID", "Aadhar"]);
  const [otherProof, setOtherProof] = useState(["Bank Passbook"]);

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const allSelected = [...idProof, ...addressProof, ...otherProof];

  return (
    <div className="">
          <div className="config-header">
            <div>
              <h5>Step 3: Documents Required</h5>
              <small>What applicants must upload</small>
            </div>
          </div>

          <div className="documents-grid">
            <DocColumn
              title="ID Proof"
              options={ID_PROOF_OPTIONS}
              selected={idProof}
              onToggle={(v) => toggle(idProof, setIdProof, v)}
            />
            <DocColumn
              title="Address Proof"
              options={ADDRESS_PROOF_OPTIONS}
              selected={addressProof}
              onToggle={(v) => toggle(addressProof, setAddressProof, v)}
            />
            <DocColumn
              title="Other Documents"
              options={OTHER_PROOF_OPTIONS}
              selected={otherProof}
              onToggle={(v) => toggle(otherProof, setOtherProof, v)}
            />
          </div>

          <div className="selected-bar">
            <span className="selected-label">Selected:</span>
            {allSelected.length === 0 ? (
              <span className="selected-label">None</span>
            ) : (
              allSelected.map((item, i) => (
                <span key={`${item}-${i}`} className="selected-tag">
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
  );
}
