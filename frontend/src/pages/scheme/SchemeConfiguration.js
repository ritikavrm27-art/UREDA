import React, { useState, useEffect, useMemo, } from "react";
import SummaryCard from "../../components/SummaryCard";
import CommonInstructions from "../../components/CommonInstructions";
import ConfigurationTable from "./Configuration/ConfigurationTable";
import SubsidyConfiguration from "./Configuration/SubsidyConfiguration";
import InspectionConfiguration from "./Configuration/InspectionConfiguration";
import BasicDetails from "./Configuration/BasicDetails";
import EligibilityLocation from "./Configuration/EligibilityLocation";
import DocumentsRequired from "./Configuration/DocumentsRequired";
import MessageModal from "../../components/MessageModal";
import axiosApi from "../../utils/axiosApi";
import "./Configuration/configuration.css";
import * as bootstrap from "bootstrap";

const configurationInstructions = [
  "Complete each step in sequence: Basic Details, Eligibility & Location, Documents Required, Subsidy Configuration, and Inspection Configuration.",
  "Fields marked with (*) are mandatory and must be completed before proceeding to the next step.",
  "Use the Next and Back buttons to review or update information before final submission.",
  "You can save the configuration as a Draft at any stage and continue editing it later.",
  "A scheme saved as Draft will not be available for use until it is Published.",
  "Only Published schemes are active and available for beneficiary applications and processing.",
  "Once Published, the scheme will automatically become active on its configured Start Date and remain active until its End Date.",
  "Review all configuration details carefully before publishing, as the published configuration will be used for scheme operations."
];

// Defines the wizard steps in order. Add/remove/reorder entries here to
// change the flow without touching the render logic below.
const steps = [
   { key: "basic", label: "Basic Details", Component: BasicDetails },
   { key: "eligibility", label: "Eligibility & Location", Component: EligibilityLocation },
   { key: "documents", label: "Documents Required", Component: DocumentsRequired },
   { key: "subsidy", label: "Subsidy Configuration", Component: SubsidyConfiguration },
   { key: "inspection", label: "Inspection Configuration", Component: InspectionConfiguration },
];

function SchemeConfiguration({ setModuleName }) {

   const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});
   const [currentStep, setCurrentStep] = useState(0);
   const [completedSteps, setCompletedSteps] = useState([]);
   const [formData, setFormData] = useState({ 
    basic: {}, 
    eligibility: {
      minAreaRequired: false,
      applicationFeeRequired: true,
      applicationFee: "",
      applicantTypes: ["Individual", "Industry", "Organization"],
      landOwnership: "self",
      location: "both",
      applicableRegion: "entire_state",
    },
    documents: {}, 
    subsidy: {}, 
    inspection: {} 
  });

   const showMessage = ( title, message, type = "success", isConfirmation = false, onConfirm = null ) => {
                           setMessageModal({ show: true, title, message, type,isConfirmation, onConfirm });};
   const cards = useMemo(() =>[
         { title: "Total Schemes", count: 0,  bgColor: "#eff6ff", iconColor: "#1d4ed8", icon: "fa fa-list-alt" },
         { title: "Draft Schemes", count:  0,  bgColor: "#f0fdf4", iconColor: "#16a34a", icon: "fa fa-list-alt" },
         { title: "Published Schemes", count:  0,  bgColor: "#fffbeb", iconColor: "#d97706", icon: "fa fa-list-alt" },
         
       ], []);  

   useEffect(() => {
    setModuleName("Scheme Configuration");
    }, []);

   const isLastStep = currentStep === steps.length - 1;
   const isFirstStep = currentStep === 0;

   const goToStep = (index) => {
      // Only allow jumping to a step that's already been visited/completed,
      // or the immediate next one — prevents skipping ahead untouched steps.
      if (index <= currentStep || completedSteps.includes(index - 1)) {
         setCurrentStep(index);
      }
   };

   const handleNext = () => {
      setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
      if (!isLastStep) {
         setCurrentStep((prev) => prev + 1);
      }
   };

   const handleBack = () => {
      if (!isFirstStep) {
         setCurrentStep((prev) => prev - 1);
      }
   };

   const handleSaveAll = () => {
      setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
      showMessage("Success", "Scheme configuration saved successfully.", "success");
   };

   const ActiveComponent = steps[currentStep].Component;
   const updateStepData = (stepKey, data) => {
      setFormData((prev) => ({
        ...prev,
        [stepKey]: {
          ...prev[stepKey],
          ...data
        }
      }));
    };

  const handleSaveDraft = () => {
    alert("Draft saved. Check console for JSON payload.");
  };

  const handlePublish = () => {
    alert("Scheme published. Check console for JSON payload.");
  };
return (

      <div className="container-fluid content-inner mt-n5 px-3 py-0">
        <div className="row g-3 py-3">
          <div className="col-xl-2 col-lg-4">
            {cards.map((card, index) => (
                <SummaryCard key={index} {...card} />
              ))}
            <CommonInstructions title="Instructions" instructions={configurationInstructions} />               
          </div>
          <div className="col-xl-4 col-lg-3">
            <ConfigurationTable />
          </div>
          <div className="col-xl-6 col-lg-3">

            {/* Step indicator */}
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between border-0">
                  <div className="header-title">
                     <h5 className="card-title m-0 fw-bold">Scheme Configuration</h5>
                     <small className="head-sub">
                        Fill in the details below and save configuration details</small>
                  </div>
               </div>
              <div className="card-body py-3">
                <div className="d-flex justify-content-between position-relative border-bottom mb-3 pb-2">
                  <div className="position-absolute bg-light" style={{ top: "17px", left: "0", right: "0", height: "3px", zIndex: 0 }} />
                  <div className="position-absolute bg-primary" style={{ top: "17px", left: "0", height: "3px", zIndex: 1, 
                  width: `${(currentStep / (steps.length - 1)) * 100}%`, transition: "width 0.3s ease", }} />
                  {steps.map((step, index) => {
                     const isActive = index === currentStep;
                     const isCompleted = completedSteps.includes(index) && index !== currentStep;
                     const isClickable = index <= currentStep || completedSteps.includes(index - 1);
                     return (
                        <div key={step.key} className="d-flex flex-column align-items-center position-relative"
                          style={{ zIndex: 2, flex: 1, cursor: isClickable ? "pointer" : "default" }} onClick={() => isClickable && goToStep(index)} >
                          <div className={ "rounded-circle d-flex align-items-center justify-content-center fw-bold " +
                              (isActive ? "bg-primary text-white" : isCompleted ? "bg-success text-white" : "bg-light text-muted") }
                            style={{ width: "36px", height: "36px", border: "3px solid #fff" }} >
                            {isCompleted ? "✓" : index + 1}
                          </div>
                          <small className={"mt-1 text-center " + (isActive ? "text-primary fw-semibold" : "text-muted")} style={{ fontSize: "0.72rem", maxWidth: "80px" }} >
                            {step.label}
                          </small>
                        </div>
                     );
                  })}
                </div>
                <ActiveComponent
                  data={formData[steps[currentStep].key]}
                  onChange={(data) => updateStepData(steps[currentStep].key, data)} />                
                  
                  <div className="d-flex justify-content-between align-items-center mt-3 mb-4 border-top pt-3">
                    <div>
                      {!isFirstStep && (
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={handleBack} >
                          <i className="fa fa-arrow-left"></i> Back
                        </button>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" className="btn btn-warning text-white" onClick={handleSaveDraft} >
                        <i className="fa fa-check"></i> Save Draft
                      </button>
                      <button type="button" className="btn btn-danger" >
                        <i className="fa fa-times"></i> Cancel
                      </button>

                      {isLastStep && (
                        <button type="button" className="btn btn-primary" onClick={handlePublish} >
                          <i className="fa fa-check"></i> Publish Scheme
                        </button>
                      )}

                      {!isLastStep && (
                        <button type="button" className="btn btn-primary px-4" onClick={handleNext} >
                          Next <i className="fa fa-arrow-right"></i>
                        </button>
                      )}

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
         isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
         onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />
      </div>
      
 );
}

export default SchemeConfiguration;