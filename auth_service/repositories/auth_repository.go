package repositories

import (
	"authapi/config"
	"authapi/models"
	"log"
)

func LogFailedLogin(req models.FailedLoginRequest) (int, error) {

	var attemptNo int

	err := config.DB.QueryRow(`SELECT public.f_log_failed_login($1, $2, $3, $4)`, req.MachineID, req.SessionID, req.UserID, req.ActionLogID).Scan(&attemptNo)

	if err != nil {
		return 0, err
	}

	return attemptNo, nil
}
func UpdateUserDayLock(req models.FailedLoginRequest) error {

	_, err := config.DB.Exec(`select public.f_delete_user_attempts_log($1) `, req.UserID)

	return err
}
func InsertActionLog(req models.ActionLog) (int, error) {

	tx, err := config.DB.Begin()

	if err != nil {
		return 0, err
	}

	defer tx.Rollback()
	var actionLogID int64

	err = tx.QueryRow(`SELECT public.f_insert_action_log($1, $2, $3, $4, $5, $6, $7, $8)`,
		req.ActionCategoryCode, req.ActionTypeCode, req.ActionBy, req.IPAddress, req.DeviceId, req.Latitude, req.Longitude, req.Actionmode).Scan(&actionLogID)

	if err = tx.Commit(); err != nil {
		log.Println("Insert Error:", err)
		return 0, err
	}

	return int(actionLogID), nil
}
