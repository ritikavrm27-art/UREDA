package controllers

import (
	"authapi/models"
	"authapi/services"
	"authapi/utils"
	"encoding/json"
	"log"
	"net/http"
)

func logFailedLogin(username, machineIP, macAddress, machineID, sessionID string, actionLogID int) {

	log.Println("===== LogFailedLogin Called =====")

	req := models.FailedLoginRequest{
		UserID:      username,
		MachineIP:   machineIP,
		MacAddress:  macAddress,
		MachineID:   machineID,
		SessionID:   sessionID,
		ActionLogID: actionLogID,
	}

	attemptNo, err := services.LogFailedLogin(req)
	if err != nil {
		log.Println("Failed to log login attempt:", err)
		return
	}

	log.Printf("Failed login recorded successfully. Attempt No: %d\n", attemptNo)
}
func InsertActionLog(actionTypeCode int, actionCategoryCode int, actionBy string, ipAddress string, deviceID string, latitude string,
	longitude string, actionMode string) (int, error) {

	log.Println("===== InsertActionLog Called =====")

	req := models.ActionLog{
		ActionCategoryCode: actionCategoryCode,
		ActionTypeCode:     actionTypeCode,
		ActionBy:           actionBy,
		IPAddress:          ipAddress,
		DeviceId:           deviceID,
		Latitude:           latitude,
		Longitude:          longitude,
		Actionmode:         actionMode,
	}

	actionLogID, err := services.InsertActionLog(req)
	if err != nil {
		log.Println("InsertActionLog Error:", err)
		utils.LogErrorToCSV("Auth API", "InsertActionLog", err.Error())
		return 0, err
	}

	log.Println("Action Log ID:", actionLogID)

	return actionLogID, nil
}
func UserDayLockUpdate(username string) error {

	log.Println("===== UserDayLockUpdate Called =====")

	req := models.FailedLoginRequest{
		UserID: username,
	}

	if err := services.UserDayLockUpdate(req); err != nil {
		log.Println("UserDayLockUpdate Error:", err)
		utils.LogErrorToCSV("Auth API", "UserDayLockUpdate", err.Error())
		return err
	}

	log.Println("User day lock updated successfully.")
	return nil
}

// func LogFailedLogin(w http.ResponseWriter, r *http.Request) {

// 	enableCors(w, r)

// 	if r.Method == "OPTIONS" {
// 		w.WriteHeader(http.StatusOK)
// 		return
// 	}

// 	var req models.FailedLoginRequest

// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		utils.LogErrorToCSV("Auth API", "LogFailedLogin", err.Error())
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	attemptNo, err := services.LogFailedLogin(req)

// 	if err != nil {
// 		utils.LogErrorToCSV("Auth API", "LogFailedLogin", err.Error())
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")

//		json.NewEncoder(w).Encode(map[string]interface{}{
//			"success": true,
//			"attempt": attemptNo,
//		})
//	}
func LockUpdateLogin(w http.ResponseWriter, r *http.Request) {

	enableCors(w, r)

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
func InsertActionLogAPIHandler(w http.ResponseWriter, r *http.Request) {

	enableCors(w, r)

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
