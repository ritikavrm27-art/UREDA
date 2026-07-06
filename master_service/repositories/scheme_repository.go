package repositories

import (
	"userapi/config"
	"userapi/models"
)

func GetMasterSummaryList() ([]models.SchemeMasterSummaryModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_master_summary()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	document_list := []models.SchemeMasterSummaryModel{}

	for rows.Next() {
		var model models.SchemeMasterSummaryModel

		err := rows.Scan(&model.TotSchemeType, &model.TotSubsidyType, &model.TotCategory, &model.TotSubcategory, &model.TotTechnology, &model.TotDocument, &model.TotVendor)
		if err != nil {
			return nil, err
		}

		document_list = append(document_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return document_list, nil
}
func GetApplicantTypeList() ([]models.ApplicantTypeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_applicant_type()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	applicant_type_list := []models.ApplicantTypeModel{}

	for rows.Next() {
		var model models.ApplicantTypeModel

		err := rows.Scan(&model.ApplicantTypeID, &model.ApplicantTypeName, &model.ApplicantTypeNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		applicant_type_list = append(applicant_type_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return applicant_type_list, nil
}
func GetMeasuringUnitList() ([]models.MeasuringUnitModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_units()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	unit_list := []models.MeasuringUnitModel{}

	for rows.Next() {
		var model models.MeasuringUnitModel

		err := rows.Scan(&model.UnitID, &model.UnitName, &model.UnitNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		unit_list = append(unit_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return unit_list, nil
}
func GetSectorList() ([]models.SectorModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_sector()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	sector_list := []models.SectorModel{}

	for rows.Next() {
		var model models.SectorModel

		err := rows.Scan(&model.SectorID, &model.SectorName, &model.SectorNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		sector_list = append(sector_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return sector_list, nil
}
func GetDocumentTypeList() ([]models.DocumentTypeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_document_type()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	document_type_list := []models.DocumentTypeModel{}

	for rows.Next() {
		var model models.DocumentTypeModel

		err := rows.Scan(&model.DocumentTypeID, &model.DocumentTypeName, &model.DocumentTypeNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		document_type_list = append(document_type_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return document_type_list, nil
}
func GetDocumentList() ([]models.DocumentModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_document()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	document_list := []models.DocumentModel{}

	for rows.Next() {
		var model models.DocumentModel

		err := rows.Scan(&model.DocumentID, &model.DocumentTypeID, &model.DocumentTypeName, &model.DocumentName, &model.DocumentNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		document_list = append(document_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return document_list, nil
}
func GetSchemeTypeList() ([]models.SchemeTypeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_scheme_type()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	scheme_type_list := []models.SchemeTypeModel{}

	for rows.Next() {
		var model models.SchemeTypeModel

		err := rows.Scan(&model.SchemeTypeID, &model.SchemeTypeName, &model.SchemeTypeNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		scheme_type_list = append(scheme_type_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return scheme_type_list, nil
}
func GetSubsidyTypeList() ([]models.SubsidyTypeModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_subsidy_type()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	subsidy_type_list := []models.SubsidyTypeModel{}

	for rows.Next() {
		var model models.SubsidyTypeModel

		err := rows.Scan(&model.SubsidyTypeID, &model.SubsidyTypeName, &model.SubsidyTypeNameLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		subsidy_type_list = append(subsidy_type_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return subsidy_type_list, nil
}
func GetCategoryList() ([]models.SchemeCategoryModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_scheme_category()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	category_list := []models.SchemeCategoryModel{}

	for rows.Next() {
		var model models.SchemeCategoryModel

		err := rows.Scan(&model.CategoryID, &model.CategoryName, &model.CategoryLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		category_list = append(category_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return category_list, nil
}
func GetSubCategoryList() ([]models.SchemeSubCategoryModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_scheme_subcategory()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	scheme_subcategory_list := []models.SchemeSubCategoryModel{}

	for rows.Next() {
		var model models.SchemeSubCategoryModel

		err := rows.Scan(&model.SubCategoryID, &model.CategoryID, &model.CategoryName, &model.SubCategoryName, &model.SubCategoryLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		scheme_subcategory_list = append(scheme_subcategory_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return scheme_subcategory_list, nil
}
func GetTechnologyList() ([]models.TechnologyModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_technology()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	technology_list := []models.TechnologyModel{}

	for rows.Next() {
		var model models.TechnologyModel

		err := rows.Scan(&model.TechnologyID, &model.SubCategoryID, &model.SubCategoryName, &model.TechnologyName, &model.TechnologyLocal, &model.Status)
		if err != nil {
			return nil, err
		}

		technology_list = append(technology_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return technology_list, nil
}
func GetVendorsList() ([]models.VendorModel, error) {

	rows, err := config.DB.Query("SELECT  * from master.f_get_vendor()")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	vendor_list := []models.VendorModel{}

	for rows.Next() {
		var model models.VendorModel

		err := rows.Scan(&model.VendorID, &model.VendorName, &model.VendorLocal, &model.ContactPerson, &model.Contact1,
			&model.Contcat2, &model.Email, &model.OfficeAddress, &model.GSTNo, &model.Status)
		if err != nil {
			return nil, err
		}

		vendor_list = append(vendor_list, model)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return vendor_list, nil
}
