package models

import "database/sql"

type ApplicantTypeModel struct {
	ApplicantTypeID        int    `json:"applicant_type_id"`
	ApplicantTypeName      string `json:"applicant_type_name"`
	ApplicantTypeNameLocal string `json:"applicant_type_name_local"`
	Status                 string `json:"status"`
	Action                 string `json:"action"`
}
type MeasuringUnitModel struct {
	UnitID        int    `json:"unit_id"`
	UnitName      string `json:"unit_name"`
	UnitNameLocal string `json:"unit_name_local"`
	Status        string `json:"status"`
	Action        string `json:"action"`
}
type SectorModel struct {
	SectorID        int    `json:"sector_id"`
	SectorName      string `json:"sector_name"`
	SectorNameLocal string `json:"sector_name_local"`
	Status          string `json:"status"`
	Action          string `json:"action"`
}
type DocumentTypeModel struct {
	DocumentTypeID        int            `json:"document_type_id"`
	DocumentTypeName      string         `json:"document_type_name"`
	DocumentTypeNameLocal sql.NullString `json:"document_type_name_local"`
	Status                string         `json:"status"`
	Action                string         `json:"action"`
}
type DocumentModel struct {
	DocumentID        int    `json:"document_id"`
	DocumentTypeID    int    `json:"document_type_id"`
	DocumentTypeName  string `json:"document_type_name"`
	DocumentName      string `json:"document_name"`
	DocumentNameLocal string `json:"document_name_local"`
	Status            string `json:"status"`
	Action            string `json:"action"`
}
type SchemeTypeModel struct {
	SchemeTypeID        int    `json:"scheme_type_id"`
	SchemeTypeName      string `json:"scheme_type_name"`
	SchemeTypeNameLocal string `json:"scheme_type_name_local"`
	Status              string `json:"status"`
	Action              string `json:"action"`
}
type SubsidyTypeModel struct {
	SubsidyTypeID        int    `json:"subsidy_type_id"`
	SubsidyTypeName      string `json:"subsidy_type_name"`
	SubsidyTypeNameLocal string `json:"subsidy_type_name_local"`
	Status               string `json:"status"`
	Action               string `json:"action"`
}
type SchemeCategoryModel struct {
	CategoryID    int    `json:"category_id"`
	CategoryName  string `json:"category_name"`
	CategoryLocal string `json:"category_name_local"`
	Status        string `json:"status"`
	Action        string `json:"action"`
}
type SchemeSubCategoryModel struct {
	SubCategoryID    int    `json:"subcategory_id"`
	CategoryID       int    `json:"category_id"`
	CategoryName     string `json:"category_name"`
	SubCategoryName  string `json:"subcategory_name"`
	SubCategoryLocal string `json:"subcategory_name_local"`
	Status           string `json:"status"`
	Action           string `json:"action"`
}
type TechnologyModel struct {
	TechnologyID    int    `json:"technology_id"`
	SubCategoryID   int    `json:"subcategory_id"`
	SubCategoryName string `json:"subcategory_name"`
	TechnologyName  string `json:"technology_name"`
	TechnologyLocal string `json:"technology_name_local"`
	Status          string `json:"status"`
	Action          string `json:"action"`
}

type VendorModel struct {
	VendorID      int    `json:"vendor_id"`
	VendorName    string `json:"vendor_name"`
	VendorLocal   string `json:"vendor_name_local"`
	ContactPerson string `json:"contact_person"`
	Contact1      string `json:"contact_no_1"`
	Contcat2      string `json:"contact_no_2"`
	Email         string `json:"email"`
	OfficeAddress string `json:"office_address"`
	GSTNo         string `json:"gst_no"`
	Status        string `json:"status"`
	Action        string `json:"action"`
}
type SchemeMasterSummaryModel struct {
	TotSchemeType  int `json:"tot_scheme_type"`
	TotSubsidyType int `json:"tot_subsidy_type"`
	TotCategory    int `json:"tot_category"`
	TotSubcategory int `json:"tot_subcategory"`
	TotTechnology  int `json:"tot_technology"`
	TotDocument    int `json:"tot_document"`
	TotVendor      int `json:"tot_vendors"`
}
