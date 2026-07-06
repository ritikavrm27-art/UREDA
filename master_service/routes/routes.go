package routes

import (
	"net/http"
	"userapi/controllers"
	"userapi/utils"
)

func RegisterRoutes() {

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

	http.HandleFunc("/scheme/get-mastersummary", controllers.GetMasterSummaryListHandler)
	http.HandleFunc("/scheme/get-applicanttype", controllers.GetApplicantTypeListHandler)
	http.HandleFunc("/scheme/get-units", controllers.GetMeasuringUnitListHandler)
	http.HandleFunc("/scheme/get-sectors", controllers.GetSectorListHandler)
	http.HandleFunc("/scheme/get-documenttype", controllers.GetDocumentTypeListHandler)
	http.HandleFunc("/scheme/get-documents", controllers.GetDocumentListHandler)
	http.HandleFunc("/scheme/get-schemetype", controllers.GetSchemeTypeListHandler)
	http.HandleFunc("/scheme/get-subsidytype", controllers.GetSubsidyTypeListHandler)
	http.HandleFunc("/scheme/get-category", controllers.GetCategoryListHandler)
	http.HandleFunc("/scheme/get-subcategory", controllers.GetSubCategoryListHandler)
	http.HandleFunc("/scheme/get-technology", controllers.GetTechnologyListHandler)
	http.HandleFunc("/scheme/get-vendors", controllers.GetVendorListHandler)

	http.HandleFunc("/scheme/update-schemetype", utils.SessionAuth(controllers.UpdateSchemeTypeHandler))
	http.HandleFunc("/scheme/update-subsidytype", utils.SessionAuth(controllers.UpdateSubsidyTypeHandler))
	http.HandleFunc("/scheme/update-category", utils.SessionAuth(controllers.UpdateCategoryHandler))
	http.HandleFunc("/scheme/update-subcategory", utils.SessionAuth(controllers.UpdateSubCategoryHandler))
	http.HandleFunc("/scheme/update-document", utils.SessionAuth(controllers.UpdateDocumentHandler))
	http.HandleFunc("/scheme/update-technology", utils.SessionAuth(controllers.UpdateTechnologyHandler))
	http.HandleFunc("/scheme/update-vendor", utils.SessionAuth(controllers.UpdateVendorHandler))
}
