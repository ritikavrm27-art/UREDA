package controllers

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"userapi/models"
	"userapi/services"
	"userapi/utils"
)

func sha256Hex(text string) string {

	hash := sha256.Sum256([]byte(text))

	return hex.EncodeToString(hash[:])
}
func GetRolesHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	role_list, err := services.GetRoles()

	if err != nil {
		utils.LogErrorToCSV("User Management Page", "GetRolesHandler", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(role_list)
}
func GetUsersListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var employeeDetail models.EmployeePersonalModel

	err := json.NewDecoder(r.Body).Decode(&employeeDetail)
	if err != nil {
		utils.LogErrorToCSV("User Management", "GetUsersListHandler", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	var searchText = employeeDetail.SearchText
	employee_list, err := services.GetUsersList(employeeDetail.OfficeLevelID, employeeDetail.OfficeID, employeeDetail.Status,
		employeeDetail.RoleID, searchText)

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		utils.LogErrorToCSV("User Management", "GetUsersListHandler", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Unable to fetch user records. Please try again later.",
		})
		return
	}
	json.NewEncoder(w).Encode(employee_list)
}
func UpdateUserHandler(w http.ResponseWriter, r *http.Request) {
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
		fmt.Println("Decode Error:", err)

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	action := employeeDetail.Action

	var success bool
	var message string
	// Call service to insert user

	shaPassword := sha256Hex(employeeDetail.UserPassword)

	success, message, err = services.UpdateUser(employeeDetail, shaPassword, action, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV("User Management Page", "UpdateUserHandler", err.Error())

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
