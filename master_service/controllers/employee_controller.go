package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"userapi/models"
	"userapi/services"
	"userapi/utils"
)

func GetReligionHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	officelevel_list, err := services.GetReligion()

	if err != nil {
		utils.LogErrorToCSV("Employee Page", "GetReligionHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(officelevel_list)
}
func GetDesignationHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	designation_list, err := services.GetDesignation()

	if err != nil {
		utils.LogErrorToCSV("Employee Page", "GetDesignationHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(designation_list)
}
func GetNameTitleHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	title_list, err := services.GetNameTitle()

	if err != nil {
		utils.LogErrorToCSV("Employee Page", "GetNameTitleHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(title_list)
}
func SaveUpdateEmployeeHandler(w http.ResponseWriter, r *http.Request) {
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

	var employeeDetail models.EmployeePersonalModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&employeeDetail)
	if err != nil {
		utils.LogErrorToCSV("Employee Page", "SaveUpdateEmployee", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	// Validate request
	if employeeDetail.Action == "S" || employeeDetail.Action == "U" {
		err = ValidateEmployee(employeeDetail)

		if err != nil {
			utils.LogErrorToCSV("Employee Page", "SaveUpdateEmployee", err.Error())
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"message": err.Error(),
			})
			return
		}
	}
	action := employeeDetail.Action
	status := employeeDetail.Status

	var success bool
	var message string
	// Call service to insert user
	success, message, err = services.InsertUpdateEmployee(employeeDetail, action, status, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV(
			"Employee Page",
			"SaveUpdateEmployee",
			err.Error(),
		)

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while saving employee details. Please try again later.",
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
func ValidateEmployee(req models.EmployeePersonalModel) error {

	if strings.TrimSpace(req.EmpCode) == "" {
		return errors.New("Employee code is required")
	}

	if req.Title == 0 {
		return errors.New("please select title")
	}
	if strings.TrimSpace(req.EmpName) == "" {
		return errors.New("Employee name is required")
	}
	if strings.TrimSpace(req.EmailID) == "" {
		return errors.New("Email ID is required")
	}
	emailRegex := regexp.MustCompile(
		`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`,
	)

	if strings.TrimSpace(req.Mobile1) == "" {
		return errors.New("Mobile number is required")
	}
	mobileRegex := regexp.MustCompile(`^[0-9]{10}$`)

	if req.Mobile1 != "" && !mobileRegex.MatchString(req.Mobile1) {
		return errors.New("mobile number1 must be 10 digits")
	}
	if req.Mobile2 != "" && !mobileRegex.MatchString(req.Mobile2) {
		return errors.New("mobile number2 must be 10 digits")
	}
	if req.EmailID != "" && !emailRegex.MatchString(req.EmailID) {
		return errors.New("invalid email address of nodal officer")
	}

	return nil
}
func GetEmployeeListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var employeeDetail models.EmployeePersonalModel

	err := json.NewDecoder(r.Body).Decode(&employeeDetail)
	if err != nil {
		utils.LogErrorToCSV("Employee Page", "GetEmployeeListHandler", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	var searchText = employeeDetail.SearchText
	employee_list, err := services.GetEmployeeList(employeeDetail.OfficeLevelID, employeeDetail.OfficeID, employeeDetail.Status,
		employeeDetail.VerifiedStatus, searchText)

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		utils.LogErrorToCSV("Employee Page", "GetEmployeeListHandler", err.Error())
		json.NewEncoder(w).Encode([]interface{}{})
		return
	}
	json.NewEncoder(w).Encode(employee_list)
}
