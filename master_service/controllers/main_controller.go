package controllers

import (
	"net/http"
)

func enableCors(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")

	if origin == "http://localhost:3000" || origin == "http://10.129.11.13:3000" || origin == "http://10.129.11.50:3000" || origin == "http://10.129.2.102:3000" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
	}

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}
