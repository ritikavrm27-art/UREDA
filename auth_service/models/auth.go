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
type LoginRequest struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	FinalHash string `json:"finalHash"`
	RandomNo  string `json:"randomNo"`
	Captcha   string `json:"captcha"`
	LoginSalt string `json:"loginSalt"`
}

type LoginResponse struct {
	UserName string `json:"user_id"`
	EmpCode  string `json:"emp_code"`
	EmpName  string `json:"empname"`
	Office   string `json:"office"`
	OfficeID string `json:"office_id"`
	Role     string `json:"role"`
	RoleID   int    `json:"role_id"`
	Success  bool   `json:"success"`
	Message  string `json:"message"`
	Token    string `json:"token,omitempty"`
}
type LogoutRequest struct {
	Username string `json:"username"`
}
type RoleModel struct {
	RoleID        int    `json:"role_id"`
	RoleName      string `json:"role_name"`
	RoleNameLocal string `json:"role_name_local"`
}
