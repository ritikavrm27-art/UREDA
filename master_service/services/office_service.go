package services

import (
	"log"
	"userapi/config"
	"userapi/models"
	"userapi/repositories"
)

func GetOfficeLevels() ([]models.OfficeLevelModel, error) {
	return repositories.GetOfficeLevels()
}
func GetOffices(OfficeLevelID int) ([]models.OfficeModel, error) {
	return repositories.GetOffices(OfficeLevelID)
}
func GetReportingOffice(OfficeLevelID int) ([]models.OfficeModel, error) {
	return repositories.GetReportingOffice(OfficeLevelID)
}
func GetDropdownOffice(OfficeLevelID int) ([]models.OfficeModel, error) {
	return repositories.GetDropdownOffice(OfficeLevelID)
}
func GetOfficeList(OfficeLevelID int, OfficeID string) ([]models.OfficeModel, error) {
	return repositories.GetOfficeList(OfficeLevelID, OfficeID)
}
func GetState() ([]models.StatesModel, error) {
	return repositories.GetStates()
}
func GetDistrict(StateID int) ([]models.DistrictModel, error) {
	return repositories.GetDistrict(StateID)
}
func InsertUpdateOffice(model models.OfficeModel, action string, status string, actionLogID int) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from public.f_insertupdate_officedetail($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
		action, model.OfficeID, model.OfficeName, model.OfficeNameLocal, model.OfficeLevelID, model.ReportingOfficeID, model.Address, model.StateID,
		model.DistrictID, model.Mobile, model.Email, model.NodelName, model.NodelMobile, model.NodelEmail, status, actionLogID).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
