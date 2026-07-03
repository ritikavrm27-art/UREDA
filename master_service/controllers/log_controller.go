package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"userapi/config"
	"userapi/models"
)

func logFailedLogin(username string, machineIP string, macAddress string, machineID string, sessionID string, actionLogID int) {

	log.Println("===== LogFailedLogin Called =====")

	payload := map[string]interface{}{
		"user_id":     username,
		"machine_ip":  machineIP,
		"mac_address": macAddress,
		"machine_id":  machineID,
		"session_id":  sessionID,
		"actionLogID": actionLogID,
	}
	jsonData, err := json.Marshal(payload)
	if err != nil {
		log.Println("JSON Marshal Error:", err)
		return
	}

	resp, err := http.Post(
		"http://localhost:8001/api/auth/login-failed",
		"application/json",
		bytes.NewBuffer(jsonData),
	)

	if err != nil {
		log.Println("Auth Service Call Error:", err)
		return
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	log.Println("Auth Service Status:", resp.Status)
	log.Println("Auth Service Response:", string(body))

	//jsonData, _ := json.Marshal(payload)
	//http.Post("http://localhost:8001/api/auth/login-failed", "application/json", bytes.NewBuffer(jsonData))

}
func InsertActionLog(action_type_code int, action_category_code int, action_by string, ip_address string, device_id string, latitude string, longitude string, action_mode string) (int, error) {

	log.Println("===== InsertActionLog Called =====")

	payload := map[string]interface{}{
		"action_category_code": action_category_code,
		"action_type_code":     action_type_code,
		"action_by":            action_by,
		"ip_address":           ip_address,
		"device_id":            device_id,
		"latitude":             latitude,
		"longitude":            longitude,
		"action_mode":          action_mode,
	}
	jsonData, err := json.Marshal(payload)
	if err != nil {
		log.Println("JSON Marshal Error:", err)
		return 0, err
	}

	resp, err := http.Post(
		"http://localhost:8001/api/auth/insert-actionlog",
		"application/json",
		bytes.NewBuffer(jsonData),
	)
	if err != nil {
		log.Println("Auth Service Call Error:", err)
		return 0, err
	}
	defer resp.Body.Close()

	// Read body once
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	log.Println("InsertActionLog Service Status:", resp.Status)
	log.Println("InsertActionLog Service Response:", string(body))

	if resp.StatusCode != http.StatusOK {
		return 0, fmt.Errorf("auth service error: %s", string(body))
	}

	var result models.ActionLogResponse

	err = json.Unmarshal(body, &result)
	if err != nil {
		log.Println("JSON Unmarshal Error:", err)
		return 0, err
	}

	log.Println("Action Log ID:", result.ActionLogID)

	return result.ActionLogID, nil
}
func UserDayLockUpdate(username string) {

	log.Println("===== LogFailedLogin Called =====")

	payload := map[string]string{
		"user_id": username,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		log.Println(err)
	} else {

		resp, err := http.Post(
			"http://localhost:8001/api/auth/lock-update",
			"application/json",
			bytes.NewBuffer(jsonData),
		)

		if err != nil {
			log.Println("Lock update error:", err)
		} else {
			defer resp.Body.Close()
			log.Println("Status:", resp.Status)
		}
	}

}
func GetTranslations(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	lang := r.URL.Query().Get("lang")
	if lang == "" {
		lang = "en"
	}

	query := `SELECT  * from  local.f_get_translation_master($1)`

	rows, err := config.DB.Query(query, lang)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer rows.Close()

	result := make(map[string]string)

	for rows.Next() {
		var key, value string
		rows.Scan(&key, &value)
		result[key] = value
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
