package services

import (
	"log"
	"userapi/config"
	"userapi/models"
	"userapi/repositories"
)

func GetRoles() ([]models.RoleModel, error) {
	return repositories.GetRoles()
}
func GetUsersList(OfficeLevelID int, OfficeID string, Status string, RoleID int, searchText string) ([]models.EmployeePersonalModel, error) {
	return repositories.GetUsersList(OfficeLevelID, OfficeID, Status, RoleID, searchText)
}
func UpdateUser(model models.EmployeePersonalModel, shaPassword string, action string, username string, machineIP string,
	deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from public.f_update_userdetail($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`,
		action, model.EmpID, model.UserID, shaPassword, model.RoleID, username, machineIP, deviceID, latitude, longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
