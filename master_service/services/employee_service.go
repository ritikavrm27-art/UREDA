package services

import (
	"log"
	"userapi/config"
	"userapi/models"
	"userapi/repositories"
)

func GetReligion() ([]models.ReligionModel, error) {
	return repositories.GetReligion()
}
func GetDesignation() ([]models.DesignationModel, error) {
	return repositories.GetDesignation()
}
func GetNameTitle() ([]models.NameTitleModel, error) {
	return repositories.GetNameTitle()
}
func InsertUpdateEmployee(model models.EmployeePersonalModel, action string, status string, actionLogID int) (bool, string, error) {
	var success bool
	var message string
	var dob interface{}
	var joiningDate interface{}

	if model.DOB == "" {
		dob = nil
	} else {
		dob = model.DOB
	}

	if model.JoiningDate == "" {
		joiningDate = nil
	} else {
		joiningDate = model.JoiningDate
	}

	err := config.DB.QueryRow(`select success, message from public.f_insertupdate_employeedetail($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,
		$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29)`,
		action, model.EmpID, model.EmpCode, model.Title, model.EmpName, model.EmpNameLocal, model.FatherName, model.FatherNameLocal,
		model.MotherName, model.MotherNameLocal, model.SpouseName, model.SpouseNameLocal, model.Photo, dob,
		model.Gender, model.ReligionID, model.StateID, model.DistrictID, model.Address, model.Mobile1, model.Mobile2, model.EmailID,
		model.OfficeLevelID, model.OfficeID, joiningDate, model.DesignationID, model.EmpType, status, actionLogID).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func GetEmployeeList(OfficeLevelID int, OfficeID string, Status string, VerifiedStatus string, searchText string) ([]models.EmployeePersonalModel, error) {
	return repositories.GetEmployeeList(OfficeLevelID, OfficeID, Status, VerifiedStatus, searchText)
}
