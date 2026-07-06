package services

import (
	"log"
	"userapi/config"
	"userapi/models"
	"userapi/repositories"
)

func GetMasterSummaryList() ([]models.SchemeMasterSummaryModel, error) {
	return repositories.GetMasterSummaryList()
}
func GetApplicantTypeList() ([]models.ApplicantTypeModel, error) {
	return repositories.GetApplicantTypeList()
}
func GetMeasuringUnitList() ([]models.MeasuringUnitModel, error) {
	return repositories.GetMeasuringUnitList()
}
func GetSectorList() ([]models.SectorModel, error) {
	return repositories.GetSectorList()
}
func GetDocumentTypeList() ([]models.DocumentTypeModel, error) {
	return repositories.GetDocumentTypeList()
}
func GetDocumentList() ([]models.DocumentModel, error) {
	return repositories.GetDocumentList()
}
func GetSchemeTypeList() ([]models.SchemeTypeModel, error) {
	return repositories.GetSchemeTypeList()
}
func GetSubsidyTypeList() ([]models.SubsidyTypeModel, error) {
	return repositories.GetSubsidyTypeList()
}
func GetCategoryList() ([]models.SchemeCategoryModel, error) {
	return repositories.GetCategoryList()
}
func GetSubCategoryList() ([]models.SchemeSubCategoryModel, error) {
	return repositories.GetSubCategoryList()
}
func GetTechnologyList() ([]models.TechnologyModel, error) {
	return repositories.GetTechnologyList()
}
func GetVendorsList() ([]models.VendorModel, error) {
	return repositories.GetVendorsList()
}
func UpdateSchemeType(model models.SchemeTypeModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_schemetype($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`,
		action, model.SchemeTypeID, model.SchemeTypeName, &model.SchemeTypeNameLocal, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func UpdateSubsidyType(model models.SubsidyTypeModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_subsidytype($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`,
		action, model.SubsidyTypeID, model.SubsidyTypeName, &model.SubsidyTypeNameLocal, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func UpdateCategory(model models.SchemeCategoryModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_schemecategory($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`,
		action, model.CategoryID, model.CategoryName, &model.CategoryLocal, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func UpdateSubCategory(model models.SchemeSubCategoryModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_schemesubcategory($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)`,
		action, model.SubCategoryID, model.CategoryID, &model.SubCategoryName, &model.SubCategoryLocal, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func UpdateDocuments(model models.DocumentModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_documents($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)`,
		action, model.DocumentID, &model.DocumentTypeID, model.DocumentName, &model.DocumentNameLocal, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func UpdateTechnology(model models.TechnologyModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_technology($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)`,
		action, model.TechnologyID, &model.SubCategoryID, model.TechnologyName, &model.TechnologyLocal, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
func UpdateVendors(model models.VendorModel, action string, username string, machineIP string, deviceID string, latitude string, longitude string) (bool, string, error) {
	var success bool
	var message string

	err := config.DB.QueryRow(`select success, message from master.f_insertupdate_vendor($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
		action, model.VendorID, model.VendorName, &model.VendorLocal, &model.ContactPerson, &model.Contact1, &model.Contcat2,
		&model.Email, &model.OfficeAddress, &model.GSTNo, model.Status, username,
		machineIP,
		deviceID,
		latitude,
		longitude).Scan(&success, &message)

	if err != nil {
		log.Println(err)
		return false, "", err
	}

	return success, message, nil
}
