package repositories

import (
	"userapi/config"
	"userapi/models"
)

func GetOfficeLevels() ([]models.OfficeLevelModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_office_level()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	officelevel_list := []models.OfficeLevelModel{}

	for rows.Next() {
		var model models.OfficeLevelModel

		err := rows.Scan(&model.OfficeLevelID, &model.OfficeLevelName, &model.OfficeLevelNameLocal)
		if err != nil {
			return nil, err
		}

		officelevel_list = append(officelevel_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return officelevel_list, nil
}
func GetOffices(OfficeLevelID int) ([]models.OfficeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_officedropdown($1)", OfficeLevelID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	office_list := []models.OfficeModel{}

	for rows.Next() {
		var model models.OfficeModel

		err := rows.Scan(&model.OfficeID, &model.OfficeName, &model.OfficeNameLocal)
		if err != nil {
			return nil, err
		}

		office_list = append(office_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return office_list, nil
}
func GetReportingOffice(OfficeLevelID int) ([]models.OfficeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_reportingoffice($1)", OfficeLevelID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reportingoffice_list := []models.OfficeModel{}

	for rows.Next() {
		var model models.OfficeModel

		err := rows.Scan(&model.OfficeID, &model.OfficeName, &model.OfficeNameLocal)
		if err != nil {
			return nil, err
		}

		reportingoffice_list = append(reportingoffice_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return reportingoffice_list, nil
}
func GetDropdownOffice(OfficeLevelID int) ([]models.OfficeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_dropdownoffice($1)", OfficeLevelID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	office_list := []models.OfficeModel{}

	for rows.Next() {
		var model models.OfficeModel

		err := rows.Scan(&model.OfficeID, &model.OfficeName, &model.OfficeNameLocal)
		if err != nil {
			return nil, err
		}

		office_list = append(office_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return office_list, nil
}
func GetStates() ([]models.StatesModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_state()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	state_list := []models.StatesModel{}

	for rows.Next() {
		var model models.StatesModel

		err := rows.Scan(&model.StateID, &model.StateName, &model.StateNameLocal)
		if err != nil {
			return nil, err
		}

		state_list = append(state_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return state_list, nil
}
func GetDistrict(StateID int) ([]models.DistrictModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_district_bystate($1)", StateID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	district_list := []models.DistrictModel{}

	for rows.Next() {
		var model models.DistrictModel

		err := rows.Scan(&model.DistrictID, &model.DistrictName, &model.DistrictNameLocal)
		if err != nil {
			return nil, err
		}

		district_list = append(district_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return district_list, nil
}
func GetOfficeList(OfficeLevelID int, OfficeID string) ([]models.OfficeModel, error) {

	rows, err := config.DB.Query(`SELECT office_id, office_name, office_name_local, office_level_id, office_level_name, COALESCE(address, ''),
    COALESCE(state_id, 0), COALESCE(district_id, 0), COALESCE(mobile, ''), COALESCE(email, ''), COALESCE(nodel_name, ''), COALESCE(nodel_mobile, ''), COALESCE(nodel_email, ''),
    COALESCE(status, ''), COALESCE(reporting_office_id, ''),tot_office,tot_hq,tot_regionalofc,tot_distofc FROM master.f_get_office($1,$2)`, OfficeLevelID, OfficeID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	office_list := []models.OfficeModel{}

	for rows.Next() {
		var model models.OfficeModel

		err := rows.Scan(&model.OfficeID, &model.OfficeName, &model.OfficeNameLocal, &model.OfficeLevelID, &model.OfficeLevelName, &model.Address,
			&model.StateID, &model.DistrictID, &model.Mobile, &model.Email, &model.NodelName, &model.NodelMobile, &model.NodelEmail, &model.Status,
			&model.ReportingOfficeID, &model.TotOffice, &model.TotHQOffice, &model.TotRegionalOffice, &model.TotDistOffice)
		if err != nil {
			return nil, err
		}

		office_list = append(office_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return office_list, nil
}
