package repositories

import (
	"userapi/config"
	"userapi/models"
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
func GetUsersList(OfficeLevelID int, OfficeID string, Status string, RoleID int, searchText string) ([]models.EmployeePersonalModel, error) {

	rows, err := config.DB.Query(`SELECT user_id,role_id,role_name,emp_id, emp_code, title_id, emp_name, emp_name_local,mobile_no1, mobile_no2, 
	email_id, office_level_id, office_id, office_level_name, office_name, desig_id, desig_name, status, tot_users, tot_active, tot_deactive	
	FROM public.f_get_userslist($1,$2,$3,$4,$5)`, OfficeLevelID, OfficeID, Status, RoleID, searchText)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	employee_list := []models.EmployeePersonalModel{}

	for rows.Next() {
		var model models.EmployeePersonalModel

		err := rows.Scan(&model.UserID, &model.RoleID, &model.RoleName, &model.EmpID, &model.EmpCode, &model.Title, &model.EmpName, &model.EmpNameLocal,
			&model.Mobile1, &model.Mobile2, &model.EmailID, &model.OfficeLevelID, &model.OfficeID, &model.OfficeLevelName, &model.OfficeName,
			&model.DesignationID, &model.DesignationName, &model.Status, &model.TotUsers, &model.TotActive, &model.TotDeactive)
		if err != nil {
			return nil, err
		}

		employee_list = append(employee_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return employee_list, nil
}
