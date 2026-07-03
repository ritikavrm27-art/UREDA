import React, { useState } from "react";
import { Form } from "react-bootstrap";

function SchemeMastersForm({ 
    module,
    formData,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    dropdowns,
    handleSaveConfirmation,
    handleReset
 }) {
const validate = () => {
   let newErrors = {};

   module.fields.forEach((field) => {
      const value = (formData[field.name] ?? "").toString().trim();

      // Required validation
      if (field.required && value === "") {
         newErrors[field.name] = `${field.label} is required`;
         return;
      }

      // Pattern validation (only if value is entered)
      if (value !== "" && field.pattern && !field.pattern.test(value)) {
         newErrors[field.name] =
            field.validationMessage || `Invalid ${field.label}`;
      }

      // Mobile number validation
      if (
         value !== "" &&
         (field.name === "contact_no_1" || field.name === "contact_no_2")
      ) {
         if (!/^\d{10}$/.test(value)) {
            newErrors[field.name] =
               field.validationMessage || "Please enter a valid 10-digit mobile number";
         }
      }

      // Email validation
      if (value !== "" && field.type === "email") {
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors[field.name] =
               field.validationMessage || "Please enter a valid email address";
         }
      }
   });

   setErrors(newErrors);

   return Object.keys(newErrors).length === 0;
};
const renderField = (field, index) => {
   const fieldId = `field-${index}`;

      if(field.type==="select"){
         let options=[];
         if(field.optionKey){
            options=dropdowns[field.optionKey] || []; }
         else{
            options=field.options || [];
         }

         return(<>
         <select id={fieldId} name={field.name} value={formData[field.name] || ""} onChange={handleChange} 
         className={`form-select form-select-sm ${ errors[field.name] ? "is-invalid" : "" }`} >
            <option value="">Select</option>
            {options.map((item,index)=>(
               <option key={index} value={item[field.valueField] ?? item.value ?? item.id} >
               {item[field.textField] ?? item.label ?? item.name}
               </option>
            ))}
         </select>
         {errors[field.name] && ( <div className="invalid-feedback"> {errors[field.name]} </div> )}
         </>
         );
      }
      if (field.type === "textarea") {
         return (
            <textarea id={fieldId} name={field.name} value={formData[field.name] || ""} onChange={handleChange} className="form-control form-control-sm"
                  placeholder={field.placeholder} rows={3} />
         );
      }
   return (<>
      <input type={field.type || "text"} name={field.name} value={formData[field.name] || ""} 
      onChange={(e) => {
         let value = e.target.value;

         // Allow only numbers for numeric fields
         if (field.pattern === /^[0-9]*$/) {
            value = value.replace(/\D/g, "");
         }

         handleChange({
            target: {
               name: field.name,
               value,
            },
         });
      }}
    id={fieldId}  maxLength={field.maxLength}
      className={`form-control form-control-sm ${ errors[field.name] ? "is-invalid" : "" }`} placeholder={field.placeholder} />
      {errors[field.name] && (<div className="invalid-feedback">{errors[field.name]} </div> )} </> );
   };

   return (
      <div className="border-bottom px-3 py-3">
         <div className="d-flex align-items-center">
               <div>
                  <h5 className="card-title m-0 fw-bold">
                     {formData.action === "U"
                        ? `Update ${module.title}`
                        : module.formTitle}
                  </h5>

                  <small>
                     {formData.action === "U"
                        ? "Modify the details below and update."
                        : "Fill in the details below and save."}
                  </small>
               </div>
            </div>
         <div className="p-3">
            <Form onSubmit={(e) => {e.preventDefault();
             if (validate()) {
                  handleSaveConfirmation(e);
               }
            }}>
               <div className="row">
                  {module.fields.map((field, index) => (
                     <div className="col-md-6 mb-3" key={index}>
                        <label className="form-label col-form-label col-form-label-sm" htmlFor="fname">
                           {field.label}
                           {field.required && (
                              <span className="text-danger"> *</span>
                           )}
                        </label>
                        {renderField(field, index)}
                     </div>
                  ))}
               </div>
               <div className="text-end border-top pt-3">
                  <button type="submit" className="btn btn-primary btn-sm me-2" >
                     <i className="fa fa-check"></i> {formData.action === "U"
                        ? `Update`
                        : `Save`}
                  </button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={handleReset} >
                     <i className="fa fa-times"></i> Cancel
                  </button>
               </div>
            </Form>
         </div>
      </div>
   );
}

export default SchemeMastersForm;