# Pi MediaMTX Server

A Go-based server for the Pi MediaMTX project.

## Getting Started

### Prerequisites

- Go 1.19 or later
- Make (optional, for using Makefile commands)

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Download dependencies:
   ```bash
   go mod download
   ```

### Running the Server

#### Local Development:
```bash
go run main.go
```

#### Using Make:
```bash
make run
```

#### Building for local testing:
```bash
make build
./pi-mediamtx-server
```

#### Building for Raspberry Pi Zero 2 W:
```bash
make build-pi
```

#### Building all targets:
```bash
make build-all
```

The server will start on `http://localhost:8080` by default.

### Available Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

### Environment Variables

- `PORT` - Server port (default: 8080)
- `HOST` - Server host (default: localhost, use 0.0.0.0 for Pi deployment)
- `LOG_LEVEL` - Log level (default: info)

## Raspberry Pi Deployment

### Quick Deployment

Use the deployment script for easy deployment:
```bash
./deploy.sh pi@your-pi-hostname.local
```

### Manual Deployment

1. Build for Raspberry Pi:
   ```bash
   make build-pi
   ```

2. Copy to your Pi:
   ```bash
   scp pi-mediamtx-server-pi pi@your-pi:~/pi-mediamtx-server
   ```

3. SSH into your Pi and run:
   ```bash
   chmod +x ~/pi-mediamtx-server
   PORT=8080 HOST=0.0.0.0 ./pi-mediamtx-server
   ```

### Systemd Service Setup

1. Generate the service file:
   ```bash
   make create-systemd-service
   ```

2. Copy to your Pi and install:
   ```bash
   scp pi-mediamtx-server.service pi@your-pi:~/
   ssh pi@your-pi "sudo cp pi-mediamtx-server.service /etc/systemd/system/"
   ssh pi@your-pi "sudo systemctl enable pi-mediamtx-server"
   ssh pi@your-pi "sudo systemctl start pi-mediamtx-server"
   ```

### Cross-Compilation Support

- **Raspberry Pi Zero 2 W**: `make build-pi` (ARM64)
- **Raspberry Pi Zero (original)**: `make build-pi-armv6` (ARMv6)
- **Test cross-compilation**: `make test-cross-compile`

### Development

#### Available Make Commands

- `make build` - Build for local testing
- `make build-pi` - Build for Raspberry Pi Zero 2 W (ARM64)
- `make build-pi-armv6` - Build for original Raspberry Pi Zero (ARMv6)
- `make build-all` - Build all targets
- `make run` - Build and run locally
- `make test` - Run tests
- `make clean` - Clean all build artifacts
- `make fmt` - Format code
- `make vet` - Run go vet
- `make tidy` - Tidy dependencies
- `make lint` - Run linter (requires golangci-lint)
- `make dev` - Run development server with auto-reload (requires air)
- `make deploy-pi` - Deploy to Pi (requires SSH_HOST env var)
- `make create-systemd-service` - Generate systemd service file
- `make test-cross-compile` - Test cross-compilation

#### Installing Development Tools

```bash
make install-tools
make install-air
```

## Project Structure

```
server/
├── main.go                    # Application entry point
├── config/                    # Configuration management
├── handlers/                  # HTTP handlers
├── models/                    # Data models
├── Makefile                   # Build automation with cross-compilation
├── deploy.sh                  # Deployment script for Raspberry Pi
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```