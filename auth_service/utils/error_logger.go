package utils

import (
	"encoding/csv"
	"os"
	"path/filepath"
	"time"
)

func LogErrorToCSV(pageName, functionName, errMsg string) {

	logDir := "logs"
	os.MkdirAll(logDir, os.ModePerm)

	filePath := filepath.Join(logDir, "error_log.csv")
	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	writer.Write([]string{time.Now().Format("2006-01-02 15:04:05"), pageName, functionName, errMsg})
}
