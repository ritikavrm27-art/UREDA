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

func ValidateOffice(req models.OfficeModel) error {

	if strings.TrimSpace(req.OfficeName) == "" {
		return errors.New("office name is required")
	}

	if req.OfficeLevelID == 0 {
		return errors.New("please select office level")
	}

	// Reporting office required only if office level > 10
	if req.OfficeLevelID > 10 && strings.TrimSpace(req.ReportingOfficeID) == "" {

		return errors.New("please select reporting office")
	}

	if req.StateID == 0 {
		return errors.New("please select state")
	}

	if req.DistrictID == 0 {
		return errors.New("please select district")
	}

	// Mobile validation
	if strings.TrimSpace(req.Mobile) == "" {
		return errors.New("mobile number is required")
	}

	// Email validation
	if strings.TrimSpace(req.Email) == "" {
		return errors.New("email is required")
	}

	emailRegex := regexp.MustCompile(
		`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`,
	)

	if !emailRegex.MatchString(req.Email) {
		return errors.New("invalid email address")
	}
	mobileRegex := regexp.MustCompile(`^[0-9]{10}$`)

	if req.NodelMobile != "" && !mobileRegex.MatchString(req.NodelMobile) {
		return errors.New("nodal officer mobile number must be 10 digits")
	}
	if req.NodelEmail != "" && !emailRegex.MatchString(req.NodelEmail) {
		return errors.New("invalid email address of nodal officer")
	}

	return nil
}
func SaveUpdateOfficeHandler(w http.ResponseWriter, r *http.Request) {
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
	fmt.Println("Logged In User:", username)

	if !ok {
		username = ""
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""

	var officeDetail models.OfficeModel

	// Decode JSON request body into struct
	err := json.NewDecoder(r.Body).Decode(&officeDetail)
	if err != nil {
		utils.LogErrorToCSV("Office Page", "SaveUpdateOffice", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}
	// Validate request
	if officeDetail.Action == "S" || officeDetail.Action == "U" {
		err = ValidateOffice(officeDetail)

		if err != nil {
			utils.LogErrorToCSV("Office Page", "SaveUpdateOffice", err.Error())
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"message": err.Error(),
			})
			return
		}
	}
	action := officeDetail.Action
	status := officeDetail.Status

	var success bool
	var message string
	// Call service to insert user
	success, message, err = services.InsertUpdateOffice(officeDetail, action, status, username, machineIP, deviceID, latitude, longitude)
	if err != nil {

		utils.LogErrorToCSV(
			"Office Page",
			"SaveUpdateOffice",
			err.Error(),
		)

		fmt.Println("DB Error:", err)

		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "There is an error while saving office details. Please try again later.",
		})

		return
	}

	if !success {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": message, // Message from PostgreSQL function
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
func GetOfficeListHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var officeDetail models.OfficeModel

	err := json.NewDecoder(r.Body).Decode(&officeDetail)
	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetOfficeList", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request data. Please check the entered details and try again.",
		})
		return
	}

	office_list, err := services.GetOfficeList(officeDetail.OfficeLevelID, officeDetail.OfficeID)
	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetOfficeList", err.Error())
		fmt.Println("err:" + err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Unable to fetch office records. Please try again later.",
		})
	}
	json.NewEncoder(w).Encode(office_list)
}
