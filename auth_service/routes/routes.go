package routes

import (
	"authapi/controllers"
	"net/http"
	//"github.com/gorilla/mux"
)

func RegisterRoutes() {

	http.HandleFunc("/api/auth/login-failed", controllers.LogFailedLogin)
	http.HandleFunc("/api/auth/lock-update", controllers.LockUpdateLogin)
	http.HandleFunc("/api/auth/insert-actionlog", controllers.InsertActionLogHandler)
}
