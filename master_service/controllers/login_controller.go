package controllers

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"userapi/models"
	"userapi/repositories"
	"userapi/services"
	"userapi/utils"

	"github.com/dchest/captcha"
	"github.com/gorilla/sessions"
)

func init() {
	utils.Store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   60 * 60 * 24, // 24 hours
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	}
}

func GetCaptcha(w http.ResponseWriter, r *http.Request) {

	id := captcha.New()

	session, _ := utils.Store.Get(r, utils.SessionName)

	session.Values["captcha_id"] = id

	if err := session.Save(r, w); err != nil {
		log.Println("captcha session save error:", err)
		return
	}

	w.Header().Set("Content-Type", "image/png")
	captcha.WriteImage(w, id, 240, 80)
}

func sha256Hex(text string) string {

	hash := sha256.Sum256([]byte(text))

	return hex.EncodeToString(hash[:])
}

func ValidateCaptcha(w http.ResponseWriter, r *http.Request) {

	var req struct {
		Captcha string `json:"captcha"`
	}

	json.NewDecoder(r.Body).Decode(&req)

	session, _ := utils.Store.Get(r, utils.SessionName)

	captchaID, ok := session.Values["captcha_id"].(string)

	if !ok || captchaID == "" {
		json.NewEncoder(w).Encode(models.LoginResponse{
			Success: false,
			Message: "Captcha session expired",
		})
		return
	}

	if !captcha.VerifyString(captchaID, req.Captcha) {
		utils.LogErrorToCSV("Login Page", "ValidateCaptcha", "Invalid captcha")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid captcha",
		})
		return
	}

	w.Write([]byte(`{"success":true}`))
}

func GenerateSalt() string {

	b := make([]byte, 16)

	rand.Read(b)

	return hex.EncodeToString(b)
}
func GetLoginSalt(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	w.Header().Set(
		"Content-Type", "application/json",
	)

	// Create session
	session, _ := utils.Store.Get(r, utils.SessionName)

	// Generate random login salt
	loginSalt := GenerateSalt()

	// Save in session
	session.Values["login_salt"] = loginSalt

	// Save session
	session.Save(r, w)

	// Send salt to frontend
	json.NewEncoder(w).Encode(
		map[string]string{"salt": loginSalt},
	)
}

func getFailedAttempts(session *sessions.Session) int {
	v, ok := session.Values["failed_attempts"].(int)
	if !ok {
		return 0
	}
	return v
}

func increaseFailedAttempts(session *sessions.Session) int {
	count := getFailedAttempts(session) + 1
	session.Values["failed_attempts"] = count
	return count
}

func resetFailedAttempts(session *sessions.Session) {
	session.Values["failed_attempts"] = 0
}

func LoginUserHandler(w http.ResponseWriter, r *http.Request) {

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
				Message: "Method not allowed",
			},
		)

		return
	}

	session, _ := utils.Store.Get(r, utils.SessionName)

	var machineIP = r.RemoteAddr
	var sessionID = session.ID
	var macAddress = ""
	var machineID = ""
	var deviceID = ""
	var latitude = ""
	var longitude = ""
	var action_mode = ""

	var req models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		utils.LogErrorToCSV("Login Page", "Login User- Invalid Request", err.Error())

		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(
			models.LoginResponse{
				Success: false,
				Message: "Invalid request",
			},
		)

		return
	}
	failed := getFailedAttempts(session)

	if failed >= 2 {

		if req.Captcha == "" || !captcha.VerifyString(
			session.Values["captcha_id"].(string),
			req.Captcha,
		) {

			increaseFailedAttempts(session)
			session.Save(r, w)

			json.NewEncoder(w).Encode(models.LoginResponse{
				Success: false,
				Message: "Captcha required / invalid captcha",
			})
			return
		}
	}

	attemptNo, err := repositories.CheckUserDayLock(req.Username)

	if err != nil {
		utils.LogErrorToCSV("Login Page", "Login User- Check User Day Lock", err.Error())
		log.Println(err)
		return
	}

	if attemptNo >= 3 {
		json.NewEncoder(w).Encode(models.LoginResponse{
			Success: false,
			Message: "Account locked due to 3 failed login attempts today",
		})
		return
	}

	user, err := repositories.GetUserByUsername(req.Username)

	if err != nil {
		actionLogID, err := InsertActionLog(2, 1, req.Username, machineIP, deviceID, latitude, longitude, action_mode)

		if err != nil {
			utils.LogErrorToCSV("Login Page", "Login User- Action Log Error", err.Error())
			log.Println("Action Log Error:", err)
		}
		go logFailedLogin(req.Username, machineIP, macAddress, machineID, sessionID, actionLogID)

		w.WriteHeader(http.StatusUnauthorized)

		json.NewEncoder(w).Encode(
			models.LoginResponse{
				Success: false,
				Message: "Invalid username or password",
			},
		)

		return
	}
	// loginSalt, ok := session.Values["login_salt"].(string)

	// fmt.Println("loginSalt" + loginSalt)

	// if !ok {
	// 	json.NewEncoder(w).Encode(models.LoginResponse{
	// 		Success: false,
	// 		Message: "Session expired",
	// 	})
	// 	return
	// }
	loginSalt := req.LoginSalt
	fmt.Println("loginSalt" + loginSalt)
	/*
		Frontend sends:
		password =SHA256(originalPassword)

		finalHash =SHA256(password + loginSalt)

		DB stores:
		password_hash =SHA256(password)
	*/

	dbHashWithSalt := sha256Hex(user.Password + loginSalt)

	if req.FinalHash != dbHashWithSalt {
		actionLogID, err := InsertActionLog(2, 1, req.Username, machineIP, deviceID, latitude, longitude, action_mode)
		if err != nil {
			utils.LogErrorToCSV("Login Page", "Login User- Action Log Error", err.Error())
			log.Println("Action Log Error:", err)
		}
		go logFailedLogin(req.Username, machineIP, macAddress, machineID, sessionID, actionLogID)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(
			models.LoginResponse{
				Success: false,
				Message: "Invalid password",
			},
		)
		return
	}

	// if !ok {
	// 	json.NewEncoder(w).Encode(
	// 		models.LoginResponse{
	// 			Success: false,
	// 			Message: "Session expired",
	// 		},
	// 	)
	// 	return
	// }

	serverFinalHash := sha256Hex(req.Password + loginSalt)

	if serverFinalHash != req.FinalHash {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(
			models.LoginResponse{
				Success: false,
				Message: "Invalid request hash",
			},
		)
		return
	}
	go UserDayLockUpdate(req.Username)
	actionLogID, err := InsertActionLog(1, 1, req.Username, machineIP, deviceID, latitude, longitude, action_mode)

	//log.Println("actionLogID value2" + string(actionLogID))

	if err != nil {
		utils.LogErrorToCSV("Login Page", "Login User- Action Log Error", err.Error())
		log.Println("Action Log Error:", err)
	}

	// Insert login history
	err = repositories.InsertLoginLog(req.Username, machineIP, macAddress, sessionID, int64(actionLogID))

	if err != nil {
		utils.LogErrorToCSV("Login Page", "Login User- Login Log Error", err.Error())
		log.Println("Login Log Error:", err)
	}
	session.Values["username"] = user.UserName
	session.Values["empcode"] = user.EmpCode
	session.Values["empname"] = user.EmpName
	session.Values["office"] = user.Office
	session.Values["officeid"] = user.OfficeID
	session.Values["role"] = user.Role
	session.Values["roleid"] = user.RoleID
	resetFailedAttempts(session)
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Session save failed", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(
		models.LoginResponse{
			UserName: user.UserName,
			EmpCode:  user.EmpCode,
			EmpName:  user.EmpName,
			Office:   user.Office,
			OfficeID: user.OfficeID,
			Role:     user.Role,
			RoleID:   user.RoleID,
			Success:  true,
			Message:  "Login successful",
		},
	)
}

func LogoutUserHandler(w http.ResponseWriter, r *http.Request) {
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
				Message: "Method not allowed",
			},
		)

		return
	}
	var machineIP = r.RemoteAddr
	var deviceID = ""
	var latitude = ""
	var longitude = ""
	var action_mode = ""

	var req models.LogoutRequest

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// log.Println("logout called")
	// log.Println(req.Username)
	actionLogID, err := InsertActionLog(3, 1, req.Username, machineIP, deviceID, latitude, longitude, action_mode)
	err = services.Logout(req.Username, actionLogID)
	if err != nil {
		utils.LogErrorToCSV("Login Page", "LogoutUser", err.Error())
		log.Println("error logout")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	session, _ := utils.Store.Get(r, utils.SessionName)

	session.Options.MaxAge = -1
	session.Values = map[interface{}]interface{}{}

	session.Save(r, w)

	response := map[string]interface{}{
		"success": true,
		"message": "Logout successful",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
