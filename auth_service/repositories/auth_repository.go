package repositories

import (
	"authapi/config"
	"authapi/models"
)

func GetRoles() ([]models.RoleModel, error) {

	rows, err := config.DB.Query("SELECT  * from public.f_get_role()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	role_list := []models.RoleModel{}

	for rows.Next() {
		var model models.RoleModel

		err := rows.Scan(&model.RoleID, &model.RoleName, &model.RoleNameLocal)
		if err != nil {
			return nil, err
		}

		role_list = append(role_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return role_list, nil
}
func GetUsers() ([]models.User, error) {

	rows, err := config.DB.Query("SELECT  * from public.f_get_users()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []models.User{}

	for rows.Next() {
		var user models.User

		err := rows.Scan(&user.UserName, &user.EmpCode, &user.Password)
		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
func GetUserByUsername(username string) (*models.User, error) {
	var user models.User

	query := `SELECT * from public.f_get_user_byusername($1) `

	err := config.DB.QueryRow(query, username).Scan(
		&user.UserName, &user.EmpCode, &user.Role, &user.EmpName, &user.Office, &user.OfficeID, &user.RoleID, &user.Password,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
func InsertLoginLog(username string, machineIP string, macAddress string, sessionID string, actionLogID int64) error {

	_, err := config.DB.Exec(`SELECT public.f_insert_user_login_log($1, $2, $3, $4, $5)`, username, machineIP, macAddress, sessionID, actionLogID)
	return err

}
func CheckUserDayLock(username string) (int, error) {

	var attemptNo int

	query := `select public.f_get_user_attempt_count($1)`

	err := config.DB.QueryRow(query, username).Scan(&attemptNo)

	if err != nil {
		return 0, err
	}

	return attemptNo, nil
}
