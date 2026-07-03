package controllers

import (
	"authapi/models"
	"authapi/services"
	"authapi/utils"
	"encoding/json"
	"net/http"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}

func LogFailedLogin(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req models.FailedLoginRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.LogErrorToCSV("Auth API", "LogFailedLogin", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	attemptNo, err := services.LogFailedLogin(req)

	if err != nil {
		utils.LogErrorToCSV("Auth API", "LogFailedLogin", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"attempt": attemptNo,
	})
}
func LockUpdateLogin(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req models.FailedLoginRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.LogErrorToCSV("Auth API", "LockUpdateLogin", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := services.UserDayLockUpdate(req)

	if err != nil {
		utils.LogErrorToCSV("Auth API", "LockUpdateLogin", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
	})
}
func InsertActionLogHandler(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req models.ActionLog

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.LogErrorToCSV("Auth API", "InsertActionLog", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	actionLogID, err := services.InsertActionLog(req)

	if err != nil {
		utils.LogErrorToCSV("Auth API", "InsertActionLog", err.Error())
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":     true,
		"actionLogID": actionLogID,
	})
}
