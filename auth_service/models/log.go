package models

type ActionLog struct {
	ActionCategoryCode int    `json:"action_category_code"`
	ActionTypeCode     int    `json:"action_type_code"`
	ActionBy           string `json:"action_by"`
	IPAddress          string `json:"ip_address"`
	DeviceId           string `json:"device_id"`
	Latitude           string `json:"latitude"`
	Longitude          string `json:"longitude"`
	Actionmode         string `json:"action_mode"`
}

type FailedLoginRequest struct {
	UserID      string `json:"user_id"`
	MachineIP   string `json:"machine_ip"`
	MacAddress  string `json:"mac_address"`
	MachineID   string `json:"machine_id"`
	SessionID   string `json:"session_id"`
	ActionLogID int    `json:"actionLogID"`
}
