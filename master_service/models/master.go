package models

type OfficeLevelModel struct {
	OfficeLevelID        int    `json:"office_level_id"`
	OfficeLevelName      string `json:"office_level_name"`
	OfficeLevelNameLocal string `json:"office_level_name_local"`
}
type StatesModel struct {
	StateID        int    `json:"state_id"`
	StateName      string `json:"state_name"`
	StateNameLocal string `json:"state_name_local"`
}
type DistrictModel struct {
	DistrictID        int    `json:"district_id"`
	DistrictName      string `json:"district_name"`
	DistrictNameLocal string `json:"district_name_local"`
}
type OfficeModel struct {
	OfficeID          string `json:"office_id"`
	OfficeName        string `json:"office_name"`
	OfficeNameLocal   string `json:"office_name_local"`
	OfficeLevelID     int    `json:"office_level_id"`
	OfficeLevelName   string `json:"office_level_name"`
	ReportingOfficeID string `json:"reporting_office_id"`
	Address           string `json:"address"`
	StateID           int    `json:"state_id"`
	DistrictID        int    `json:"district_id"`
	Mobile            string `json:"mobile"`
	Email             string `json:"email"`
	NodelName         string `json:"nodel_name"`
	NodelMobile       string `json:"nodel_mobile"`
	NodelEmail        string `json:"nodel_email"`
	Status            string `json:"status"`
	Action            string `json:"action"`
	TotOffice         int    `json:"tot_office"`
	TotHQOffice       int    `json:"tot_hq"`
	TotRegionalOffice int    `json:"tot_regionalofc"`
	TotDistOffice     int    `json:"tot_distofc"`
}
type DesignationModel struct {
	DesignationID    int    `json:"desig_id"`
	DesignationName  string `json:"desig_name"`
	DesignationLocal string `json:"desig_name_local"`
}
type ReligionModel struct {
	ReligionID        int    `json:"religion_id"`
	ReligionName      string `json:"religion_name"`
	ReligionNameLocal string `json:"religion_name_local"`
}
type NameTitleModel struct {
	TitleID        int    `json:"title_id"`
	TitleName      string `json:"title_name"`
	TitleNameLocal string `json:"title_name_local"`
}
type RoleModel struct {
	RoleID        int    `json:"role_id"`
	RoleName      string `json:"role_name"`
	RoleNameLocal string `json:"role_name_local"`
}
type EmployeePersonalModel struct {
	EmpID           int    `json:"emp_id"`
	EmpCode         string `json:"emp_code"`
	Title           int    `json:"title_id"`
	EmpName         string `json:"emp_name"`
	EmpNameLocal    string `json:"emp_name_local"`
	FatherName      string `json:"emp_father_name"`
	FatherNameLocal string `json:"emp_father_name_local"`
	MotherName      string `json:"emp_mother_name"`
	MotherNameLocal string `json:"emp_mother_name_local"`
	SpouseName      string `json:"emp_spouse_name"`
	SpouseNameLocal string `json:"emp_spouse_name_local"`
	Photo           []byte `json:"emp_photo"`
	DOB             string `json:"dob"`
	Gender          string `json:"gender"`
	ReligionID      int    `json:"religion_id"`
	StateID         int    `json:"state_id"`
	DistrictID      int    `json:"district_id"`
	Address         string `json:"address"`
	Mobile1         string `json:"mobile_no1"`
	Mobile2         string `json:"mobile_no2"`
	EmailID         string `json:"email_id"`
	OfficeLevelID   int    `json:"office_level_id"`
	OfficeID        string `json:"office_id"`
	OfficeLevelName string `json:"office_level_name"`
	OfficeName      string `json:"office_name"`
	JoiningDate     string `json:"joining_date"`
	DesignationID   int    `json:"desig_id"`
	DesignationName string `json:"desig_name"`
	EmpType         string `json:"emp_type"`
	Status          string `json:"status"`
	VerifiedStatus  string `json:"verified_yn"`
	Action          string `json:"action"`
	SearchText      string `json:"search_text"`
	TotEmployee     int    `json:"tot_employee"`
	TotVerified     int    `json:"tot_verified"`
	TotDraft        int    `json:"tot_draft"`
	TotActive       int    `json:"tot_active"`
	TotDeactive     int    `json:"tot_deactive"`
	UserID          string `json:"user_id"`
	RoleID          int    `json:"role_id"`
	RoleName        string `json:"role_name"`
	UserPassword    string `json:"password"`
	TotUsers        int    `json:"tot_users"`
}
