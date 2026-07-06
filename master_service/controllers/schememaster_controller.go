package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"userapi/models"
	"userapi/services"
	"userapi/utils"
)

func GetMasterSummaryListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	master_summary_list, err := services.GetMasterSummaryList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetMasterSummaryListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(master_summary_list)
}
func GetApplicantTypeListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	applicanttype_list, err := services.GetApplicantTypeList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetApplicantTypeListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(applicanttype_list)
}
func GetMeasuringUnitListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	units_list, err := services.GetMeasuringUnitList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetMeasuringUnitListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(units_list)
}
func GetSectorListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	sector_list, err := services.GetSectorList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetSectorListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(sector_list)
}
func GetDocumentTypeListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	doctype_list, err := services.GetDocumentTypeList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetDocumentTypeListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(doctype_list)
}
func GetDocumentListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	document_list, err := services.GetDocumentList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetDocumentListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(document_list)
}
func GetSchemeTypeListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	schemetype_list, err := services.GetSchemeTypeList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetSchemeTypeHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(schemetype_list)
}
func GetSubsidyTypeListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	subsidytype_list, err := services.GetSubsidyTypeList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetSubsidyTypeListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(subsidytype_list)
}
func GetCategoryListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	category_list, err := services.GetCategoryList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetCategoryListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(category_list)
}
func GetSubCategoryListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	subcategory_list, err := services.GetSubCategoryList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetSubCategoryListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(subcategory_list)
}
func GetTechnologyListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	technology_list, err := services.GetTechnologyList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetTechnologyListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(technology_list)
}
func GetVendorListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	vendor_list, err := services.GetVendorsList()

	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "GetVendorListHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(vendor_list)
}
func UpdateSchemeTypeHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var schemeTypes models.SchemeTypeModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&schemeTypes)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := schemeTypes.Action

	var success bool
	var message string

	success, message, err = services.UpdateSchemeType(schemeTypes, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateSchemeTypeHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
func UpdateSubsidyTypeHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var subsidyTypes models.SubsidyTypeModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&subsidyTypes)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := subsidyTypes.Action

	var success bool
	var message string

	success, message, err = services.UpdateSubsidyType(subsidyTypes, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateSubsidyTypeHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
func UpdateCategoryHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var category models.SchemeCategoryModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&category)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := category.Action

	var success bool
	var message string

	success, message, err = services.UpdateCategory(category, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateCategoryHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
func UpdateSubCategoryHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var subcategory models.SchemeSubCategoryModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&subcategory)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := subcategory.Action

	var success bool
	var message string

	success, message, err = services.UpdateSubCategory(subcategory, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateSubCategoryHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
func UpdateTechnologyHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var technology models.TechnologyModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&technology)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := technology.Action

	var success bool
	var message string

	success, message, err = services.UpdateTechnology(technology, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateTechnologyHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
func UpdateDocumentHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var document models.DocumentModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&document)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := document.Action

	var success bool
	var message string

	success, message, err = services.UpdateDocuments(document, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateDocumentHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
func UpdateVendorHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {

		w.WriteHeader(http.StatusOK)

		return
	}

	if r.Method != "POST" {

		w.WriteHeader(
			http.StatusMethodNotAllowed,
		)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request method",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)
	username, ok := session.Values["username"].(string)
	//fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var vendors models.VendorModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&vendors)
	if err != nil {
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := vendors.Action

	var success bool
	var message string

	success, message, err = services.UpdateVendors(vendors, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("Scheme Master Page", "UpdateVendorHandler", err.Error())

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while processing your request. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message,
		})

		return
	}

	// Success response
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": message,
	})
}
