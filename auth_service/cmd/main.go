package main

import (
	"authapi/config"
	"authapi/routes"
	"log"
	"net/http"
	// "fmt"
	// "golang.org/x/crypto/bcrypt"
)

func main() {
	// hash, _ := bcrypt.GenerateFromPassword([]byte("1234"), 10)
	// fmt.Println(string(hash)) // check using go run ./cmd main.go

	config.ConnectDB()

	routes.RegisterRoutes()

	log.Println("Server started on port 8001")

	http.ListenAndServe(":8001", nil)
}
