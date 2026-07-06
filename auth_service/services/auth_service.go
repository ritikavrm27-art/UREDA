package services

import (
	"authapi/config"
	"authapi/models"
	"authapi/repositories"
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
