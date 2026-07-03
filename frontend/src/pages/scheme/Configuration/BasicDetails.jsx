import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./configuration.css";

const SECTORS = ["Domestic", "Commercial", "Both"];

export default function BasicDetails() {
  const [schemeName, setSchemeName] = useState("");
  const [category, setCategory] = useState("solar");
  const [subcategory, setSubcategory] = useState("grid_rooftop");
  const [measuringUnit, setMeasuringUnit] = useState("kW");
  const [technology, setTechnology] = useState("Solar PV");
  const [schemeType, setSchemeType] = useState("subsidy");
  const [status, setStatus] = useState("active");
  const [startDate, setStartDate] = useState("2025-04-01");
  const [endDate, setEndDate] = useState("2030-03-31");
  const [sector, setSector] = useState("Both");
  const [description, setDescription] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [image, setImage] = useState(null);
  const [terms, setTerms] = useState("");

  return (
     <div className="">
          <div className="config-header">
            <div>
              <h5>Step 1: Basic Details</h5>
              <small>Identify the scheme</small>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label col-form-label col-form-label-sm">Scheme Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="e.g. PM Surya Ghar Muft Bijli Yojana"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)}
            />
          </div>

          <div className="field-grid">
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Category</label>
              <select className="selectpicker form-select form-select-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="solar">Solar</option>
                <option value="wind">Wind</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Subcategory</label>
              <select className="selectpicker form-select form-select-sm" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                <option value="grid_rooftop">Grid Connected Rooftop Solar</option>
                <option value="off_grid">Off Grid Solar</option>
                <option value="ground_mounted">Ground Mounted Solar</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Measuring Unit</label>
              <select className="selectpicker form-select form-select-sm" value={measuringUnit} onChange={(e) => setMeasuringUnit(e.target.value)}>
                <option value="kwh">Kilowatt-hour (kWh)</option>
                <option value="mw">Megawatt (MW)</option>
                <option value="kw">Kilowatt (kW)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Technology</label>
              <select className="selectpicker form-select form-select-sm" value={technology} onChange={(e) => setTechnology(e.target.value)}>
                <option value="solar">Solar</option>
                <option value="wind">Wind</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Scheme Type</label>
              <select className="selectpicker form-select form-select-sm" value={schemeType} onChange={(e) => setSchemeType(e.target.value)}>
                <option value="subsidy">Subsidy</option>
                <option value="loan">Loan</option>
                <option value="rebate">Rebate</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Status</label>
              <select className="selectpicker form-select form-select-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Start Date</label>
              <div className="input-group">
                <DatePicker onChange={(e) => setStartDate(e.target.value)} className="form-control form-control-sm w-100"
                    dateFormat="dd/MM/yyyy" showMonthDropdown showYearDropdown dropdownMode="select" placeholderText="DD/MM/YYYY" />
                <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">End Date</label>
              <div className="input-group">
                <DatePicker onChange={(e) => setEndDate(e.target.value)} className="form-control form-control-sm w-100"
                    dateFormat="dd/MM/yyyy" showMonthDropdown showYearDropdown dropdownMode="select" placeholderText="DD/MM/YYYY" />
                <span className="input-group-text"> <i className="fa fa-calendar"></i> </span>
              </div>
            </div>

          <div className="form-group">
            <label className="form-label col-form-label col-form-label-sm">Sector</label>
            <div className="pill-group">
              {SECTORS.map((s) => (
                <button key={s} type="button" className={`pill ${sector === s ? "active" : ""}`} onClick={() => setSector(s)} >
                  {s}
                </button>
              ))}
            </div>
          </div>
          </div>

          <div className="form-group py-2">
            <label className="form-label col-form-label col-form-label-sm">Description</label>
            <textarea
              className="form-control form-control-sm"
              placeholder="Brief about the scheme..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="field-grid">
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Brochure (Pdf)</label>
              <input
                type="file"
                accept="application/pdf"
                className="form-control form-control-sm"
                onChange={(e) => setBrochure(e.target.files?.[0] || null)}
              />
            </div>
            <div className="form-group">
              <label className="form-label col-form-label col-form-label-sm">Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <div className="form-group pt-2">
            <label className="form-label col-form-label col-form-label-sm">Terms &amp; Conditions</label>
            <textarea
              className="form-control form-control-sm"
              placeholder="Enter terms..."
              rows={3}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
          </div>
      </div>
  );
}
