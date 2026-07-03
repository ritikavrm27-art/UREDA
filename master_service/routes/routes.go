package routes

import (
	"net/http"
	"userapi/controllers"
	"userapi/utils"
	//"github.com/gorilla/mux"
)

func RegisterRoutes() {

	http.HandleFunc("/users", utils.SessionAuth(controllers.GetUsers))
	http.HandleFunc("/user/create", utils.SessionAuth(controllers.CreateUser))
	//http.HandleFunc("/user/delete", utils.SessionAuth(controllers.DeleteUser))
	http.HandleFunc("/user/login", controllers.LoginUserHandler)
	http.HandleFunc("/user/logout", controllers.LogoutUserHandler)
	http.HandleFunc("/auth/login-salt", controllers.GetLoginSalt)
	http.HandleFunc("/auth/captcha", controllers.GetCaptcha)
	http.HandleFunc("/api/translations", controllers.GetTranslations)

	http.HandleFunc("/user/get-officelevel", utils.SessionAuth(controllers.GetOfficeLevels))
	http.HandleFunc("/user/get-office", utils.SessionAuth(controllers.GetOffices))
	http.HandleFunc("/user/get-reportingoffice", utils.SessionAuth(controllers.GetReportingOffice))
	http.HandleFunc("/user/get-dropdownoffice", utils.SessionAuth(controllers.GetDropdownOffice))
	http.HandleFunc("/user/get-state", utils.SessionAuth(controllers.GetState))
	http.HandleFunc("/user/get-district", utils.SessionAuth(controllers.GetDistrict))
	http.HandleFunc("/user/get-roles", utils.SessionAuth(controllers.GetRolesHandler))
	http.HandleFunc("/user/get-religion", utils.SessionAuth(controllers.GetReligionHandler))
	http.HandleFunc("/user/get-designation", utils.SessionAuth(controllers.GetDesignationHandler))
	http.HandleFunc("/user/get-nametitle", utils.SessionAuth(controllers.GetNameTitleHandler))
	http.HandleFunc("/user/addupdateoffice", utils.SessionAuth(controllers.SaveUpdateOfficeHandler))
	http.HandleFunc("/user/addupdateemployee", utils.SessionAuth(controllers.SaveUpdateEmployeeHandler))
	http.HandleFunc("/user/get-employeelist", utils.SessionAuth(controllers.GetEmployeeListHandler))
	http.HandleFunc("/user/getoffices", utils.SessionAuth(controllers.GetOfficeListHandler))
	http.HandleFunc("/user/get-userslist", utils.SessionAuth(controllers.GetUsersListHandler))
	http.HandleFunc("/user/updateuser", utils.SessionAuth(controllers.UpdateUserHandler))

	http.HandleFunc("/scheme/get-mastersummary", utils.SessionAuth(controllers.GetMasterSummaryListHandler))
	http.HandleFunc("/scheme/get-applicanttype", utils.SessionAuth(controllers.GetApplicantTypeListHandler))
	http.HandleFunc("/scheme/get-units", utils.SessionAuth(controllers.GetMeasuringUnitListHandler))
	http.HandleFunc("/scheme/get-sectors", utils.SessionAuth(controllers.GetSectorListHandler))
	http.HandleFunc("/scheme/get-documenttype", utils.SessionAuth(controllers.GetDocumentTypeListHandler))
	http.HandleFunc("/scheme/get-documents", utils.SessionAuth(controllers.GetDocumentListHandler))
	http.HandleFunc("/scheme/get-schemetype", utils.SessionAuth(controllers.GetSchemeTypeListHandler))
	http.HandleFunc("/scheme/get-subsidytype", utils.SessionAuth(controllers.GetSubsidyTypeListHandler))
	http.HandleFunc("/scheme/get-category", utils.SessionAuth(controllers.GetCategoryListHandler))
	http.HandleFunc("/scheme/get-subcategory", utils.SessionAuth(controllers.GetSubCategoryListHandler))
	http.HandleFunc("/scheme/get-technology", utils.SessionAuth(controllers.GetTechnologyListHandler))
	http.HandleFunc("/scheme/get-vendors", utils.SessionAuth(controllers.GetVendorListHandler))
	http.HandleFunc("/scheme/update-schemetype", utils.SessionAuth(controllers.UpdateSchemeTypeHandler))
	http.HandleFunc("/scheme/update-subsidytype", utils.SessionAuth(controllers.UpdateSubsidyTypeHandler))
	http.HandleFunc("/scheme/update-category", utils.SessionAuth(controllers.UpdateCategoryHandler))
	http.HandleFunc("/scheme/update-subcategory", utils.SessionAuth(controllers.UpdateSubCategoryHandler))
	http.HandleFunc("/scheme/update-document", utils.SessionAuth(controllers.UpdateDocumentHandler))
	http.HandleFunc("/scheme/update-technology", utils.SessionAuth(controllers.UpdateTechnologyHandler))
	http.HandleFunc("/scheme/update-vendor", utils.SessionAuth(controllers.UpdateVendorHandler))
}
