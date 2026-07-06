package models

type ResponseModel struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
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
