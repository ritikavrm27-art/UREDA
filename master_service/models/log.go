package models

import "time"

type ApplicationLog struct {
	LogID         int64     `json:"log_id"`
	LogLevel      string    `json:"log_level"`
	ModuleName    string    `json:"module_name"`
	EventName     string    `json:"event_name"`
	EventDetails  string    `json:"event_details"`
	UserID        string    `json:"user_id"`
	IPAddress     string    `json:"ip_address"`
	RequestURL    string    `json:"request_url"`
	RequestMethod string    `json:"request_method"`
	CreatedAt     time.Time `json:"created_at"`
}
type ActionLogResponse struct {
	Success     bool `json:"success"`
	ActionLogID int  `json:"actionLogID"`
}
