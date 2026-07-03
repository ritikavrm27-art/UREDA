package models

type User struct {
	UserName string `json:"user_id"`
	EmpCode  string `json:"emp_code"`
	Role     string `json:"role"`
	EmpName  string `json:"empname"`
	Office   string `json:"office"`
	OfficeID string `json:"office_id"`
	RoleID   int    `json:"role_id"`
	Password string `json:"password"`
	Salt     string `json:"salt"`
}

// JSON response structure
type Response struct {
	Message  string `json:"message"`
	FileName string `json:"fileName"`
}
type UserPage struct {
	Message string
	Users   []User
}
