package services

import (
	"log"
	"userapi/config"
	"userapi/models"
	"userapi/repositories"
)

func GetAllUsers() ([]models.User, error) {
	return repositories.GetUsers()
}
func InsertUser(user models.User) error {

	query := `INSERT INTO public.m_user_login (user_id, emp_code, password) VALUES ($1, $2, $3)`

	_, err := config.DB.Exec(query, user.UserName, user.EmpCode, user.Password)
	return err
}
func Logout(username string, actionLogID int) error {

	var success bool
	err := config.DB.QueryRow(`SELECT public.f_logout_user($1, $2)`, username, actionLogID).Scan(&success)

	if err != nil {
		return err
	}

	return nil
}
func GetRoles() ([]models.RoleModel, error) {
	return repositories.GetRoles()
}
func GetUsersList(OfficeLevelID int, OfficeID string, Status string, RoleID int, searchText string) ([]models.EmployeePersonalModel, error) {
	return repositories.GetUsersList(OfficeLevelID, OfficeID, Status, RoleID, searchText)
}
func UpdateUser(model models.EmployeePersonalModel, shaPassword string, action string, actionLogID int) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from public.f_update_userdetail($1, $2, $3,$4,$5,$6)`,
		action, model.EmpID, model.UserID, shaPassword, model.RoleID, actionLogID).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
