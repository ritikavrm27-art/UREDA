package controllers

import (
	"encoding/json"
	"net/http"
	"userapi/models"
	"userapi/services"
	"userapi/utils"
)

func GetOfficeLevels(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	officelevel_list, err := services.GetOfficeLevels()

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetOfficeLevels", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(officelevel_list)
}
func GetOffices(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var req models.OfficeLevelModel
	err := json.NewDecoder(r.Body).Decode(&req)
	//fmt.Println("OfficeLevelID:", req.OfficeLevelID)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request",
			},
		)

		return
	}

	office_list, err := services.GetOffices(req.OfficeLevelID)

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetOffices", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(office_list)
}
func GetReportingOffice(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var req models.OfficeLevelModel
	err := json.NewDecoder(r.Body).Decode(&req)
	//fmt.Println("OfficeLevelID:", req.OfficeLevelID)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request",
			},
		)

		return
	}

	reportingoffice_list, err := services.GetReportingOffice(req.OfficeLevelID)

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetReportingOffice", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(reportingoffice_list)
}
func GetDropdownOffice(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var req models.OfficeLevelModel
	err := json.NewDecoder(r.Body).Decode(&req)
	//fmt.Println("OfficeLevelID:", req.OfficeLevelID)
	if err != nil {

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request",
			},
		)

		return
	}

	office_list, err := services.GetDropdownOffice(req.OfficeLevelID)

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetDropdownOffice", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(office_list)
}
func GetState(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}

	state_list, err := services.GetState()

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetState", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(state_list)
}
func GetDistrict(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)

	if r.Method == "OPTIONS" {
		return
	}
	var req models.StatesModel
	err := json.NewDecoder(r.Body).Decode(&req)
	//fmt.Println("StateID:", req.StateID)
	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetDistrict Stateid fetch", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(
			models.ResponseModel{
				Success: false,
				Message: "Invalid request",
			},
		)
		return
	}

	district_list, err := services.GetDistrict(req.StateID)

	if err != nil {
		utils.LogErrorToCSV("Office Page", "GetDistrict", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(district_list)
}
