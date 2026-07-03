package models

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
