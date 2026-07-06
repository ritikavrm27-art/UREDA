package utils

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/sessions"
)

const SessionName = "auth-session"

var Store = sessions.NewCookieStore([]byte("MY_SECRET_SESSION_KEY_2026"))

func SessionAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if r.Method == "OPTIONS" {
			next(w, r)
			return
		}

		session, err := Store.Get(r, SessionName)
		if err != nil {
			http.Error(w, "Unauthorized Access", http.StatusUnauthorized)
			return
		}
		// log.Printf(
		// 	"Path=%s Session=%v",
		// 	r.URL.Path,
		// 	session.Values,
		// )
		username, ok := session.Values["username"].(string)
		if !ok || username == "" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)

			json.NewEncoder(w).Encode(map[string]interface{}{
				"success": false,
				"message": "Session Expired. Please login again.",
			})
			return
		}

		next(w, r)
	}
}
