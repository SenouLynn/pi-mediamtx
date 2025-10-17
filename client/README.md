# Pi MediaMTX Client

A TypeScript Express.js client application for the Pi MediaMTX project.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm
- TypeScript knowledge

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Client

#### Development mode (with auto-reload using tsx):
```bash
pnpm dev
```

#### Development mode (alternative with nodemon):
```bash
pnpm dev:nodemon
```

#### Build for production:
```bash
pnpm build
```

#### Run production build:
```bash
pnpm start
```

#### Type checking only:
```bash
pnpm typecheck
```

The client will start on `http://localhost:3050` by default.

### Available Endpoints

- `GET /` - Welcome message with service info
- `GET /health` - Health check endpoint with uptime
- `GET /test-server` - Test connection to Go server

### Environment Variables

- `PORT` - Client port (default: 3050)
- `HOST` - Client host (default: localhost)
- `SERVER_URL` - Go server URL (default: http://localhost:8080)
- `NODE_ENV` - Environment (development/production)

### Development

The client is set up with:
- **TypeScript** for type safety and better development experience
- **Express.js** for the web framework
- **tsx** for fast TypeScript execution and hot reloading
- **Nodemon** alternative for auto-reload during development
- Strict TypeScript configuration with comprehensive type checking
- Typed API responses and error handling
- JSON request/response handling with proper typing
- Basic logging middleware
- Comprehensive error handling

### Testing Server Communication

To test communication with the Go server:

1. Start the Go server:
   ```bash
   cd ../server
   make run
   ```

2. Start the Express client:
   ```bash
   pnpm dev
   ```

3. Test endpoints:
   ```bash
   # Client health check
   curl http://localhost:3050/health
   
   # Server connection test
   curl http://localhost:3050/test-server
   ```

### TypeScript Features

- **Strict typing** with comprehensive TypeScript configuration
- **Interface definitions** for all API responses
- **Type-safe request/response handling**
- **Source maps** for debugging
- **Declaration files** generation
- **Fast development** with tsx hot reloading

### Project Structure

```
client/
├── src/
│   └── index.ts     # Main TypeScript Express application
├── dist/            # Compiled JavaScript output (gitignored)
├── tsconfig.json    # TypeScript configuration
├── package.json     # Project dependencies and scripts
├── .gitignore       # Git ignore rules
└── README.md        # This file
```