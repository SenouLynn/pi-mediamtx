package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Set up routes
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/health", healthHandler)

	// Server configuration
	port := ":8080"
	fmt.Printf("Server starting on port %s\n", port)

	// Start the server
	log.Fatal(http.ListenAndServe(port, nil))
}

// homeHandler handles requests to the root path
func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to Pi MediaMTX Server!\n")
}

// healthHandler provides a health check endpoint
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status": "healthy", "service": "pi-mediamtx-server"}`)
}
