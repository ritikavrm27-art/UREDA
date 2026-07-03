import React, { useState } from "react";
import "./configuration.css";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

function makeDefaultCategory(key) {
  return {
    key,
    minCapacity: "",
    maxCapacity: "",
    subsidyType: key === "domestic" ? "slab" : "fixed",
    fixedAmount: "",
    percentage: "",
    slabs: [{ id: uid(), from: "", to: "", rate: "" }],
  };
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */

function SlabRow({ slab, onChange, onRemove, disableRemove }) {
  return (
    <div className="slab-row">
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="From"
        value={slab.from}
        onChange={(e) => onChange({ ...slab, from: e.target.value })}
      />
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="To kW"
        value={slab.to}
        onChange={(e) => onChange({ ...slab, to: e.target.value })}
      />
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="₹ per unit"
        value={slab.rate}
        onChange={(e) => onChange({ ...slab, rate: e.target.value })}
      />
      <button
        type="button"
        className="slab-remove"
        onClick={onRemove}
        disabled={disableRemove}
        title="Remove slab"
      >
        🗑
      </button>
    </div>
  );
}

function CategoryPanel({ label, panelClass, dotClass, category, onUpdate }) {
  const updateField = (field, value) => onUpdate({ ...category, [field]: value });

  const updateSlab = (id, newSlab) => {
    const slabs = category.slabs.map((s) => (s.id === id ? newSlab : s));
    onUpdate({ ...category, slabs });
  };

  const addSlab = () => {
    const slabs = [...category.slabs, { id: uid(), from: "", to: "", rate: "" }];
    onUpdate({ ...category, slabs });
  };

  const removeSlab = (id) => {
    const slabs = category.slabs.filter((s) => s.id !== id);
    onUpdate({ ...category, slabs });
  };

  return (
    <div className={`panel ${panelClass}`}>
      <div className="panel-title">
        <span className={dotClass}></span>
        {label}
      </div>

      <div className="field-grid" style={{ marginBottom: "12px" }}>
        <div>
          <span className="form-label col-form-label col-form-label-sm">Min Capacity</span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. 1"
            value={category.minCapacity}
            onChange={(e) => updateField("minCapacity", e.target.value)}
          />
        </div>
        <div>
          <span className="form-label col-form-label col-form-label-sm">Max Capacity</span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. 500"
            value={category.maxCapacity}
            onChange={(e) => updateField("maxCapacity", e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <span className="form-label col-form-label col-form-label-sm">Subsidy Type</span>
        <select
          className="selectpicker form-select form-select-sm"
          value={category.subsidyType}
          onChange={(e) => updateField("subsidyType", e.target.value)}
        >
          <option value="slab">Slab / Unit based</option>
          <option value="fixed">Fixed</option>
          <option value="percentage">Percentage</option>
        </select>
      </div>

      {category.subsidyType === "slab" && (
        <div>
          <span className="form-label col-form-label col-form-label-sm">Slabs</span>
          {category.slabs.map((slab) => (
            <SlabRow
              key={slab.id}
              slab={slab}
              onChange={(newSlab) => updateSlab(slab.id, newSlab)}
              onRemove={() => removeSlab(slab.id)}
              disableRemove={category.slabs.length === 1}
            />
          ))}
          <button type="button" className="btn-dashed" onClick={addSlab}>
            + Add slab
          </button>
        </div>
      )}

      {category.subsidyType === "fixed" && (
        <div>
          <span className="form-label col-form-label col-form-label-sm">Fixed Amount (₹)</span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. 78000"
            value={category.fixedAmount}
            onChange={(e) => updateField("fixedAmount", e.target.value)}
          />
        </div>
      )}

      {category.subsidyType === "percentage" && (
        <div>
          <span className="form-label col-form-label col-form-label-sm">Percentage (%)</span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. 40"
            value={category.percentage || ""}
            onChange={(e) => updateField("percentage", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

function CommonFields({ common, onChange }) {
  const update = (field, value) => onChange({ ...common, [field]: value });

  return (
    <div className="field-grid">
      <div className="form-group">
        <span className="form-label col-form-label col-form-label-sm">Max Subsidy Cap (₹)</span>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="78000"
          value={common.maxSubsidyCap}
          onChange={(e) => update("maxSubsidyCap", e.target.value)}
        />
      </div>
      <div className="form-group">
        <span className="form-label col-form-label col-form-label-sm">Eligibility Dependency</span>
        <select
          className="selectpicker form-select form-select-sm"
          value={common.eligibilityDependency}
          onChange={(e) => update("eligibilityDependency", e.target.value)}
        >
          <option value="pass">Inspection Status: Passed</option>
          <option value="pending">Inspection Status: Pending</option>
          <option value="none">No dependency</option>
        </select>
      </div>

      <div className="form-group">
        <span className="form-label col-form-label col-form-label-sm">Disbursement Mode</span>
        <select
          className="selectpicker form-select form-select-sm"
          value={common.disbursementMode}
          onChange={(e) => update("disbursementMode", e.target.value)}
        >
          <option value="dbt">DBT (Direct Benefit Transfer)</option>
          <option value="adjustment">Bill Adjustment</option>
          <option value="cheque">Cheque</option>
        </select>
      </div>
      <div className="form-group">
        <span className="form-label col-form-label col-form-label-sm">Income Threshold (₹)</span>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="e.g. < 5 lac"
          value={common.incomeThreshold}
          onChange={(e) => update("incomeThreshold", e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label col-form-label col-form-label-sm">Min Usage Threshold</span>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="e.g. 100 units/month"
          value={common.minUsageThreshold}
          onChange={(e) => update("minUsageThreshold", e.target.value)}
        />
      </div>
      <div className="form-group">
        <span className="form-label col-form-label col-form-label-sm">Amount Threshold (₹)</span>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="e.g. 50000"
          value={common.amountThreshold}
          onChange={(e) => update("amountThreshold", e.target.value)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

export default function SubsidyConfiguration() {
  const [systemType, setSystemType] = useState("capacity"); // 'capacity' | 'unit'

  const [domestic, setDomestic] = useState(makeDefaultCategory("domestic"));
  const [commercial, setCommercial] = useState(makeDefaultCategory("commercial"));
  const [numberOfUnits, setNumberOfUnits] = useState("");

  const [common, setCommon] = useState({
    maxSubsidyCap: "78000",
    eligibilityDependency: "pass",
    disbursementMode: "dbt",
    incomeThreshold: "",
    minUsageThreshold: "",
    amountThreshold: "",
  });

  const copyDomesticToCommercial = () => {
    setCommercial({
      ...domestic,
      key: "commercial",
      slabs: domestic.slabs.map((s) => ({ ...s, id: uid() })),
    });
  };

  const copyCommercialToDomestic = () => {
    setDomestic({
      ...commercial,
      key: "domestic",
      slabs: commercial.slabs.map((s) => ({ ...s, id: uid() })),
    });
  };

  const handleSubmit = () => {
    const payload = {
      systemType,
      ...(systemType === "capacity" ? { domestic, commercial } : { numberOfUnits }),
      ...common,
    };
    console.log("Subsidy configuration payload:", payload);
    alert("Configuration saved. Check console for JSON payload.");
  };

  return (
    <div>
          <div className="config-header">
            <div>
              <h5>Step 4: Subsidy Configuration</h5>
              <small>Capacity, slabs and caps</small>
            </div>
          </div>

          <span className="section-label">SYSTEM TYPE</span>
          <div className="system-type-row">
            <div
              className={`system-type-option ${systemType === "capacity" ? "active" : ""}`}
              onClick={() => setSystemType("capacity")}
            >
              <span className="radio-dot">
                <span className="inner-dot"></span>
              </span>
              <div>
                <div className="opt-title">Capacity-driven</div>
                <div className="opt-sub">Min/Max capacity in kW</div>
              </div>
            </div>

            <div
              className={`system-type-option ${systemType === "unit" ? "active" : ""}`}
              onClick={() => setSystemType("unit")}
            >
              <span className="radio-dot">
                <span className="inner-dot"></span>
              </span>
              <div>
                <div className="opt-title">Unit-driven</div>
                <div className="opt-sub">Number of units</div>
              </div>
            </div>
          </div>

          {systemType === "capacity" ? (
            <>
              <div className="copy-btn-row py-2">
                <button type="button" className="btn-copy" onClick={copyDomesticToCommercial}>
                 <i class="fa fa-copy"></i> Copy Domestic → Commercial
                </button>
                <button type="button" className="btn-copy" onClick={copyCommercialToDomestic}>
                  <i class="fa fa-copy"></i> Copy Commercial → Domestic
                </button>
              </div>

              <>
              <div className="row">
                  <div className="col-md-6 mb-3">
                    <CategoryPanel label="Domestic"
                      panelClass="panel-domestic"
                      dotClass="dot-pink"
                      category={domestic}
                      onUpdate={setDomestic}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <CategoryPanel
                      label="Commercial"
                      panelClass="panel-commercial"
                      dotClass="dot-purple"
                      category={commercial}
                      onUpdate={setCommercial}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12">
                    <CommonFields common={common} onChange={setCommon} />
                  </div>
              </div>
            </>
            </>
          ) : (
            <div className="subsidy-unit-row">
              <div className="unit-field">
                <span className="form-label col-form-label col-form-label-sm">Number of Units</span>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. 50"
                  value={numberOfUnits}
                  onChange={(e) => setNumberOfUnits(e.target.value)}
                />
              </div>
              <div className="unit-common">
                <CommonFields common={common} onChange={setCommon} />
              </div>
            </div>
          )}
        </div>
  );
}
