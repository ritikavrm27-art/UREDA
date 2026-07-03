package controllers

import (
	"encoding/json"
	"fmt"
	"log"
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called scheme", schemeTypes.SchemeTypeID)

	if action == "S" {
		action_type_code = 20
	} else if action == "U" {
		action_type_code = 21
	} else if action == "R" {
		action_type_code = 22
	} else if action == "A" {
		action_type_code = 23
	} else if action == "D" {
		action_type_code = 24
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateSchemeTypeHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateSchemeType(schemeTypes, action, actionLogID)
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called scheme", subsidyTypes.SubsidyTypeID)

	if action == "S" {
		action_type_code = 25
	} else if action == "U" {
		action_type_code = 26
	} else if action == "R" {
		action_type_code = 27
	} else if action == "A" {
		action_type_code = 28
	} else if action == "D" {
		action_type_code = 29
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateSubsidyTypeHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateSubsidyType(subsidyTypes, action, actionLogID)
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called category", category.CategoryID)

	if action == "S" {
		action_type_code = 30
	} else if action == "U" {
		action_type_code = 31
	} else if action == "R" {
		action_type_code = 32
	} else if action == "A" {
		action_type_code = 33
	} else if action == "D" {
		action_type_code = 34
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateCategoryHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateCategory(category, action, actionLogID)
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called sub category", subcategory.SubCategoryID)

	if action == "S" {
		action_type_code = 35
	} else if action == "U" {
		action_type_code = 36
	} else if action == "R" {
		action_type_code = 37
	} else if action == "A" {
		action_type_code = 38
	} else if action == "D" {
		action_type_code = 39
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateSubCategoryHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateSubCategory(subcategory, action, actionLogID)
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called scheme", technology.TechnologyID)

	if action == "S" {
		action_type_code = 40
	} else if action == "U" {
		action_type_code = 41
	} else if action == "R" {
		action_type_code = 42
	} else if action == "A" {
		action_type_code = 43
	} else if action == "D" {
		action_type_code = 44
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateTechnologyHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateTechnology(technology, action, actionLogID)
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called document", document.DocumentID)

	if action == "S" {
		action_type_code = 45
	} else if action == "U" {
		action_type_code = 46
	} else if action == "R" {
		action_type_code = 47
	} else if action == "A" {
		action_type_code = 48
	} else if action == "D" {
		action_type_code = 49
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateDocumentHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateDocuments(document, action, actionLogID)
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
			models.LoginResponse{
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
	var action_mode = ""
	var action_type_code = 0
	var action_category_code = 3

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
	fmt.Println("called action" + action)
	fmt.Println("called vendors", vendors.VendorID)

	if action == "S" {
		action_type_code = 50
	} else if action == "U" {
		action_type_code = 51
	} else if action == "R" {
		action_type_code = 52
	} else if action == "A" {
		action_type_code = 53
	} else if action == "D" {
		action_type_code = 54
	}

	actionLogID, err := InsertActionLog(action_type_code, action_category_code, username, machineIP, deviceID, latitude, longitude, action_mode)
	if err != nil {
		utils.LogErrorToCSV("Scheme Master Page", "UpdateVendorHandler", err.Error())
		log.Println("Action Log Error:", err)
	}
	var success bool
	var message string

	success, message, err = services.UpdateVendors(vendors, action, actionLogID)
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
