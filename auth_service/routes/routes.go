package routes

import (
	"authapi/controllers"
	"authapi/utils"
	"net/http"
	//"github.com/gorilla/mux"
)

func RegisterRoutes() {

	// http.HandleFunc("/api/auth/login-failed", controllers.LogFailedLogin)
	// http.HandleFunc("/api/auth/lock-update", controllers.LockUpdateLogin)
	// http.HandleFunc("/api/auth/insert-actionlog", controllers.InsertActionLogHandler)

	http.HandleFunc("/users", utils.SessionAuth(controllers.GetUsers))
	http.HandleFunc("/user/create", utils.SessionAuth(controllers.CreateUser))
	http.HandleFunc("/user/login", controllers.LoginUserHandler)
	http.HandleFunc("/user/logout", controllers.LogoutUserHandler)
	http.HandleFunc("/auth/login-salt", controllers.GetLoginSalt)
	http.HandleFunc("/auth/captcha", controllers.GetCaptcha)
	// http.HandleFunc("/api/translations", controllers.GetTranslations)

}
