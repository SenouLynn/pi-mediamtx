# Makefile for Pi MediaMTX Server

# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOMOD=$(GOCMD) mod

# Binary names
BINARY_NAME=pi-mediamtx-server
BINARY_NAME_PI=pi-mediamtx-server-pi

# Build flags for optimization
BUILD_FLAGS=-ldflags="-s -w"

# Build the application for local testing
build:
	$(GOBUILD) $(BUILD_FLAGS) -o $(BINARY_NAME) -v .

# Build for Raspberry Pi Zero 2 W (ARM64)
build-pi:
	GOOS=linux GOARCH=arm64 $(GOBUILD) $(BUILD_FLAGS) -o $(BINARY_NAME_PI) -v .

# Build for Raspberry Pi Zero (ARMv6) - fallback for older Pi Zero
build-pi-armv6:
	GOOS=linux GOARCH=arm GOARM=6 $(GOBUILD) $(BUILD_FLAGS) -o $(BINARY_NAME_PI)-armv6 -v .

# Build all targets
build-all: build build-pi build-pi-armv6

# Run the application
run:
	$(GOBUILD) -o $(BINARY_NAME) -v .
	./$(BINARY_NAME)

# Clean build artifacts
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME) $(BINARY_NAME_PI) $(BINARY_NAME_PI)-armv6

# Run tests
test:
	$(GOTEST) -v ./...

# Download dependencies
deps:
	$(GOMOD) download
	$(GOMOD) verify

# Tidy dependencies
tidy:
	$(GOMOD) tidy

# Format code
fmt:
	$(GOCMD) fmt ./...

# Run go vet
vet:
	$(GOCMD) vet ./...

# Install development tools
install-tools:
	$(GOGET) -u golang.org/x/tools/cmd/goimports
	$(GOGET) -u github.com/golangci/golangci-lint/cmd/golangci-lint

# Lint code
lint:
	golangci-lint run

# Development server with auto-reload (requires air)
dev:
	air

# Install air for development
install-air:
	$(GOGET) -u github.com/cosmtrek/air

# Deploy to Raspberry Pi (requires SSH_HOST environment variable)
deploy-pi: build-pi
	@if [ -z "$(SSH_HOST)" ]; then \
		echo "Error: SSH_HOST environment variable not set"; \
		echo "Usage: SSH_HOST=pi@raspberrypi.local make deploy-pi"; \
		exit 1; \
	fi
	scp $(BINARY_NAME_PI) $(SSH_HOST):~/$(BINARY_NAME)
	ssh $(SSH_HOST) "chmod +x ~/$(BINARY_NAME)"

# Create systemd service file for Raspberry Pi
create-systemd-service:
	@echo "Creating systemd service file..."
	@echo "[Unit]" > pi-mediamtx-server.service
	@echo "Description=Pi MediaMTX Server" >> pi-mediamtx-server.service
	@echo "After=network.target" >> pi-mediamtx-server.service
	@echo "" >> pi-mediamtx-server.service
	@echo "[Service]" >> pi-mediamtx-server.service
	@echo "Type=simple" >> pi-mediamtx-server.service
	@echo "User=pi" >> pi-mediamtx-server.service
	@echo "WorkingDirectory=/home/pi" >> pi-mediamtx-server.service
	@echo "ExecStart=/home/pi/pi-mediamtx-server" >> pi-mediamtx-server.service
	@echo "Restart=always" >> pi-mediamtx-server.service
	@echo "RestartSec=5" >> pi-mediamtx-server.service
	@echo "Environment=PORT=8080" >> pi-mediamtx-server.service
	@echo "Environment=HOST=0.0.0.0" >> pi-mediamtx-server.service
	@echo "" >> pi-mediamtx-server.service
	@echo "[Install]" >> pi-mediamtx-server.service
	@echo "WantedBy=multi-user.target" >> pi-mediamtx-server.service
	@echo "Service file created: pi-mediamtx-server.service"
	@echo "To install on Pi: sudo cp pi-mediamtx-server.service /etc/systemd/system/"
	@echo "To enable: sudo systemctl enable pi-mediamtx-server"
	@echo "To start: sudo systemctl start pi-mediamtx-server"

# Check if cross-compilation works
test-cross-compile:
	@echo "Testing cross-compilation for Raspberry Pi..."
	GOOS=linux GOARCH=arm64 $(GOBUILD) -o /tmp/test-pi-build -v .
	@echo "✅ ARM64 cross-compilation successful"
	GOOS=linux GOARCH=arm GOARM=6 $(GOBUILD) -o /tmp/test-pi-armv6-build -v .
	@echo "✅ ARMv6 cross-compilation successful"
	rm -f /tmp/test-pi-build /tmp/test-pi-armv6-build

.PHONY: build run clean test deps tidy fmt vet install-tools lint dev install-air build-pi build-pi-armv6 build-all deploy-pi create-systemd-service test-cross-compile