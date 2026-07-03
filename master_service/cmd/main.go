package main

import (
	"log"
	"net/http"
	"userapi/config"
	"userapi/routes"
	// "fmt"
	// "golang.org/x/crypto/bcrypt"
)

func main() {
	// hash, _ := bcrypt.GenerateFromPassword([]byte("1234"), 10)
	// fmt.Println(string(hash)) // check using go run ./cmd main.go

	config.ConnectDB()

	routes.RegisterRoutes()

	log.Println("Server started on port 8002")

	http.ListenAndServe(":8002", nil)
}