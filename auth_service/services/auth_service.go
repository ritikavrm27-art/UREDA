package services

import (
	"authapi/models"
	"authapi/repositories"
)

func LogFailedLogin(req models.FailedLoginRequest) (int, error) {
	return repositories.LogFailedLogin(req)
}
func UserDayLockUpdate(req models.FailedLoginRequest) error {
	return repositories.UpdateUserDayLock(req)
}
func InsertActionLog(req models.ActionLog) (int, error) {
	return repositories.InsertActionLog(req)
}
