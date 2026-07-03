package repositories

import (
	"userapi/config"
	"userapi/models"
)

func GetReligion() ([]models.ReligionModel, error) {

	rows, err := config.DB.Query("SELECT  * from public.f_get_religion()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	religion_list := []models.ReligionModel{}

	for rows.Next() {
		var model models.ReligionModel

		err := rows.Scan(&model.ReligionID, &model.ReligionName, &model.ReligionNameLocal)
		if err != nil {
			return nil, err
		}

		religion_list = append(religion_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return religion_list, nil
}
func GetDesignation() ([]models.DesignationModel, error) {

	rows, err := config.DB.Query("SELECT  * from public.f_get_designation()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	designation_list := []models.DesignationModel{}

	for rows.Next() {
		var model models.DesignationModel

		err := rows.Scan(&model.DesignationID, &model.DesignationName, &model.DesignationLocal)
		if err != nil {
			return nil, err
		}

		designation_list = append(designation_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return designation_list, nil
}
func GetNameTitle() ([]models.NameTitleModel, error) {

	rows, err := config.DB.Query("SELECT  * from public.f_get_nametitle()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	titles_list := []models.NameTitleModel{}

	for rows.Next() {
		var model models.NameTitleModel

		err := rows.Scan(&model.TitleID, &model.TitleName, &model.TitleNameLocal)
		if err != nil {
			return nil, err
		}

		titles_list = append(titles_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return titles_list, nil
}
func GetEmployeeList(OfficeLevelID int, OfficeID string, Status string, VerifiedStatus string, searchText string) ([]models.EmployeePersonalModel, error) {

	rows, err := config.DB.Query(`SELECT emp_id, emp_code, title_id, emp_name, emp_name_local, COALESCE(emp_father_name, ''),
    COALESCE(emp_father_name_local, ''), COALESCE(emp_mother_name, ''), COALESCE(emp_mother_name_local, ''), COALESCE(emp_spouse_name, ''), 
	COALESCE(emp_spouse_name_local, ''), COALESCE(emp_photo, null), COALESCE(TO_CHAR(dob, 'dd/MM/yyyy'), ''), COALESCE(gender, ''), COALESCE(religion_id, 0),
	state_id,district_id,address,mobile_no1,mobile_no2,	email_id, office_level_id, office_id,office_level_name,office_name,
	 COALESCE(TO_CHAR(joining_date, 'dd/MM/yyyy'), ''), desig_id, desig_name, emp_type, status, verified_yn, action_log_id	,tot_employee,tot_verified,tot_draft,tot_active,tot_deactive	
	FROM public.f_get_employeelist($1,$2,$3,$4,$5)`, OfficeLevelID, OfficeID, Status, VerifiedStatus, searchText)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	employee_list := []models.EmployeePersonalModel{}

	for rows.Next() {
		var model models.EmployeePersonalModel

		err := rows.Scan(&model.EmpID, &model.EmpCode, &model.Title, &model.EmpName, &model.EmpNameLocal, &model.FatherName,
			&model.FatherNameLocal, &model.MotherName, &model.MotherNameLocal, &model.SpouseName, &model.SpouseNameLocal, &model.Photo, &model.DOB, &model.Gender,
			&model.ReligionID, &model.StateID, &model.DistrictID, &model.Address, &model.Mobile1, &model.Mobile2, &model.EmailID, &model.OfficeLevelID,
			&model.OfficeID, &model.OfficeLevelName, &model.OfficeName, &model.JoiningDate, &model.DesignationID, &model.DesignationName, &model.EmpType, &model.Status,
			&model.VerifiedStatus, &model.Action, &model.TotEmployee, &model.TotVerified, &model.TotDraft, &model.TotActive, &model.TotDeactive)
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
