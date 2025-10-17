package config

import (
	"os"
	"strconv"
)

// Config holds the application configuration
type Config struct {
	Port     int
	Host     string
	LogLevel string
}

// Load loads configuration from environment variables with defaults
func Load() *Config {
	cfg := &Config{
		Port:     8080,
		Host:     "localhost",
		LogLevel: "info",
	}

	// Override with environment variables if present
	if port := os.Getenv("PORT"); port != "" {
		if p, err := strconv.Atoi(port); err == nil {
			cfg.Port = p
		}
	}

	if host := os.Getenv("HOST"); host != "" {
		cfg.Host = host
	}

	if logLevel := os.Getenv("LOG_LEVEL"); logLevel != "" {
		cfg.LogLevel = logLevel
	}

	return cfg
}
